import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Gymtrainer, User } from '../../models';
import type { Gymtrainer as GymtrainerType } from '../../types/gymtrainer';
import type { User as UserType } from '../../types/user';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const GymtrainerManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [gymtrainers, setGymtrainers] = useState<GymtrainerType[]>([]);
  const [trainers, setTrainers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    trainer: 0,
    position: '',
    note: '',
    startdate: '',
    enddate: '',
  });

  useEffect(() => {
    if (selectedGymId) {
      loadData();
    }
  }, [selectedGymId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [gtData, trainerData] = await Promise.all([
        Gymtrainer.findall({ gym: selectedGymId! }),
        User.findall({ role: User.role.TRAINER }),
      ]);
      setGymtrainers(gtData);
      setTrainers(trainerData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      trainer: 0,
      position: '',
      note: '',
      startdate: new Date().toISOString().split('T')[0],
      enddate: '',
    });
    setShowAddModal(true);
  };

  const handleAdd = async () => {
    if (!formData.trainer) {
      alert('트레이너를 선택해주세요.');
      return;
    }
    try {
      await Gymtrainer.insert({
        gym: selectedGymId!,
        trainer: formData.trainer,
        position: formData.position,
        note: formData.note,
        startdate: formData.startdate ? `${formData.startdate}T00:00:00` : new Date().toISOString(),
        enddate: formData.enddate ? `${formData.enddate}T23:59:59` : undefined,
        status: Gymtrainer.status.IN_PROGRESS,
        date: new Date().toISOString(),
      });
      setShowAddModal(false);
      await loadData();
    } catch (error) {
      console.error('Failed to add gymtrainer:', error);
      alert('등록에 실패했습니다.');
    }
  };

  const handleTerminate = async (id: number) => {
    if (!confirm('정말 종료하시겠습니까?')) return;
    try {
      await Gymtrainer.patch(id, {
        status: Gymtrainer.status.TERMINATED,
        enddate: new Date().toISOString(),
      });
      await loadData();
    } catch (error) {
      console.error('Failed to terminate:', error);
      alert('종료 처리에 실패했습니다.');
    }
  };

  const handleReactivate = async (id: number) => {
    try {
      await Gymtrainer.patch(id, {
        status: Gymtrainer.status.IN_PROGRESS,
        enddate: undefined,
      });
      await loadData();
    } catch (error) {
      console.error('Failed to reactivate:', error);
      alert('재활성화에 실패했습니다.');
    }
  };

  const filteredGymtrainers = gymtrainers.filter((gt) => {
    if (filterStatus !== null && gt.status !== filterStatus) return false;
    return true;
  });

  // Filter out trainers already assigned to this gym
  const assignedTrainerIds = gymtrainers
    .filter((gt) => gt.status === Gymtrainer.status.IN_PROGRESS)
    .map((gt) => gt.trainer);
  const availableTrainers = trainers.filter((t) => !assignedTrainerIds.includes(t.id));

  const stats = {
    total: gymtrainers.length,
    active: gymtrainers.filter((gt) => gt.status === Gymtrainer.status.IN_PROGRESS).length,
    terminated: gymtrainers.filter((gt) => gt.status === Gymtrainer.status.TERMINATED).length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="트레이너 소속 관리">
        <Button variant="primary" onClick={openAddModal}>
          트레이너 배정
        </Button>
      </AdminHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>전체</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.total}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>활동중</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>{stats.active}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>종료</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text.tertiary }}>{stats.terminated}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[2] }}>
            <Button variant={filterStatus === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(null)}>전체</Button>
            <Button variant={filterStatus === Gymtrainer.status.IN_PROGRESS ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Gymtrainer.status.IN_PROGRESS)}>활동중</Button>
            <Button variant={filterStatus === Gymtrainer.status.TERMINATED ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Gymtrainer.status.TERMINATED)}>종료</Button>
          </div>
        </Card>

        {/* Gymtrainer List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : filteredGymtrainers.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>소속 트레이너가 없습니다.</div></Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            {filteredGymtrainers.map((gt) => (
              <Card key={gt.id} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], marginBottom: theme.spacing[2] }}>
                      <span style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
                        {gt.extra?.traineruser?.name || `#${gt.trainer}`}
                      </span>
                      <Badge variant={gt.status === Gymtrainer.status.IN_PROGRESS ? 'success' : 'default'}>
                        {Gymtrainer.getStatus(gt.status)}
                      </Badge>
                      {gt.position && (
                        <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                          ({gt.position})
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary, display: 'flex', gap: theme.spacing[4] }}>
                      <span>시작: {gt.startdate ? gt.startdate.split('T')[0] : '-'}</span>
                      {gt.enddate && <span>종료: {gt.enddate.split('T')[0]}</span>}
                      {gt.note && <span>메모: {gt.note}</span>}
                    </div>
                  </div>
                  <div>
                    {gt.status === Gymtrainer.status.IN_PROGRESS ? (
                      <Button variant="danger" size="sm" onClick={() => handleTerminate(gt.id)}>종료</Button>
                    ) : (
                      <Button variant="primary" size="sm" onClick={() => handleReactivate(gt.id)}>재활성화</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '500px',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              트레이너 배정
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              <div>
                <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>트레이너 선택</label>
                <select
                  value={formData.trainer}
                  onChange={(e) => setFormData({ ...formData, trainer: Number(e.target.value) })}
                  style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}
                >
                  <option value={0}>선택해주세요</option>
                  {availableTrainers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.email})</option>
                  ))}
                </select>
                {availableTrainers.length === 0 && (
                  <p style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.semantic.warning, marginTop: theme.spacing[1] }}>
                    배정 가능한 트레이너가 없습니다.
                  </p>
                )}
              </div>
              <Input label="직책" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} placeholder="예: 헤드 트레이너, PT 담당" />
              <Input label="메모" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} placeholder="선택사항" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                <Input label="시작일" type="date" value={formData.startdate} onChange={(e) => setFormData({ ...formData, startdate: e.target.value })} />
                <Input label="종료일" type="date" value={formData.enddate} onChange={(e) => setFormData({ ...formData, enddate: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleAdd}>배정</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymtrainerManagement;
