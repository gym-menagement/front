import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, userAtom } from './store/auth';
import { User as UserModel } from './models';
import LandingPage from './pages/LandingPage';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import PaymentHistory from './pages/member/PaymentHistory';

// Gym Pages
import GymList from './pages/gym/GymList';
import GymRegisterPage from './pages/gym/GymRegisterPage';

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MemberManagement from './pages/admin/MemberManagement';
import MemberForm from './pages/admin/MemberForm';
import TrainerManagement from './pages/admin/TrainerManagement';
import TrainerForm from './pages/admin/TrainerForm';
import HealthManagement from './pages/admin/HealthManagement';
import HealthForm from './pages/admin/HealthForm';
import HealthCategoryManager from './pages/admin/HealthCategoryManager';
import DiscountManagement from './pages/admin/DiscountManagement';
import DiscountForm from './pages/admin/DiscountForm';
import WorkoutLogManagement from './pages/admin/WorkoutLogManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import TermManagement from './pages/admin/TermManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import PTReservationManagement from './pages/admin/PTReservationManagement';
import TrainerAssignmentManagement from './pages/admin/TrainerAssignmentManagement';
import NoticeManagement from './pages/admin/NoticeManagement';
import InquiryManagement from './pages/admin/InquiryManagement';
import SettingManagement from './pages/admin/SettingManagement';
import OrderManagement from './pages/admin/OrderManagement';
import QRCodeManagement from './pages/admin/QRCodeManagement';
import GymtrainerManagement from './pages/admin/GymtrainerManagement';
import MembershipManagement from './pages/admin/MembershipManagement';
import DaytypeManagement from './pages/admin/DaytypeManagement';
import UsehealthManager from './pages/admin/UsehealthManager';
import GymAdminManagement from './pages/admin/GymAdminManagement';

// Demo Page (keep for component showcase)
import ComponentsDemo from './pages/ComponentsDemo';

// Protected Route Component
const ProtectedRoute = ({
  children,
  requiredRole,
  allowedRoles,
}: {
  children: React.ReactNode;
  requiredRole?: number;
  allowedRoles?: number[];
}) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user data is loaded
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

  // Check if user has required role (single role)
  if (requiredRole !== undefined && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has one of allowed roles (multiple roles)
  if (allowedRoles !== undefined && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/gym/register"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <GymRegisterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/components" element={<ComponentsDemo />} />

        {/* Member Routes */}
        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute requiredRole={UserModel.role.MEMBER}>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/gyms"
          element={
            <ProtectedRoute requiredRole={UserModel.role.MEMBER}>
              <GymList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gym/:gymId"
          element={
            <ProtectedRoute requiredRole={UserModel.role.MEMBER}>
              <div>Gym Details (To be implemented)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/payments"
          element={
            <ProtectedRoute requiredRole={UserModel.role.MEMBER}>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

        {/* Trainer Routes */}
        <Route
          path="/trainer/dashboard"
          element={
            <ProtectedRoute requiredRole={UserModel.role.TRAINER}>
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="members/:id" element={<MemberForm />} />
          <Route path="trainers" element={<TrainerManagement />} />
          <Route path="trainers/:id" element={<TrainerForm />} />
          <Route path="health" element={<HealthManagement />} />
          <Route path="health/new" element={<HealthForm />} />
          <Route path="health/:id" element={<HealthForm />} />
          <Route path="categories" element={<HealthCategoryManager />} />
          <Route path="discounts" element={<DiscountManagement />} />
          <Route path="discounts/new" element={<DiscountForm />} />
          <Route path="discounts/:id" element={<DiscountForm />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="workout-logs" element={<WorkoutLogManagement />} />
          <Route path="terms" element={<TermManagement />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="pt-reservations" element={<PTReservationManagement />} />
          <Route path="trainer-assignments" element={<TrainerAssignmentManagement />} />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="inquiries" element={<InquiryManagement />} />
          <Route path="settings" element={<SettingManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="qrcodes" element={<QRCodeManagement />} />
          <Route path="gymtrainers" element={<GymtrainerManagement />} />
          <Route path="memberships" element={<MembershipManagement />} />
          <Route path="daytypes" element={<DaytypeManagement />} />
          <Route path="gym-admins" element={<GymAdminManagement />} />
          <Route path="usehealth" element={<UsehealthManager />} />
          {/* Catch-all redirect to dashboard */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
