// Types from backend (using const types instead of enums for better compatibility)
export type UserRole = 'ADMIN' | 'MANAGER' | 'TRAINER' | 'MEMBER' | 'GUEST';

export type Status =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type Level =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PREMIUM'
  | 'VIP';

// Const objects for enum-like usage
export const UserRole = {
  ADMIN: 'ADMIN' as const,
  MANAGER: 'MANAGER' as const,
  TRAINER: 'TRAINER' as const,
  MEMBER: 'MEMBER' as const,
  GUEST: 'GUEST' as const,
};

export const Status = {
  ACTIVE: 'ACTIVE' as const,
  INACTIVE: 'INACTIVE' as const,
  PENDING: 'PENDING' as const,
  COMPLETED: 'COMPLETED' as const,
  CANCELLED: 'CANCELLED' as const,
  EXPIRED: 'EXPIRED' as const,
};

export const Level = {
  BEGINNER: 'BEGINNER' as const,
  INTERMEDIATE: 'INTERMEDIATE' as const,
  ADVANCED: 'ADVANCED' as const,
  PREMIUM: 'PREMIUM' as const,
  VIP: 'VIP' as const,
};

// API Response Types
export interface ApiResponse<T> {
  _t: number;
  code: number;
  items: T[];
}

export interface ApiSingleResponse<T> {
  _t: number;
  code: number;
  item: T;
}

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// User & Auth Types
export interface User {
  u_id: number;
  u_loginid: string;
  u_name: string;
  u_phone?: string;
  u_email?: string;
  u_birth?: string;
  u_gender?: string;
  role: UserRole;
  u_status: Status;
  u_created_at: string;
  u_updated_at?: string;
}

export interface LoginRequest {
  loginid: string;
  passwd: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Gym Types
export interface Gym {
  g_id: number;
  g_name: string;
  g_address: string;
  g_phone?: string;
  g_description?: string;
  g_image?: string;
  g_status: Status;
  g_created_at: string;
  g_latitude?: number;
  g_longitude?: number;
}

// Health (Exercise Pass) Types
export interface HealthCategory {
  hc_id: number;
  hc_name: string;
  hc_description?: string;
  hc_gym_id: number;
}

export interface Health {
  h_id: number;
  h_name: string;
  h_description?: string;
  h_price: number;
  h_category_id: number;
  h_gym_id: number;
  h_term_id?: number;
  h_count?: number;
  h_status: Status;
  category?: HealthCategory;
}

// Membership Types
export interface Membership {
  m_id: number;
  m_user_id: number;
  m_health_id: number;
  m_gym_id: number;
  m_start_date: string;
  m_end_date: string;
  m_remaining_count?: number;
  m_status: Status;
  m_created_at: string;
  health?: Health;
  gym?: Gym;
}

// Order & Payment Types
export interface Order {
  o_id: number;
  o_user_id: number;
  o_health_id: number;
  o_total_amount: number;
  o_discount_amount?: number;
  o_final_amount: number;
  o_status: Status;
  o_created_at: string;
}

export interface Payment {
  p_id: number;
  p_order_id: number;
  p_amount: number;
  p_method: string;
  p_status: Status;
  p_paid_at?: string;
  p_created_at: string;
}

// QR Code Types
export interface MemberQR {
  mq_id: number;
  mq_user_id: number;
  mq_membership_id: number;
  mq_qr_code: string;
  mq_created_at: string;
  mq_expires_at?: string;
}

// Attendance Types
export interface Attendance {
  a_id: number;
  a_user_id: number;
  a_gym_id: number;
  a_membership_id: number;
  a_check_in_time: string;
  a_check_out_time?: string;
  a_created_at: string;
}

// PT Reservation Types
export interface PTReservation {
  pr_id: number;
  pr_user_id: number;
  pr_trainer_id: number;
  pr_gym_id: number;
  pr_date: string;
  pr_start_time: string;
  pr_end_time: string;
  pr_status: number; // 0: pending, 1: completed, 2: cancelled, 3: no-show
  pr_created_at: string;
  trainer?: User;
}

// Locker Types
export interface Locker {
  r_id: number;
  r_number: string;
  r_gym_id: number;
  r_status: Status;
  r_description?: string;
}

export interface LockerUsage {
  ru_id: number;
  ru_user_id: number;
  ru_locker_id: number;
  ru_start_date: string;
  ru_end_date: string;
  ru_status: Status;
  ru_created_at: string;
  locker?: Locker;
}

// Notice & Inquiry Types
export interface Notice {
  n_id: number;
  n_title: string;
  n_content: string;
  n_gym_id?: number; // null for platform-wide
  n_created_at: string;
  n_status: Status;
}

export interface Inquiry {
  i_id: number;
  i_user_id: number;
  i_title: string;
  i_content: string;
  i_response?: string;
  i_status: Status;
  i_created_at: string;
  i_responded_at?: string;
}

// Body Metrics Types
export interface MemberBody {
  mb_id: number;
  mb_user_id: number;
  mb_weight?: number;
  mb_body_fat?: number;
  mb_muscle_mass?: number;
  mb_height?: number;
  mb_measured_at: string;
  mb_created_at: string;
}
