import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, userAtom } from './store/auth';
import { User as UserModel } from './models';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';

// Gym Pages
import GymList from './pages/gym/GymList';
import GymRegisterPage from './pages/gym/GymRegisterPage';

// Trainer Pages (to be created)
// import TrainerDashboard from './pages/trainer/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsehealthManager from './pages/admin/UsehealthManager';
import MemberForm from './pages/admin/MemberForm';
import TrainerManagement from './pages/admin/TrainerManagement';
import TrainerForm from './pages/admin/TrainerForm';
import HealthManagement from './pages/admin/HealthManagement';
import HealthForm from './pages/admin/HealthForm';
import HealthCategoryManager from './pages/admin/HealthCategoryManager';
import DiscountManagement from './pages/admin/DiscountManagement';
import DiscountForm from './pages/admin/DiscountForm';
import RockerManagement from './pages/admin/RockerManagement';
import RockerForm from './pages/admin/RockerForm';
import RockerUsageManagement from './pages/admin/RockerUsageManagement';
import WorkoutLogManagement from './pages/admin/WorkoutLogManagement';

// Demo Page (keep for component showcase)
import ComponentsDemo from './pages/ComponentsDemo';

// Protected Route Component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: number;
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

  // Check if user has required role
  if (requiredRole !== undefined && user.role !== requiredRole) {
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
              <UsehealthManager />
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
          path="/admin/rockers"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <RockerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rockers/new"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <RockerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rockers/:id"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <RockerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rocker-usages"
          element={
            <ProtectedRoute requiredRole={UserModel.role.GYM_ADMIN}>
              <RockerUsageManagement />
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

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
