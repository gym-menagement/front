import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, userAtom } from './store/auth';
import { User as UserModel } from './models';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import PaymentHistory from './pages/member/PaymentHistory';

// Gym Pages
import GymList from './pages/gym/GymList';
import GymRegisterPage from './pages/gym/GymRegisterPage';

// Trainer Pages (to be created)
// import TrainerDashboard from './pages/trainer/Dashboard';

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
        <Route path="/gym/register" element={<GymRegisterPage />} />
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
              <div>Trainer Dashboard (To be implemented)</div>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <MemberManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members/:id"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <MemberForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <TrainerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers/:id"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <TrainerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/health"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <HealthManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/health/new"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <HealthForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/health/:id"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <HealthForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <HealthCategoryManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/discounts"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <DiscountManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/discounts/new"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <DiscountForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/discounts/:id"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <DiscountForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <PaymentManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/workout-logs"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <WorkoutLogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/terms"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <TermManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pt-reservations"
          element={
            <ProtectedRoute
              allowedRoles={[UserModel.role.GYM_ADMIN, UserModel.role.TRAINER]}
            >
              <PTReservationManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainer-assignments"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <TrainerAssignmentManagement />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
