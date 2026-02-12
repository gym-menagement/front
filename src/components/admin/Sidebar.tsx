import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../theme';
import { Button } from '../ui';
import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../../store/auth';
import GymSelector from '../GymSelector';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(userAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    // Clear user data
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    
    // Redirect handled by protected route or app logic
    window.location.href = '/login';
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: '대시보드', path: '/admin/dashboard' },
    { label: '회원 관리', path: '/admin/members' },
    { label: '트레이너 관리', path: '/admin/trainers' },
    { label: '상품(회원권) 관리', path: '/admin/health' },
    { label: '출석 관리', path: '/admin/attendance' },
    { label: '운동 기록', path: '/admin/workout-logs' },
    { label: '결제 관리', path: '/admin/payments' },
    { label: 'PT 예약 관리', path: '/admin/pt-reservations' },
    { label: '트레이너 배정', path: '/admin/trainer-assignments' },
    { label: '공지사항', path: '/admin/notices' },
    { label: '문의 관리', path: '/admin/inquiries' },
    { label: '주문 관리', path: '/admin/orders' },
    { label: 'QR코드 관리', path: '/admin/qrcodes' },
    { label: '트레이너 소속', path: '/admin/gymtrainers' },
    { label: '가입 회원', path: '/admin/memberships' },
    { label: '운영일 분류', path: '/admin/daytypes' },
    { label: '이용권 관리', path: '/admin/usehealth' },
    { label: '관리자 권한', path: '/admin/gym-admins' },
    { label: '설정', path: '/admin/settings' },
  ];

  return (
    <div
      style={{
        width: '250px',
        backgroundColor: '#FFFFFF',
        borderRight: `1px solid ${theme.colors.border.light}`,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* App Logo/Title */}
      <div
        style={{
          padding: theme.spacing[6],
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <h1
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.brand.primary,
            margin: 0,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/dashboard')}
        >
          Gym Manager
        </h1>
        <div style={{ 
          fontSize: theme.typography.fontSize.xs, 
          color: theme.colors.text.secondary,
          marginTop: theme.spacing[1],
          marginBottom: theme.spacing[3]
        }}>
          {user?.name}님 환영합니다
        </div>
        
        <GymSelector />
      </div>

      {/* Quick Access Section */}
      <div style={{ padding: theme.spacing[4] }}>
        <div
          style={{
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.tertiary,
            textTransform: 'uppercase',
            marginBottom: theme.spacing[3],
            letterSpacing: '0.05em',
          }}
        >
          빠른 바로가기
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => navigate('/gym/register')}
            style={{ justifyContent: 'flex-start' }}
          >
            + 헬스장 등록
          </Button>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => navigate('/admin/members')} // Assuming member list has a register button, otherwise deep link if possible
            style={{ justifyContent: 'flex-start' }}
          >
            + 회원 검색/등록
          </Button>
        </div>
      </div>

      {/* Main Menu */}
      <div style={{ flex: 1, overflowY: 'auto', padding: theme.spacing[4] }}>
        <div
          style={{
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.tertiary,
            textTransform: 'uppercase',
            marginBottom: theme.spacing[3],
            letterSpacing: '0.05em',
          }}
        >
          메뉴
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[1] }}>
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                backgroundColor: isActive(item.path)
                  ? theme.colors.brand.primary + '10' // 10% opacity hex
                  : 'transparent',
                color: isActive(item.path)
                  ? theme.colors.brand.primary
                  : theme.colors.text.secondary,
                fontWeight: isActive(item.path)
                  ? theme.typography.fontWeight.bold
                  : theme.typography.fontWeight.medium,
                fontSize: theme.typography.fontSize.sm,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  e.currentTarget.style.color = theme.colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Info & Logout */}
      <div style={{ 
        padding: theme.spacing[4], 
        borderTop: `1px solid ${theme.colors.border.light}`,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing[2]
      }}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          style={{ 
            color: theme.colors.semantic.error,
            justifyContent: 'flex-start',
            paddingLeft: 0
          }}
        >
          로그아웃
        </Button>
        <div style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.tertiary,
          textAlign: 'center'
        }}>
          © 2026 Gym Manager
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
