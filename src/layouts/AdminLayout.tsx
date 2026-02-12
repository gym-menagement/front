import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { theme } from '../theme';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Page Content */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
