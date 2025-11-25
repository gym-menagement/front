import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { RockerUsage, Rocker, User } from '../../models';
import type { RockerUsage as RockerUsageType } from '../../types/rockerusage';
import type { Rocker as RockerType } from '../../types/rocker';
import type { User as UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const RockerUsageManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [usages, setUsages] = useState<RockerUsageType[]>([]);
  const [rockers, setRockers] = useState<RockerType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<number | 'all'>('all');

  useEffect(() => {
    if (selectedGymId) {
      loadUsages();
      loadRockers();
      loadUsers();
    }
  }, [selectedGymId, filterStatus]);

  const loadUsages = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setUsages([]);
        return;
      }

      const params: any = { gym: selectedGymId };

      if (filterStatus !== 'all') {
        params.status = filterStatus;
      }

      const data = await RockerUsage.find(params);
      setUsages(data);
    } catch (error) {
      console.error('Failed to load rocker usages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRockers = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Rocker.find({ gym: selectedGymId });
      setRockers(data);
    } catch (error) {
      console.error('Failed to load rockers:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await User.find({ role: User.role.MEMBER });
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const getRockerName = (rockerId: number) => {
    const rocker = rockers.find((r) => r.id === rockerId);
    return rocker ? rocker.name : '-';
  };

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : '-';
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge variant="default">종료</Badge>;
      case 2:
        return <Badge variant="success">사용중</Badge>;
      case 3:
        return <Badge variant="warning">연체</Badge>;
      default:
        return <Badge variant="default">-</Badge>;
    }
  };

  const filteredUsages = usages.filter((usage) => {
    const rockerName = getRockerName(usage.rocker);
    const userName = getUserName(usage.user);
    return (
      rockerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
            >
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
              락커 사용내역
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
            <Button
              variant="primary"
              onClick={() => navigate('/admin/rocker-usages/new')}
            >
              + 새 락커 배정
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
                placeholder="락커 번호 또는 회원명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                전체
              </Button>
              <Button
                variant={filterStatus === 2 ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus(2)}
                size="sm"
              >
                사용중
              </Button>
              <Button
                variant={filterStatus === 1 ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus(1)}
                size="sm"
              >
                종료
              </Button>
              <Button
                variant={filterStatus === 3 ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus(3)}
                size="sm"
              >
                연체
              </Button>
            </div>
          </div>
        </Card>

        {/* Usages List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              락커 사용내역을 불러오는 중...
            </div>
          </Card>
        ) : filteredUsages.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '락커 사용내역이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[4],
            }}
          >
            {filteredUsages.map((usage) => (
              <Card key={usage.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '150px 200px 1fr auto auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* 락커 번호 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      락커
                    </div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      {getRockerName(usage.rocker)}
                    </div>
                  </div>

                  {/* 회원 정보 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      회원
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      {getUserName(usage.user)}
                    </div>
                  </div>

                  {/* 기간 및 비용 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      사용 기간
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                      }}
                    >
                      {formatDate(usage.startdate)} ~ {formatDate(usage.enddate)}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.tertiary,
                        marginTop: theme.spacing[1],
                      }}
                    >
                      보증금: {formatPrice(usage.deposit)} / 월: {formatPrice(usage.monthlyfee)}
                    </div>
                  </div>

                  {/* 상태 */}
                  <div>{getStatusBadge(usage.status)}</div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/admin/rocker-usages/${usage.id}`)}
                    >
                      상세
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

export default RockerUsageManagement;
