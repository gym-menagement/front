import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User } from '../../models';
import type { Membershipusage as MembershipusageType } from '../../types/membershipusage';
import type { User as UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const MembershipUsageManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [usages, setUsages] = useState<MembershipusageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | ''>('');
  const [typeFilter, setTypeFilter] = useState<number | ''>('');

  useEffect(() => {
    if (selectedGymId) {
      loadUsages();
      loadUsers();
    }
  }, [selectedGymId]);

  const loadUsages = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setUsages([]);
        return;
      }

      const data = await Membershipusage.find({ gym: selectedGymId });
      // 최근 사용일 순으로 정렬
      data.sort(
        (a, b) =>
          new Date(b.lastuseddate || b.date).getTime() -
          new Date(a.lastuseddate || a.date).getTime()
      );
      setUsages(data);
    } catch (error) {
      console.error('Failed to load membership usages:', error);
    } finally {
      setLoading(false);
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

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : '-';
  };

  const filteredUsages = usages.filter((usage) => {
    const userName = getUserName(usage.user);
    const matchesSearch = userName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || usage.status === statusFilter;
    const matchesType = typeFilter === '' || usage.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getStatusVariant = (status: number) => {
    switch (status) {
      case Membershipusage.status.IN_USE:
        return 'success';
      case Membershipusage.status.PAUSED:
        return 'warning';
      case Membershipusage.status.EXPIRED:
        return 'default';
      case Membershipusage.status.REFUNDED:
        return 'error';
      default:
        return 'default';
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
              회원권 이용 내역 관리
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
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: theme.spacing[4],
              alignItems: 'end',
            }}
          >
            <Input
              placeholder="회원명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: theme.spacing[2],
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                유형
              </label>
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                style={{
                  padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border.light}`,
                  backgroundColor: theme.colors.background.primary,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.base,
                  minWidth: '120px',
                }}
              >
                <option value="">전체</option>
                <option value={Membershipusage.type.PERIOD_BASED}>
                  기간제
                </option>
                <option value={Membershipusage.type.COUNT_BASED}>횟수제</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: theme.spacing[2],
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                상태
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                style={{
                  padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border.light}`,
                  backgroundColor: theme.colors.background.primary,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.base,
                  minWidth: '120px',
                }}
              >
                <option value="">전체</option>
                <option value={Membershipusage.status.IN_USE}>사용중</option>
                <option value={Membershipusage.status.PAUSED}>일시정지</option>
                <option value={Membershipusage.status.EXPIRED}>만료</option>
                <option value={Membershipusage.status.REFUNDED}>환불</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Usages List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              이용 내역을 불러오는 중...
            </div>
          </Card>
        ) : filteredUsages.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm || statusFilter || typeFilter
                ? '검색 결과가 없습니다.'
                : '이용 내역이 없습니다.'}
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
                        {getUserName(usage.user)}
                      </div>
                      <Badge
                        variant={
                          usage.type === Membershipusage.type.PERIOD_BASED
                            ? 'info'
                            : 'default'
                        }
                      >
                        {Membershipusage.getType(usage.type)}
                      </Badge>
                      <Badge variant={getStatusVariant(usage.status)}>
                        {Membershipusage.getStatus(usage.status)}
                      </Badge>
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      최근 이용:{' '}
                      {usage.lastuseddate
                        ? formatDate(usage.lastuseddate)
                        : '-'}
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
                    {usage.type === Membershipusage.type.PERIOD_BASED ? (
                      <>
                        <div>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                              marginBottom: theme.spacing[1],
                            }}
                          >
                            전체 기간
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                            }}
                          >
                            {usage.totaldays}일
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
                            사용 일수
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                            }}
                          >
                            {usage.useddays}일
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
                            남은 일수
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                              color:
                                usage.remainingdays > 0
                                  ? theme.colors.semantic.success
                                  : theme.colors.text.primary,
                            }}
                          >
                            {usage.remainingdays}일
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                              marginBottom: theme.spacing[1],
                            }}
                          >
                            전체 횟수
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                            }}
                          >
                            {usage.totalcount}회
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
                            사용 횟수
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                            }}
                          >
                            {usage.usedcount}회
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
                            남은 횟수
                          </div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.semibold,
                              fontSize: theme.typography.fontSize.base,
                              color:
                                usage.remainingcount > 0
                                  ? theme.colors.semantic.success
                                  : theme.colors.text.primary,
                            }}
                          >
                            {usage.remainingcount}회
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                          marginBottom: theme.spacing[1],
                        }}
                      >
                        시작일
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {formatDate(usage.startdate)}
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
                        종료일
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {formatDate(usage.enddate)}
                      </div>
                    </div>

                    {usage.pausedays > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          일시정지 일수
                        </div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.semibold,
                            fontSize: theme.typography.fontSize.base,
                            color: theme.colors.semantic.warning,
                          }}
                        >
                          {usage.pausedays}일
                        </div>
                      </div>
                    )}
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

export default MembershipUsageManagement;
