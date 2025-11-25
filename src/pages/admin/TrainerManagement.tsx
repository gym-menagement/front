import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User, Gymtrainer } from '../../models';
import type { User as UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const TrainerManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [trainers, setTrainers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    if (selectedGymId) {
      loadTrainers();
    }
  }, [filterStatus, selectedGymId]);

  const loadTrainers = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setTrainers([]);
        return;
      }

      // 1. 선택된 헬스장의 트레이너 ID 조회 (gymtrainer_tb 사용)
      const gymTrainers = await Gymtrainer.find({ gym: selectedGymId });
      const trainerUserIds = [...new Set(gymTrainers.map(gt => gt.trainer))];

      if (trainerUserIds.length === 0) {
        setTrainers([]);
        return;
      }

      // 2. 트레이너 정보 조회
      const params: any = { role: User.role.TRAINER };

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

      setTrainers(filteredTrainers);
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

  const handleStatusChange = async (trainerId: number, newStatus: number) => {
    try {
      await User.update(trainerId, { use: newStatus });
      loadTrainers();
    } catch (error) {
      console.error('Failed to update trainer status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (trainerId: number, trainerName: string) => {
    if (!confirm(`${trainerName} 트레이너를 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await User.remove(trainerId);
      loadTrainers();
    } catch (error) {
      console.error('Failed to delete trainer:', error);
      alert('트레이너 삭제에 실패했습니다.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[4] }}>
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              ← 대시보드
            </Button>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              트레이너 관리
            </h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <GymSelector />
            <Button variant="primary" onClick={() => navigate('/admin/trainers/new')}>
              + 새 트레이너 등록
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[4],
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <Input
                placeholder="이름, 아이디, 전화번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('all')}
              >
                전체
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('active')}
              >
                활성
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('inactive')}
              >
                비활성
              </Button>
            </div>
          </div>
        </Card>

        {/* Trainers List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              트레이너 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredTrainers.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 트레이너가 없습니다.'}
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* 트레이너 정보 */}
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      {trainer.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {trainer.loginid}
                    </div>
                  </div>

                  {/* 연락처 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      전화번호
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.sm }}>
                      {trainer.tel}
                    </div>
                  </div>

                  {/* 상태 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      상태
                    </div>
                    <Badge variant={trainer.use === 1 ? 'success' : 'default'}>
                      {trainer.use === 1 ? '활성' : '비활성'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/admin/trainers/${trainer.id}`)}
                    >
                      상세
                    </Button>
                    <Button
                      size="sm"
                      variant={trainer.use === 1 ? 'ghost' : 'primary'}
                      onClick={() => handleStatusChange(trainer.id, trainer.use === 1 ? 0 : 1)}
                    >
                      {trainer.use === 1 ? '비활성화' : '활성화'}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(trainer.id, trainer.name)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerManagement;
