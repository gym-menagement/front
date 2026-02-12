import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { userAtom, currentProfileAtom } from '../../store/auth';
import { Gymtrainer, TrainerMember, PTReservation } from '../../models';
import type { Gymtrainer as GymtrainerType } from '../../types/gymtrainer';
import type { Trainermember } from '../../types/trainermember';
import type { Ptreservation } from '../../types/ptreservation';
import { formatLocalDateTime, getDayRange } from '../../global/util';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import ProfileSwitcher from '../../components/common/ProfileSwitcher';

const TrainerDashboard = () => {
  const user = useAtomValue(userAtom);
  const currentProfile = useAtomValue(currentProfileAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gymInfo, setGymInfo] = useState<GymtrainerType | null>(null);
  const [members, setMembers] = useState<Trainermember[]>([]);
  const [todayReservations, setTodayReservations] = useState<Ptreservation[]>([]);
  const [weekReservations, setWeekReservations] = useState<Ptreservation[]>([]);

  // 모달 상태
  const [showNewReservationModal, setShowNewReservationModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [reservationDate, setReservationDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reservationNote, setReservationNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, currentProfile]);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Use current profile gym if available, otherwise fetch first
      let gymId = currentProfile?.gymId;
      
      // 트레이너가 소속된 헬스장 정보 조회
      // If we have a specific gym context, use it
      const query: any = {
        trainer: user.id,
        status: Gymtrainer.status.IN_PROGRESS,
      };
      
      if (gymId) {
        query.gym = gymId;
      }

      const gymtrainers = await Gymtrainer.findall(query);

      if (gymtrainers.length > 0) {
        setGymInfo(gymtrainers[0]);
        gymId = gymtrainers[0].gym;

        // 담당 회원 조회
        const memberList = await TrainerMember.findall({
          trainer: user.id,
          gym: gymId,
          status: TrainerMember.status.IN_PROGRESS,
        });
        setMembers(memberList);

        // 오늘 예약 조회
        const today = new Date().toISOString().split('T')[0];
        const { startDate, endDate } = getDayRange(today);
        const todayRes = await PTReservation.find({
          trainer: user.id,
          gym: gymId,
          startreservationdate: formatLocalDateTime(startDate),
          endreservationdate: formatLocalDateTime(endDate),
        });
        todayRes.sort((a, b) => (a.starttime || '').localeCompare(b.starttime || ''));
        setTodayReservations(todayRes);

        // 이번 주 예약 조회
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        const weekRes = await PTReservation.findall({
          trainer: user.id,
          gym: gymId,
          startreservationdate: formatLocalDateTime(weekStart),
          endreservationdate: formatLocalDateTime(weekEnd),
        });
        weekRes.sort((a, b) =>
          new Date(a.reservationdate).getTime() - new Date(b.reservationdate).getTime()
        );
        setWeekReservations(weekRes);
      } else {
        // No gym found for this profile or at all
        setGymInfo(null);
        setMembers([]);
        setTodayReservations([]);
        setWeekReservations([]);
      }
    } catch (error) {
      console.error('Failed to load trainer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // PT 예약 상태 변경
  const handleStatusChange = async (reservation: Ptreservation, newStatus: number) => {
    try {
      await PTReservation.patch(reservation.id, {
        status: newStatus,
      });
      await loadData(); // 데이터 새로고침
    } catch (error) {
      console.error('Failed to update reservation status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  // 새 예약 생성
  const handleCreateReservation = async () => {
    if (!selectedMember || !reservationDate || !startTime || !endTime || !gymInfo || !user) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      await PTReservation.insert({
        trainer: user.id,
        member: selectedMember,
        gym: gymInfo.gym,
        reservationdate: reservationDate,
        starttime: startTime,
        endtime: endTime,
        duration: 60,
        status: PTReservation.status.RESERVED,
        note: reservationNote,
      });

      setShowNewReservationModal(false);
      setSelectedMember(null);
      setReservationDate('');
      setStartTime('');
      setEndTime('');
      setReservationNote('');
      await loadData();
    } catch (error) {
      console.error('Failed to create reservation:', error);
      alert('예약 생성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 예약 취소
  const handleCancelReservation = async (reservation: Ptreservation) => {
    if (!confirm('정말 이 예약을 취소하시겠습니까?')) return;

    try {
      await PTReservation.patch(reservation.id, {
        status: PTReservation.status.CANCELLED,
        cancelreason: '트레이너에 의한 취소',
      });
      await loadData();
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
      alert('예약 취소에 실패했습니다.');
    }
  };

  const getReservationStatusBadge = (status: number) => {
    const variant =
      status === PTReservation.status.RESERVED ? 'warning' :
      status === PTReservation.status.COMPLETED ? 'success' :
      status === PTReservation.status.NO_SHOW ? 'error' : 'default';
    return <Badge variant={variant}>{PTReservation.getStatus(status)}</Badge>;
  };

  const stats = {
    totalMembers: members.length,
    todayReservations: todayReservations.length,
    pendingReservations: todayReservations.filter(r => r.status === PTReservation.status.RESERVED).length,
    completedToday: todayReservations.filter(r => r.status === PTReservation.status.COMPLETED).length,
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background.secondary
      }}>
        <div style={{ fontSize: theme.typography.fontSize.lg }}>로딩 중...</div>
      </div>
    );
  }

  if (!gymInfo) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing[8]
      }}>
        <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ fontSize: theme.typography.fontSize.xl, marginBottom: theme.spacing[4] }}>
            소속된 헬스장이 없습니다
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing[6] }}>
            헬스장 관리자에게 트레이너 등록을 요청하세요.
          </p>
          <Button variant="secondary" onClick={handleLogout}>로그아웃</Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      {/* Header */}
      <div style={{
        backgroundColor: theme.colors.background.primary,
        borderBottom: `1px solid ${theme.colors.border.light}`,
        padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[1] }}>
              {user?.name} 트레이너
            </h1>
            <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
              {gymInfo.extra?.gym?.name || '헬스장'} · {gymInfo.position || '트레이너'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
            <ProfileSwitcher />
            <Button variant="primary" onClick={() => setShowNewReservationModal(true)}>
              새 예약
            </Button>
            <Button variant="ghost" onClick={handleLogout}>로그아웃</Button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[8] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>담당 회원</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.totalMembers}명</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>오늘 예약</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.info }}>{stats.todayReservations}건</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>대기 중</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.warning }}>{stats.pendingReservations}건</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>오늘 완료</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>{stats.completedToday}건</div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[6] }}>
          {/* 오늘 예약 */}
          <Card>
            <h2 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[4] }}>
              오늘의 PT 일정
            </h2>
            {todayReservations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: theme.spacing[6], color: theme.colors.text.secondary }}>
                오늘 예약이 없습니다.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                {todayReservations.map((res) => (
                  <div
                    key={res.id}
                    style={{
                      padding: theme.spacing[3],
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.md,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[2] }}>
                      <div>
                        <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                          {res.extra?.memberuser?.name || `회원 #${res.member}`}
                        </div>
                        <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                          {res.starttime} - {res.endtime}
                        </div>
                      </div>
                      {getReservationStatusBadge(res.status)}
                    </div>
                    {/* 예약 상태가 "예약"인 경우에만 액션 버튼 표시 */}
                    {res.status === PTReservation.status.RESERVED && (
                      <div style={{ display: 'flex', gap: theme.spacing[2], marginTop: theme.spacing[2] }}>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleStatusChange(res, PTReservation.status.COMPLETED)}
                        >
                          완료
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleStatusChange(res, PTReservation.status.NO_SHOW)}
                        >
                          노쇼
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCancelReservation(res)}
                        >
                          취소
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* 담당 회원 */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[4] }}>
              <h2 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
                담당 회원
              </h2>
              <Button size="sm" variant="secondary" onClick={() => setShowNewReservationModal(true)}>
                예약 추가
              </Button>
            </div>
            {members.length === 0 ? (
              <div style={{ textAlign: 'center', padding: theme.spacing[6], color: theme.colors.text.secondary }}>
                담당 회원이 없습니다.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                {members.map((tm) => (
                  <div
                    key={tm.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: theme.spacing[2],
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.md,
                    }}
                  >
                    <span style={{ fontWeight: theme.typography.fontWeight.medium }}>
                      {tm.extra?.memberuser?.name || `회원 #${tm.member}`}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedMember(tm.member);
                        setShowNewReservationModal(true);
                      }}
                    >
                      예약
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* 이번 주 스케줄 */}
        <Card style={{ marginTop: theme.spacing[6] }}>
          <h2 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[4] }}>
            이번 주 스케줄 ({weekReservations.length}건)
          </h2>
          {weekReservations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: theme.spacing[6], color: theme.colors.text.secondary }}>
              이번 주 예약이 없습니다.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.colors.border.light}` }}>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>날짜</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>시간</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>회원</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>상태</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {weekReservations.slice(0, 20).map((res) => (
                    <tr key={res.id} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>
                        {res.reservationdate?.split('T')[0]}
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>
                        {res.starttime} - {res.endtime}
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                        {res.extra?.memberuser?.name || `회원 #${res.member}`}
                      </td>
                      <td style={{ padding: theme.spacing[3] }}>
                        {getReservationStatusBadge(res.status)}
                      </td>
                      <td style={{ padding: theme.spacing[3] }}>
                        {res.status === PTReservation.status.RESERVED && (
                          <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleStatusChange(res, PTReservation.status.COMPLETED)}
                            >
                              완료
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleStatusChange(res, PTReservation.status.NO_SHOW)}
                            >
                              노쇼
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCancelReservation(res)}
                            >
                              취소
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* 새 예약 모달 */}
      {showNewReservationModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowNewReservationModal(false)}
        >
          <Card
            style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              새 PT 예약
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              {/* 회원 선택 */}
              <div>
                <label style={{ display: 'block', marginBottom: theme.spacing[2], fontWeight: theme.typography.fontWeight.medium }}>
                  회원 선택 *
                </label>
                <select
                  value={selectedMember || ''}
                  onChange={(e) => setSelectedMember(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value="">회원을 선택하세요</option>
                  {members.map((tm) => (
                    <option key={tm.id} value={tm.member}>
                      {tm.extra?.memberuser?.name || `회원 #${tm.member}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* 예약 날짜 */}
              <Input
                label="예약 날짜 *"
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                fullWidth
              />

              {/* 시작 시간 */}
              <Input
                label="시작 시간 *"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
              />

              {/* 종료 시간 */}
              <Input
                label="종료 시간 *"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
              />

              {/* 메모 */}
              <div>
                <label style={{ display: 'block', marginBottom: theme.spacing[2], fontWeight: theme.typography.fontWeight.medium }}>
                  메모
                </label>
                <textarea
                  value={reservationNote}
                  onChange={(e) => setReservationNote(e.target.value)}
                  placeholder="PT 내용이나 특이사항을 입력하세요"
                  style={{
                    width: '100%',
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`,
                    fontSize: theme.typography.fontSize.base,
                    minHeight: '100px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setShowNewReservationModal(false);
                  setSelectedMember(null);
                  setReservationDate('');
                  setStartTime('');
                  setEndTime('');
                  setReservationNote('');
                }}
              >
                취소
              </Button>
              <Button
                variant="primary"
                fullWidth
                loading={submitting}
                onClick={handleCreateReservation}
              >
                예약 생성
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
