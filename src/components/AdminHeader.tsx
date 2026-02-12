import React from 'react';
import { Button } from './ui';
import { theme } from '../theme';
import ProfileSwitcher from './common/ProfileSwitcher';
import { useNavigate } from 'react-router-dom';

export interface AdminHeaderProps {
  title: string;
  showGymSelector?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  children?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  showGymSelector = true,
  showBackButton = true,
  backPath = '/admin/dashboard',
  children,
}) => {
  const navigate = useNavigate();

  return (
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
          <h1
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {/* {showGymSelector && <ProfileSwitcher />} */}
        </div>
        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          {children}
          {/* {showBackButton && (
            <Button variant="ghost" onClick={() => navigate(backPath)}>
              뒤로 가기
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
