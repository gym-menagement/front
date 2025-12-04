import { useEffect, useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import { Attendance, UseHealth } from '../../models';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

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
      const todayStr = today.toISOString().split('T')[0];

      // 활성 회원 수: startday <= 오늘 <= endday
      const allUseHealths = await UseHealth.find({
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
        date: todayStr,
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
        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: theme.spacing[6],
            marginBottom: theme.spacing[8],
          }}
        >
          <Card hoverable>
            <div style={{ marginBottom: theme.spacing[2] }}>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                활성 회원
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                }}
              >
                {stats.activeMembers}
              </div>
            </div>
            <Badge variant="success">이용 가능</Badge>
          </Card>

          <Card hoverable>
            <div style={{ marginBottom: theme.spacing[2] }}>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                오늘 출석
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                }}
              >
                {stats.todayAttendance}
              </div>
            </div>
            <Badge variant="info">
              {new Date().toLocaleDateString('ko-KR')}
            </Badge>
          </Card>

          <Card hoverable>
            <div style={{ marginBottom: theme.spacing[2] }}>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                만료 예정
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.semantic.warning,
                }}
              >
                {stats.expiringMemberships}
              </div>
            </div>
            <Badge variant="warning">30일 이내</Badge>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              marginBottom: theme.spacing[6],
            }}
          >
            빠른 작업
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing[4],
            }}
          >
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/members')}
            >
              회원 관리
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/trainers')}
            >
              트레이너 관리
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/health')}
            >
              회원권 상품 관리
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/categories')}
            >
              카테고리 관리
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/discounts')}
            >
              할인 관리
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/rockers')}
            >
              락커 관리
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/admin/rocker-usages')}
            >
              락커 사용내역
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/admin/workout-logs')}
            >
              운동 기록
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/admin/attendance')}
            >
              출석 현황
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/admin/payments')}
            >
              결제 내역
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/admin/settings')}
            >
              설정
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/admin/terms')}
            >
              기간 관리
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
