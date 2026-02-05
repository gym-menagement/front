import { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui';
import { theme } from '../../theme';
import { Attendance, UseHealth } from '../../models';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { formatLocalDateTime, getDayRange } from '../../global/util';

interface DashboardStats {
  activeMembers: number;
  todayAttendance: number;
  expiringMemberships: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [stats, setStats] = useState<DashboardStats>({
    activeMembers: 0,
    todayAttendance: 0,
    expiringMemberships: 0,
  });
  const [loading, setLoading] = useState(true);

  const currentUser = authService.getCurrentUser();

  const { startDate, endDate } = getDayRange(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    console.log('AdminDashboard - selectedGymId changed:', selectedGymId);
    if (selectedGymId) {
      loadDashboardStats();
    } else {
      // selectedGymId가 없으면 로딩 상태 해제
      setLoading(false);
    }
  }, [selectedGymId]);

  const loadDashboardStats = async () => {
    try {
      console.log('Loading dashboard stats...');
      setLoading(true);

      const today = new Date();

      // 활성 회원 수: startday <= 오늘 <= endday
      const allUseHealths = await UseHealth.findall({
        gym: selectedGymId,
      });

      const activeMembers = allUseHealths.filter((uh) => {
        const startDate = new Date(uh.startday);
        const endDate = new Date(uh.endday);
        return startDate <= today && today <= endDate;
      }).length;

      // 오늘 출석 수
      const todayAttendance = await Attendance.count({
        gym: selectedGymId,
        startcheckintime: formatLocalDateTime(startDate),
        endcheckintime: formatLocalDateTime(endDate),
      });

      // 만료 예정 회원권 (30일 이내)
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(today.getDate() + 30);

      const expiringMemberships = allUseHealths.filter((uh) => {
        const endDate = new Date(uh.endday);
        return endDate >= today && endDate <= thirtyDaysLater;
      }).length;

      setStats({
        activeMembers,
        todayAttendance,
        expiringMemberships,
      });
      console.log('Dashboard stats loaded successfully');
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      alert('대시보드 데이터를 불러오는데 실패했습니다: ' + error);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  if (loading) {
    return (
      <div style={{ padding: theme.spacing[8] }}>
        <div style={{ textAlign: 'center', marginTop: theme.spacing[16] }}>
          데이터를 불러오는 중...
        </div>
      </div>
    );
  }

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
          <div>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              헬스장 관리자
            </h1>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginTop: theme.spacing[1],
              }}
            >
              {currentUser?.name}님 환영합니다
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <GymSelector />
            <Button variant="ghost" onClick={handleLogout}>
              로그아웃
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
        {/* Stats Overview Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[8],
          }}
        >
          {/* Active Members */}
          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[3],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  활성 회원
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.brand.primary}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={theme.colors.brand.primary}
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.activeMembers}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                }}
              >
                이용 가능한 회원권
              </div>
            </div>
          </Card>

          {/* Today Attendance */}
          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[3],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  오늘 출석
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.success}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={theme.colors.semantic.success}
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.semantic.success,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.todayAttendance}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                }}
              >
                {new Date().toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Card>

          {/* Expiring Memberships */}
          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[3],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  만료 예정
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.warning}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={theme.colors.semantic.warning}
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.semantic.warning,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.expiringMemberships}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                }}
              >
                30일 이내 만료
              </div>
            </div>
          </Card>

          {/* Quick Stats - Placeholder for future data */}
          <Card
            hoverable
            clickable
            onClick={() => navigate('/admin/attendance')}
          >
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[3],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  전체 출석
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.brand.secondary}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={theme.colors.brand.secondary}
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                {stats.todayAttendance}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                }}
              >
                자세히 보기 →
              </div>
            </div>
          </Card>
        </div>

        {/* Management Sections Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: theme.spacing[6],
            marginBottom: theme.spacing[8],
          }}
        >
          {/* Member Management Card */}
          <Card>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: theme.spacing[6],
              }}
            >
              <h2
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.semibold,
                  margin: 0,
                }}
              >
                회원 관리
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/members')}
              >
                전체 보기 →
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
              }}
            >
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/members')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    회원 목록
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    전체 회원 정보 조회 및 관리
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/trainers')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    트레이너 관리
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    트레이너 등록 및 스케줄 관리
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/health')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    회원권 상품
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    회원권 등록, 수정, 가격 관리
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Activity Monitoring Card */}
          <Card>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: theme.spacing[6],
              }}
            >
              <h2
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.semibold,
                  margin: 0,
                }}
              >
                활동 모니터링
              </h2>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
              }}
            >
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/attendance')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    출석 현황
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    일별/월별 출석 통계 확인
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/workout-logs')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    운동 기록
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    회원별 운동 기록 조회
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/payments')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    결제 내역
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    전체 결제 기록 조회
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/pt-reservations')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    PT 예약 관리
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    PT 예약 현황 및 상태 관리
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/admin/trainer-assignments')}
                style={{
                  justifyContent: 'flex-start',
                  padding: theme.spacing[4],
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: theme.spacing[3] }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    트레이너-회원 배정
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    트레이너와 회원 연결 관리
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions Footer */}
        <Card>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              marginBottom: theme.spacing[6],
            }}
          >
            빠른 바로가기
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing[3],
            }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/members')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              회원 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/trainers')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              트레이너 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/health')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              회원권 상품
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/attendance')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              출석 현황
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/workout-logs')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              운동 기록
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/payments')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              결제 내역
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/pt-reservations')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              PT 예약 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/trainer-assignments')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              트레이너-회원 배정
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/settings')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              설정
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/notices')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              공지사항
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/inquiries')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              문의 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/orders')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              주문 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/qrcodes')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              QR코드 관리
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/gymtrainers')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              트레이너 소속
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/memberships')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
              가입 회원
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/daytypes')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              운영일 분류
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/usehealth')}
              style={{ justifyContent: 'flex-start' }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: theme.spacing[2] }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              이용권 관리
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
