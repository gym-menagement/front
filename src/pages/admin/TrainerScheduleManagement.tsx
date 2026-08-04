import { useCallback, useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import TrainerSchedule from '../../models/trainerschedule';
import { Gymtrainer, User } from '../../models';
import type { TrainerSchedule as ScheduleType } from '../../types/subscription';
import type { User as UserType } from '../../types/user';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

// P3 트레이너 근무 스케줄 (docs/roadmap-p1-p6.md)
// 요일별 근무·휴게 시간을 등록하면 회원 예약 화면의 가용 슬롯이 여기서 계산된다.
const TrainerScheduleManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [trainers, setTrainers] = useState<UserType[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<number>(0);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    dayofweek: 1,
    starttime: '09:00',
    endtime: '18:00',
    breakstart: '',
    breakend: '',
  });

  // 헬스장 소속 트레이너 목록
  useEffect(() => {
    if (!selectedGymId) return;
    (async () => {
      try {
        const [gts, users] = await Promise.all([
          Gymtrainer.findall({ gym: selectedGymId }),
          User.findall({ role: User.role.TRAINER }),
        ]);
        const ids = new Set(gts.map((g) => g.trainer));
        const list = users.filter((u) => ids.has(u.id));
        setTrainers(list);
        if (list.length > 0) setSelectedTrainer((prev) => (prev && ids.has(prev) ? prev : list[0].id));
      } catch (error) {
        console.error('Failed to load trainers:', error);
      }
    })();
  }, [selectedGymId]);

  const loadSchedules = useCallback(async () => {
    if (!selectedTrainer) return;
    try {
      setLoading(true);
      setSchedules(await TrainerSchedule.findByTrainer(selectedTrainer));
    } catch (error) {
      console.error('Failed to load schedules:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedTrainer]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleAdd = async () => {
    if (form.starttime >= form.endtime) {
      alert('종료 시간이 시작 시간보다 늦어야 합니다.');
      return;
    }
    if ((form.breakstart && !form.breakend) || (!form.breakstart && form.breakend)) {
      alert('휴게 시간은 시작·종료를 함께 입력하세요.');
      return;
    }
    try {
      await TrainerSchedule.insert({
        trainer: selectedTrainer,
        gym: selectedGymId,
        ...form,
      });
      setShowAdd(false);
      await loadSchedules();
    } catch (error) {
      console.error('Failed to add schedule:', error);
      alert('등록에 실패했습니다.');
    }
  };

  const handleRemove = async (s: ScheduleType) => {
    if (!confirm(`${TrainerSchedule.days[s.dayofweek]}요일 ${s.starttime}~${s.endtime} 근무를 삭제할까요?`)) return;
    try {
      await TrainerSchedule.remove(s.id);
      await loadSchedules();
    } catch (error) {
      console.error('Failed to remove schedule:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  // 요일별 그룹
  const byDay = (dow: number) => schedules.filter((s) => s.dayofweek === dow);

  return (
    <div>
      <AdminHeader title="트레이너 근무 스케줄" />
      <div style={{ padding: theme.spacing[8] }}>
        {/* 트레이너 선택 */}
        <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[6], flexWrap: 'wrap' }}>
          {trainers.map((t) => (
            <Button
              key={t.id}
              variant={selectedTrainer === t.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTrainer(t.id)}
            >
              {t.name}
            </Button>
          ))}
          {trainers.length === 0 && (
            <span style={{ color: theme.colors.text.tertiary, fontSize: theme.typography.fontSize.sm }}>
              소속 트레이너가 없습니다. 먼저 트레이너 소속을 등록하세요.
            </span>
          )}
        </div>

        {selectedTrainer > 0 && (
          <>
            <div style={{ marginBottom: theme.spacing[4] }}>
              <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
                + 근무 시간 추가
              </Button>
            </div>

            {/* 주간 그리드 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: theme.spacing[3],
              }}
            >
              {TrainerSchedule.days.map((day, dow) => (
                <Card key={dow} padding="sm">
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                      marginBottom: theme.spacing[2],
                      color: dow === 0 ? theme.colors.semantic.error : theme.colors.text.primary,
                    }}
                  >
                    {day}
                  </div>
                  {loading ? (
                    <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                      ...
                    </span>
                  ) : byDay(dow).length === 0 ? (
                    <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                      휴무
                    </span>
                  ) : (
                    byDay(dow).map((s) => (
                      <div
                        key={s.id}
                        style={{
                          marginBottom: theme.spacing[2],
                          padding: theme.spacing[2],
                          borderRadius: theme.borderRadius.md,
                          backgroundColor: theme.colors.brand.primarySubtle,
                          fontSize: theme.typography.fontSize.xs,
                        }}
                      >
                        <div style={{ color: theme.colors.text.primary }}>
                          {s.starttime} ~ {s.endtime}
                        </div>
                        {s.breakstart && (
                          <div style={{ color: theme.colors.text.tertiary }}>
                            휴게 {s.breakstart}~{s.breakend}
                          </div>
                        )}
                        <button
                          onClick={() => handleRemove(s)}
                          style={{
                            marginTop: theme.spacing[1],
                            border: 'none',
                            background: 'none',
                            color: theme.colors.semantic.error,
                            fontSize: theme.typography.fontSize.xs,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ))
                  )}
                </Card>
              ))}
            </div>
          </>
        )}

        {/* 추가 모달 */}
        {showAdd && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
            }}
            onClick={() => setShowAdd(false)}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: 360 }}>
              <Card>
                <h3 style={{ marginTop: 0 }}>근무 시간 추가</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                  <div>
                    <label style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                      요일
                    </label>
                    <div style={{ display: 'flex', gap: theme.spacing[1], marginTop: theme.spacing[1] }}>
                      {TrainerSchedule.days.map((d, i) => (
                        <Button
                          key={i}
                          variant={form.dayofweek === i ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setForm({ ...form, dayofweek: i })}
                        >
                          {d}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Input
                    label="근무 시작"
                    type="time"
                    value={form.starttime}
                    onChange={(e) => setForm({ ...form, starttime: e.target.value })}
                  />
                  <Input
                    label="근무 종료"
                    type="time"
                    value={form.endtime}
                    onChange={(e) => setForm({ ...form, endtime: e.target.value })}
                  />
                  <Input
                    label="휴게 시작 (선택)"
                    type="time"
                    value={form.breakstart}
                    onChange={(e) => setForm({ ...form, breakstart: e.target.value })}
                  />
                  <Input
                    label="휴게 종료 (선택)"
                    type="time"
                    value={form.breakend}
                    onChange={(e) => setForm({ ...form, breakend: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: theme.spacing[2], justifyContent: 'flex-end' }}>
                    <Button variant="ghost" onClick={() => setShowAdd(false)}>
                      취소
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                      등록
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div style={{ marginTop: theme.spacing[6] }}>
          <Badge variant="info" dot>
            근무 시간을 등록하면 회원 앱의 PT 예약 화면에 예약 가능 슬롯으로 표시됩니다.
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TrainerScheduleManagement;
