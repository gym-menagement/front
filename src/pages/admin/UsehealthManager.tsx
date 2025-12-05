import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input, Select } from '../../components/ui';
import { theme } from '../../theme';
import { User, UseHealth, Stop } from '../../models';
import type {
  UsehealthSearchParams,
  Usehealth as UsehealthType,
} from '../../types/usehealth';
import type { User as UserType } from '../../types/user';
import type { Health as HealthType } from '../../types/health';
import type { Order as OrderType } from '../../types/order';
import type { Term as TermType } from '../../types/term';
import type { Discount as DiscountType } from '../../types/discount';
import type { Gym as GymType } from '../../types/gym';
import type { Stop as StopType } from '../../types/stop';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import PauseModal from './PauseModal';
import MemberDetailModal from './MemberDetailModal';
import { formatLocalDateTime } from '../../global/util';

// Extended type for usehealth with joined data
interface UsehealthWithExtra extends UsehealthType {
  extra?: {
    order?: OrderType;
    health?: HealthType;
    user?: UserType;
    term?: TermType;
    discount?: DiscountType;
    gym?: GymType;
  };
  // 동적 계산된 일시정지 정보
  activePause?: StopType | null;
  isPaused?: boolean;
}

const UsehealthManager = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [memberships, setMemberships] = useState<UsehealthWithExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<number | ''>('');

  // 일시정지 모달 상태
  const [pauseModal, setPauseModal] = useState<{
    show: boolean;
    usehealthId: number | null;
    usehealthData: UsehealthWithExtra | null;
  }>({
    show: false,
    usehealthId: null,
    usehealthData: null,
  });

  // 상세 모달 상태
  const [detailModal, setDetailModal] = useState<{
    show: boolean;
    usehealthData: UsehealthWithExtra | null;
  }>({
    show: false,
    usehealthData: null,
  });

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

      const data = await UseHealth.findall(params);
      console.log('Total usehealth records:', data.length);
      console.log('Filter params:', params);

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

      const finalMembers = Array.from(memberMap.values());
      console.log('Final members after grouping:', finalMembers.length);
      console.log(
        'Status distribution:',
        finalMembers.reduce((acc, m) => {
          acc[m.status] = (acc[m.status] || 0) + 1;
          return acc;
        }, {} as Record<number, number>)
      );

      // 각 회원의 일시정지 상태를 동적으로 계산
      const membersWithPauseStatus = await Promise.all(
        finalMembers.map(async (member) => {
          const activePause = await getActivePause(member.id);
          return {
            ...member,
            activePause,
            isPaused: activePause !== null,
          };
        })
      );

      setMemberships(membersWithPauseStatus);
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

  // 일시정지 모달 열기
  const openPauseModal = (usehealth: UsehealthWithExtra) => {
    setPauseModal({
      show: true,
      usehealthId: usehealth.id,
      usehealthData: usehealth,
    });
  };

  // 일시정지 모달 닫기
  const closePauseModal = () => {
    setPauseModal({
      show: false,
      usehealthId: null,
      usehealthData: null,
    });
  };

  // 상세 모달 열기
  const openDetailModal = (usehealth: UsehealthWithExtra) => {
    setDetailModal({
      show: true,
      usehealthData: usehealth,
    });
  };

  // 상세 모달 닫기
  const closeDetailModal = () => {
    setDetailModal({
      show: false,
      usehealthData: null,
    });
  };

  // 현재 활성 일시정지 확인 (동적 계산)
  const getActivePause = async (usehealthId: number): Promise<StopType | null> => {
    try {
      const stops = await Stop.findall({ usehealth: usehealthId });
      const today = new Date();

      // 현재 진행중인 일시정지 찾기
      const activePause = stops.find((stop) => {
        const startDate = new Date(stop.startday);
        const endDate = new Date(stop.endday);
        return startDate <= today && today <= endDate;
      });

      return activePause || null;
    } catch (error) {
      console.error('Failed to get active pause:', error);
      return null;
    }
  };

  // 일시정지 등록
  const handlePauseMembership = async (
    usehealthId: number,
    startDate: string,
    days: number
  ) => {
    try {
      console.log(usehealthId, startDate, days);
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(startDate);
      endDateTime.setDate(endDateTime.getDate() + days);

      // 1. stop 레코드 생성 (상태는 변경하지 않음)
      const stopData = {
        usehealth: usehealthId,
        startday: formatLocalDateTime(startDateTime),
        endday: formatLocalDateTime(endDateTime),
        count: days,
        date: formatLocalDateTime(),
      };
      console.log('Stop insert data:', stopData);
      await Stop.insert(stopData);

      // 2. usehealth 종료일만 연장 (상태는 동적으로 계산하므로 변경하지 않음)
      const currentUsehealth = pauseModal.usehealthData;
      if (!currentUsehealth) return;

      const currentEndDay = new Date(currentUsehealth.endday);
      const newEndDay = new Date(currentEndDay);
      newEndDay.setDate(newEndDay.getDate() + days);

      await UseHealth.patch(usehealthId, {
        endday: formatLocalDateTime(newEndDay),
      });

      alert(`${days}일간 일시정지가 등록되었습니다.`);
      closePauseModal();
      loadMembers();
    } catch (error) {
      console.error('Failed to pause membership:', error);
      alert('일시정지 등록에 실패했습니다.');
    }
  };

  // 일시정지 조기 해제 (기간을 오늘로 단축)
  const handleResumeMembership = async (usehealthId: number) => {
    if (!confirm('일시정지를 해제하시겠습니까?')) {
      return;
    }

    try {
      // 현재 활성 일시정지 찾기
      const activePause = await getActivePause(usehealthId);
      if (!activePause) {
        alert('활성 일시정지가 없습니다.');
        return;
      }

      // 일시정지 종료일을 오늘로 변경 (조기 종료)
      const today = new Date();
      today.setHours(23, 59, 59, 999); // 오늘 끝으로 설정

      await Stop.patch(activePause.id, {
        endday: formatLocalDateTime(today),
      });

      // 회원권 종료일도 단축 (연장했던 일수만큼 빼기)
      const originalPauseDays = activePause.count;
      const actualPauseDays = Math.ceil(
        (today.getTime() - new Date(activePause.startday).getTime()) / (1000 * 60 * 60 * 24)
      );
      const reduceDays = originalPauseDays - actualPauseDays;

      if (reduceDays > 0) {
        const usehealthData = await UseHealth.get(usehealthId);
        const currentEndDay = new Date(usehealthData.item.endday);
        currentEndDay.setDate(currentEndDay.getDate() - reduceDays);

        await UseHealth.patch(usehealthId, {
          endday: formatLocalDateTime(currentEndDay),
        });
      }

      alert('일시정지가 해제되었습니다.');
      loadMembers();
    } catch (error) {
      console.error('Failed to resume membership:', error);
      alert('일시정지 해제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getMembershipStatus = (usehealth: UsehealthWithExtra) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(usehealth.endday);
    endDate.setHours(0, 0, 0, 0);
    const startDate = new Date(usehealth.startday);
    startDate.setHours(0, 0, 0, 0);

    // 이용 기간이 지난 경우
    if (endDate < today) {
      return { label: '만료', variant: 'default' as const };
    }

    // 동적으로 계산된 일시정지 상태 확인
    if (usehealth.isPaused) {
      return { label: '일시정지', variant: 'warning' as const };
    }

    // status를 사용한 상태 체크 (TERMINATED만 status로 체크)
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
      <AdminHeader title="회원 관리" />

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
            <div style={{ width: '200px' }}>
              <Select
                value={filterStatus}
                onChange={(e) => {
                  const value = e.target.value === '' ? '' : Number(e.target.value);
                  setFilterStatus(value);
                }}
                options={[
                  { value: '', label: '전체 상태' },
                  { value: UseHealth.status.USE, label: '사용중' },
                  { value: UseHealth.status.PAUSED, label: '일시정지' },
                  { value: UseHealth.status.EXPIRED, label: '만료' },
                ]}
                selectSize="md"
                fullWidth
              />
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

              // 이용 기간 체크
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const endDate = new Date(usehealth.endday);
              endDate.setHours(0, 0, 0, 0);
              const isExpired = endDate < today;

              // 동적으로 계산된 일시정지 상태 사용
              const isPaused = usehealth.isPaused || false;

              return (
                <Card hoverable key={usehealth.id}>
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
                        <Badge variant={membershipStatus.variant}>
                          {membershipStatus.label}
                        </Badge>
                        {isPaused && <Badge variant="warning">⏸️ PAUSED</Badge>}
                      </div>
                      <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => openDetailModal(usehealth)}
                        >
                          상세
                        </Button>

                        {/* 일시정지/해제 버튼 */}
                        {isPaused ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleResumeMembership(usehealth.id)}
                          >
                            일시정지 해제
                          </Button>
                        ) : !isExpired &&
                          usehealth.status !== UseHealth.status.EXPIRED &&
                          usehealth.status !== UseHealth.status.TERMINATED ? (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openPauseModal(usehealth)}
                          >
                            일시정지
                          </Button>
                        ) : null}
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

      {/* 일시정지 모달 */}
      <PauseModal
        show={pauseModal.show}
        usehealthId={pauseModal.usehealthId}
        usehealthData={pauseModal.usehealthData}
        onClose={closePauseModal}
        onConfirm={handlePauseMembership}
      />

      {/* 상세 모달 */}
      <MemberDetailModal
        show={detailModal.show}
        usehealth={detailModal.usehealthData}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default UsehealthManager;
