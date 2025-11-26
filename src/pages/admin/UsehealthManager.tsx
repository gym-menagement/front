import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User, UseHealth } from '../../models';
import type {
  UsehealthSearchParams,
  Usehealth as UsehealthType,
} from '../../types/usehealth';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

// Extended type for usehealth with joined data
interface UsehealthWithExtra extends UsehealthType {
  extra?: {
    user?: {
      id: number;
      name: string;
      loginid: string;
      tel: string;
      use: number;
      role: number;
    };
    health?: {
      id: number;
      name: string;
    };
  };
}

const UsehealthManager = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [memberships, setMemberships] = useState<UsehealthWithExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<number | ''>('');

  useEffect(() => {
    if (selectedGymId) {
      loadMembers();
    }
  }, [filterStatus, selectedGymId]);

  const loadMembers = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setMemberships([]);
        return;
      }

      // usehealth 조회 (join된 user, health 정보 포함)
      const params: UsehealthSearchParams = { gym: selectedGymId };
      if (filterStatus !== '') {
        params.status = filterStatus;
      }

      const data = await UseHealth.find(params);

      // 회원별로 그룹화 (가장 최근 회원권 기준)
      const memberMap = new Map<number, UsehealthWithExtra>();

      data.forEach((membership: UsehealthWithExtra) => {
        // extra.user가 있고 role이 MEMBER인 경우만
        if (
          !membership.extra?.user ||
          membership.extra.user.role !== User.role.MEMBER
        )
          return;

        const userId = membership.user;
        const existing = memberMap.get(userId);

        if (!existing || new Date(membership.date) > new Date(existing.date)) {
          memberMap.set(userId, membership);
        }
      });

      setMemberships(Array.from(memberMap.values()));
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = memberships.filter((membership) => {
    const user = membership.extra?.user;
    if (!user) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.loginid.toLowerCase().includes(searchLower) ||
      user.tel.includes(searchTerm)
    );
  });

  const handleStatusChange = async (memberId: number, newStatus: number) => {
    try {
      await User.update(memberId, { use: newStatus });
      loadMembers();
    } catch (error) {
      console.error('Failed to update member status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getMembershipStatus = (usehealth: UsehealthType) => {
    const today = new Date();
    const endDate = new Date(usehealth.endday);
    const startDate = new Date(usehealth.startday);

    if (usehealth.status === UseHealth.status.EXPIRED) {
      return { label: '만료', variant: 'default' as const };
    }
    if (usehealth.status === UseHealth.status.PAUSED) {
      return { label: '일시정지', variant: 'warning' as const };
    }
    if (usehealth.status === UseHealth.status.TERMINATED) {
      return { label: '종료', variant: 'default' as const };
    }
    if (startDate <= today && today <= endDate) {
      return { label: '사용중', variant: 'success' as const };
    }
    return { label: '대기', variant: 'info' as const };
  };

  const getRemainingInfo = (usehealth: UsehealthType) => {
    const today = new Date();
    const endDate = new Date(usehealth.endday);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (usehealth.totalcount > 0) {
      // 횟수제
      return `${usehealth.remainingcount}회 남음`;
    } else {
      // 기간제
      if (diffDays < 0) {
        return '만료됨';
      }
      return `${diffDays}일 남음`;
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
              회원 관리
            </h1>
          </div>
          <GymSelector />
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
                variant={filterStatus === '' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('')}
              >
                전체
              </Button>
              <Button
                variant={
                  filterStatus === UseHealth.status.USE ? 'primary' : 'ghost'
                }
                onClick={() => setFilterStatus(UseHealth.status.USE)}
              >
                사용중
              </Button>
              <Button
                variant={
                  filterStatus === UseHealth.status.PAUSED ? 'primary' : 'ghost'
                }
                onClick={() => setFilterStatus(UseHealth.status.PAUSED)}
              >
                일시정지
              </Button>
              <Button
                variant={
                  filterStatus === UseHealth.status.EXPIRED
                    ? 'primary'
                    : 'ghost'
                }
                onClick={() => setFilterStatus(UseHealth.status.EXPIRED)}
              >
                만료
              </Button>
            </div>
          </div>
        </Card>

        {/* Members List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              회원 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredMembers.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
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
            {filteredMembers.map((usehealth) => {
              const membershipStatus = getMembershipStatus(usehealth);
              const user = usehealth.extra?.user;
              const health = usehealth.extra?.health;

              if (!user) return null;

              return (
                <Card key={usehealth.id} hoverable>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: theme.spacing[4],
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: theme.spacing[3],
                        borderBottom: `1px solid ${theme.colors.border.light}`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing[3],
                        }}
                      >
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.bold,
                            fontSize: theme.typography.fontSize.lg,
                          }}
                        >
                          {user.name}
                        </div>
                        <Badge variant={user.use === 1 ? 'success' : 'default'}>
                          {user.use === 1 ? '활성' : '비활성'}
                        </Badge>
                        <Badge variant={membershipStatus.variant}>
                          {membershipStatus.label}
                        </Badge>
                      </div>
                      <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => navigate(`/admin/members/${user.id}`)}
                        >
                          상세
                        </Button>
                        <Button
                          size="sm"
                          variant={user.use === 1 ? 'ghost' : 'primary'}
                          onClick={() =>
                            handleStatusChange(user.id, user.use === 1 ? 0 : 1)
                          }
                        >
                          {user.use === 1 ? '비활성화' : '활성화'}
                        </Button>
                      </div>
                    </div>

                    {/* Details */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: theme.spacing[4],
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          아이디
                        </div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.base,
                          }}
                        >
                          {user.loginid}
                        </div>
                      </div>

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
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.base,
                          }}
                        >
                          {user.tel}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          회원권
                        </div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.base,
                          }}
                        >
                          {health?.name || '-'}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          이용 기간
                        </div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.base,
                          }}
                        >
                          {formatDate(usehealth.startday)} ~{' '}
                          {formatDate(usehealth.endday)}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          남은 기간/횟수
                        </div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.semibold,
                            fontSize: theme.typography.fontSize.base,
                            color: theme.colors.brand.primary,
                          }}
                        >
                          {getRemainingInfo(usehealth)}
                        </div>
                      </div>

                      {usehealth.lastuseddate && (
                        <div>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                              marginBottom: theme.spacing[1],
                            }}
                          >
                            최근 이용일
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.medium,
                              fontSize: theme.typography.fontSize.base,
                            }}
                          >
                            {formatDate(usehealth.lastuseddate)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsehealthManager;
