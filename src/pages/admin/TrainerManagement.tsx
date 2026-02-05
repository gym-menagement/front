import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User, Gymtrainer, TrainerMember, PTReservation } from '../../models';
import type { User as UserType } from '../../types/user';
import type { Gymtrainer as GymtrainerType } from '../../types/gymtrainer';
import type { Trainermember } from '../../types/trainermember';
import type { Ptreservation } from '../../types/ptreservation';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { formatLocalDateTime, getDayRange } from '../../global/util';

interface TrainerWithStats extends UserType {
  gymtrainer?: GymtrainerType;
  assignedMemberCount: number;
  todayReservationCount: number;
  pendingReservationCount: number;
}

const TrainerManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [trainers, setTrainers] = useState<TrainerWithStats[]>([]);
  const [allTrainerUsers, setAllTrainerUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerWithStats | null>(null);
  const [trainerMembers, setTrainerMembers] = useState<Trainermember[]>([]);
  const [trainerReservations, setTrainerReservations] = useState<Ptreservation[]>([]);
  const [addFormData, setAddFormData] = useState({
    selectedTrainerId: 0,
    position: '',
    note: '',
  });

  useEffect(() => {
    if (selectedGymId) {
      loadTrainers();
      loadAllTrainerUsers();
    }
  }, [filterStatus, selectedGymId]);

  const loadAllTrainerUsers = async () => {
    try {
      const users = await User.findall({ role: User.role.TRAINER });
      setAllTrainerUsers(users);
    } catch (error) {
      console.error('Failed to load trainer users:', error);
    }
  };

  const loadTrainers = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setTrainers([]);
        return;
      }

      // 1. 선택된 헬스장의 트레이너 정보 조회 (gymtrainer_tb)
      const gymTrainers = await Gymtrainer.findall({ gym: selectedGymId });
      const activeGymTrainers = gymTrainers.filter(gt => gt.status === Gymtrainer.status.IN_PROGRESS);

      if (activeGymTrainers.length === 0) {
        setTrainers([]);
        return;
      }

      const trainerUserIds = [...new Set(activeGymTrainers.map(gt => gt.trainer))];

      // 2. 트레이너 정보 조회
      const params: Record<string, unknown> = { role: User.role.TRAINER };

      if (filterStatus === 'active') {
        params.use = 1;
      } else if (filterStatus === 'inactive') {
        params.use = 0;
      }

      const allTrainers = await User.find(params);

      // 3. 해당 헬스장의 트레이너만 필터링
      const filteredTrainers = allTrainers.filter(trainer =>
        trainerUserIds.includes(trainer.id)
      );

      // 4. 각 트레이너의 담당 회원 수와 오늘 예약 수 조회
      const { startDate, endDate } = getDayRange(new Date().toISOString().split('T')[0]);

      const trainersWithStats: TrainerWithStats[] = await Promise.all(
        filteredTrainers.map(async (trainer) => {
          const gymtrainer = activeGymTrainers.find(gt => gt.trainer === trainer.id);

          // 담당 회원 수
          const assignedMembers = await TrainerMember.findall({
            trainer: trainer.id,
            gym: selectedGymId,
          });
          const activeMemberCount = assignedMembers.filter(tm => tm.status === TrainerMember.status.IN_PROGRESS).length;

          // 오늘 PT 예약 수
          const todayReservations = await PTReservation.find({
            trainer: trainer.id,
            gym: selectedGymId,
            startreservationdate: formatLocalDateTime(startDate),
            endreservationdate: formatLocalDateTime(endDate),
          });

          // 예약중 예약 수
          const pendingCount = todayReservations.filter(r => r.status === PTReservation.status.RESERVED).length;

          return {
            ...trainer,
            gymtrainer,
            assignedMemberCount: activeMemberCount,
            todayReservationCount: todayReservations.length,
            pendingReservationCount: pendingCount,
          };
        })
      );

      setTrainers(trainersWithStats);
    } catch (error) {
      console.error('Failed to load trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.loginid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.tel.includes(searchTerm)
  );

  // 이미 배정된 트레이너 제외
  const availableTrainers = allTrainerUsers.filter(
    user => !trainers.some(t => t.id === user.id)
  );

  const handleAddTrainer = async () => {
    if (!addFormData.selectedTrainerId) {
      alert('트레이너를 선택해주세요.');
      return;
    }
    try {
      await Gymtrainer.insert({
        gym: selectedGymId!,
        trainer: addFormData.selectedTrainerId,
        position: addFormData.position,
        note: addFormData.note,
        startdate: new Date().toISOString(),
        status: Gymtrainer.status.IN_PROGRESS,
        date: new Date().toISOString(),
      });
      setShowAddModal(false);
      setAddFormData({ selectedTrainerId: 0, position: '', note: '' });
      await loadTrainers();
    } catch (error) {
      console.error('Failed to add trainer:', error);
      alert('트레이너 배정에 실패했습니다.');
    }
  };

  const handleRemoveFromGym = async (trainer: TrainerWithStats) => {
    if (!confirm(`${trainer.name} 트레이너를 이 헬스장에서 제외하시겠습니까?`)) {
      return;
    }
    try {
      if (trainer.gymtrainer) {
        await Gymtrainer.patch(trainer.gymtrainer.id, {
          status: Gymtrainer.status.TERMINATED,
          enddate: new Date().toISOString(),
        });
      }
      await loadTrainers();
    } catch (error) {
      console.error('Failed to remove trainer:', error);
      alert('트레이너 제외에 실패했습니다.');
    }
  };

  const handleStatusChange = async (trainerId: number, newStatus: number) => {
    try {
      await User.update(trainerId, { use: newStatus });
      loadTrainers();
    } catch (error) {
      console.error('Failed to update trainer status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const openDetailModal = async (trainer: TrainerWithStats) => {
    setSelectedTrainer(trainer);
    setShowDetailModal(true);

    try {
      // 담당 회원 목록
      const members = await TrainerMember.findall({
        trainer: trainer.id,
        gym: selectedGymId!,
      });
      setTrainerMembers(members.filter(m => m.status === TrainerMember.status.IN_PROGRESS));

      // 이번 주 예약 목록
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      const reservations = await PTReservation.findall({
        trainer: trainer.id,
        gym: selectedGymId!,
        startreservationdate: formatLocalDateTime(weekStart),
        endreservationdate: formatLocalDateTime(weekEnd),
      });
      setTrainerReservations(reservations.sort((a, b) =>
        new Date(a.reservationdate).getTime() - new Date(b.reservationdate).getTime()
      ));
    } catch (error) {
      console.error('Failed to load trainer details:', error);
    }
  };

  const stats = {
    total: trainers.length,
    active: trainers.filter(t => t.use === 1).length,
    totalMembers: trainers.reduce((sum, t) => sum + t.assignedMemberCount, 0),
    todayReservations: trainers.reduce((sum, t) => sum + t.todayReservationCount, 0),
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="트레이너 관리">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          트레이너 배정
        </Button>
      </AdminHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>전체 트레이너</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.total}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>활성 트레이너</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>{stats.active}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>담당 회원 (전체)</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.secondary }}>{stats.totalMembers}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>오늘 PT 예약</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.info }}>{stats.todayReservations}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4], flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <Input
                placeholder="이름, 아이디, 전화번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button variant={filterStatus === 'all' ? 'primary' : 'ghost'} onClick={() => setFilterStatus('all')}>전체</Button>
              <Button variant={filterStatus === 'active' ? 'primary' : 'ghost'} onClick={() => setFilterStatus('active')}>활성</Button>
              <Button variant={filterStatus === 'inactive' ? 'primary' : 'ghost'} onClick={() => setFilterStatus('inactive')}>비활성</Button>
            </div>
          </div>
        </Card>

        {/* Trainers List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>트레이너 목록을 불러오는 중...</div>
          </Card>
        ) : filteredTrainers.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '배정된 트레이너가 없습니다.'}
              {!searchTerm && (
                <div style={{ marginTop: theme.spacing[4] }}>
                  <Button variant="primary" onClick={() => setShowAddModal(true)}>첫 트레이너 배정하기</Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: theme.spacing[4] }}>
                  {/* 트레이너 정보 */}
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], marginBottom: theme.spacing[1] }}>
                      <span style={{ fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.lg }}>{trainer.name}</span>
                      <Badge variant={trainer.use === 1 ? 'success' : 'default'}>{trainer.use === 1 ? '활성' : '비활성'}</Badge>
                      {trainer.gymtrainer?.position && (
                        <Badge variant="info">{trainer.gymtrainer.position}</Badge>
                      )}
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                      {trainer.loginid} · {trainer.tel}
                    </div>
                  </div>

                  {/* 통계 */}
                  <div style={{ display: 'flex', gap: theme.spacing[6] }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>담당 회원</div>
                      <div style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>
                        {trainer.assignedMemberCount}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>오늘 예약</div>
                      <div style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>
                        {trainer.todayReservationCount}
                      </div>
                    </div>
                    {trainer.pendingReservationCount > 0 && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>대기중</div>
                        <div style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.warning }}>
                          {trainer.pendingReservationCount}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button size="sm" variant="secondary" onClick={() => openDetailModal(trainer)}>상세</Button>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/trainers/${trainer.id}`)}>수정</Button>
                    <Button
                      size="sm"
                      variant={trainer.use === 1 ? 'ghost' : 'primary'}
                      onClick={() => handleStatusChange(trainer.id, trainer.use === 1 ? 0 : 1)}
                    >
                      {trainer.use === 1 ? '비활성화' : '활성화'}
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleRemoveFromGym(trainer)}>제외</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '500px', maxHeight: '80vh', overflow: 'auto',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              트레이너 배정
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              <div>
                <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>트레이너 선택</label>
                <select
                  value={addFormData.selectedTrainerId}
                  onChange={(e) => setAddFormData({ ...addFormData, selectedTrainerId: Number(e.target.value) })}
                  style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}
                >
                  <option value={0}>선택해주세요</option>
                  {availableTrainers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.email || t.loginid})</option>
                  ))}
                </select>
                {availableTrainers.length === 0 && (
                  <p style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.semantic.warning, marginTop: theme.spacing[1] }}>
                    배정 가능한 트레이너가 없습니다. 트레이너 계정을 먼저 생성해주세요.
                  </p>
                )}
              </div>
              <Input
                label="직책"
                value={addFormData.position}
                onChange={(e) => setAddFormData({ ...addFormData, position: e.target.value })}
                placeholder="예: 헤드 트레이너, PT 담당"
              />
              <Input
                label="메모"
                value={addFormData.note}
                onChange={(e) => setAddFormData({ ...addFormData, note: e.target.value })}
                placeholder="선택사항"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleAddTrainer}>배정</Button>
            </div>
          </div>
        </div>
      )}

      {/* Trainer Detail Modal */}
      {showDetailModal && selectedTrainer && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '700px', maxHeight: '85vh', overflow: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[6] }}>
              <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, margin: 0 }}>
                {selectedTrainer.name} 트레이너
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>닫기</Button>
            </div>

            {/* 기본 정보 */}
            <Card style={{ marginBottom: theme.spacing[4], backgroundColor: theme.colors.background.secondary }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>연락처</div>
                  <div style={{ fontSize: theme.typography.fontSize.sm }}>{selectedTrainer.tel}</div>
                </div>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>이메일</div>
                  <div style={{ fontSize: theme.typography.fontSize.sm }}>{selectedTrainer.email || selectedTrainer.loginid}</div>
                </div>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>직책</div>
                  <div style={{ fontSize: theme.typography.fontSize.sm }}>{selectedTrainer.gymtrainer?.position || '-'}</div>
                </div>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>배정일</div>
                  <div style={{ fontSize: theme.typography.fontSize.sm }}>
                    {selectedTrainer.gymtrainer?.startdate ? selectedTrainer.gymtrainer.startdate.split('T')[0] : '-'}
                  </div>
                </div>
              </div>
            </Card>

            {/* 담당 회원 */}
            <div style={{ marginBottom: theme.spacing[4] }}>
              <h3 style={{ fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[3] }}>
                담당 회원 ({trainerMembers.length}명)
              </h3>
              {trainerMembers.length === 0 ? (
                <Card><div style={{ textAlign: 'center', padding: theme.spacing[4], color: theme.colors.text.secondary }}>담당 회원이 없습니다.</div></Card>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing[2] }}>
                  {trainerMembers.map((tm) => (
                    <Badge key={tm.id} variant="default">
                      {tm.extra?.memberuser?.name || `회원 #${tm.member}`}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* 이번 주 예약 */}
            <div>
              <h3 style={{ fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[3] }}>
                이번 주 PT 예약 ({trainerReservations.length}건)
              </h3>
              {trainerReservations.length === 0 ? (
                <Card><div style={{ textAlign: 'center', padding: theme.spacing[4], color: theme.colors.text.secondary }}>예약이 없습니다.</div></Card>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                  {trainerReservations.slice(0, 10).map((res) => (
                    <Card key={res.id} style={{ padding: theme.spacing[3] }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: theme.typography.fontWeight.medium, fontSize: theme.typography.fontSize.sm }}>
                            {res.extra?.memberuser?.name || `회원 #${res.member}`}
                          </div>
                          <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                            {res.reservationdate?.split('T')[0]} {res.starttime} - {res.endtime}
                          </div>
                        </div>
                        <Badge
                          variant={
                            res.status === PTReservation.status.RESERVED ? 'warning' :
                            res.status === PTReservation.status.COMPLETED ? 'success' :
                            res.status === PTReservation.status.NO_SHOW ? 'error' : 'default'
                          }
                        >
                          {PTReservation.getStatus(res.status)}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                  {trainerReservations.length > 10 && (
                    <div style={{ textAlign: 'center', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                      외 {trainerReservations.length - 10}건
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => navigate(`/admin/trainers/${selectedTrainer.id}`)}>정보 수정</Button>
              <Button variant="primary" onClick={() => navigate('/admin/pt-reservations')}>예약 관리로 이동</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;
