import { get, post, put, del } from '../services/api';
import type {
  User,
  ApiResponse,
  ApiSingleResponse,
  UserRole,
  Status,
} from '../types';

export default class UserModel {
  // Role constants (from backend: enums/role/Enums.kt)
  static readonly role = {
    NONE: 'NONE' as const,
    MEMBER: 'MEMBER' as const,
    TRAINER: 'TRAINER' as const,
    STAFF: 'STAFF' as const,
    GYM_ADMIN: 'GYM_ADMIN' as const,
    PLATFORM_ADMIN: 'PLATFORM_ADMIN' as const,
  };

  static readonly roles = {
    NONE: '',
    MEMBER: '회원',
    TRAINER: '트레이너',
    STAFF: '직원',
    GYM_ADMIN: '헬스장관리자',
    PLATFORM_ADMIN: '플랫폼관리자',
  };

  // Level constants (from backend: enums/user/Enums.kt - Level)
  static readonly level = {
    NONE: 'NONE' as const,
    NORMAL: 'NORMAL' as const,
    MANAGER: 'MANAGER' as const,
    ADMIN: 'ADMIN' as const,
    SUPERADMIN: 'SUPERADMIN' as const,
    ROOTADMIN: 'ROOTADMIN' as const,
  };

  static readonly levels = {
    NONE: '',
    NORMAL: '일반회원',
    MANAGER: '트레이너/직원',
    ADMIN: '헬스장관리자',
    SUPERADMIN: '플랫폼관리자',
    ROOTADMIN: '최고관리자',
  };

  // Use constants (from backend: enums/user/Enums.kt - Use)
  static readonly use = {
    NONE: 'NONE' as const,
    USE: 'USE' as const,
    NOTUSE: 'NOTUSE' as const,
  };

  static readonly uses = {
    NONE: '',
    USE: '사용',
    NOTUSE: '사용안함',
  };

  // Type constants (from backend: enums/user/Enums.kt - Type)
  static readonly type = {
    NONE: 'NONE' as const,
    NORMAL: 'NORMAL' as const,
    KAKAO: 'KAKAO' as const,
    NAVER: 'NAVER' as const,
    GOOGLE: 'GOOGLE' as const,
    APPLE: 'APPLE' as const,
  };

  static readonly types = {
    NONE: '',
    NORMAL: '일반',
    KAKAO: '카카오',
    NAVER: '네이버',
    GOOGLE: '구글',
    APPLE: '애플',
  };

  // Sex constants (from backend: enums/user/Enums.kt - Sex)
  static readonly sex = {
    NONE: 'NONE' as const,
    MALE: 'MALE' as const,
    FEMALE: 'FEMALE' as const,
  };

  static readonly sexes = {
    NONE: '',
    MALE: '남성',
    FEMALE: '여성',
  };

  // Status constants
  static readonly status = {
    NONE: 'NONE' as const,
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
    PENDING: 'PENDING' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '활성',
    INACTIVE: '비활성',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  // Helper methods
  static getRole(value: string): string {
    return this.roles[value as keyof typeof this.roles] || value;
  }

  static getLevel(value: string): string {
    return this.levels[value as keyof typeof this.levels] || value;
  }

  static getUse(value: string): string {
    return this.uses[value as keyof typeof this.uses] || value;
  }

  static getType(value: string): string {
    return this.types[value as keyof typeof this.types] || value;
  }

  static getSex(value: string): string {
    return this.sexes[value as keyof typeof this.sexes] || value;
  }

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  // CRUD operations
  static async insert(item: Partial<User>) {
    const res = await post<User>('/user', item);
    return res.data;
  }

  static async insertBatch(items: Partial<User>[]) {
    const res = await post<User[]>('/user/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<User>) {
    const res = await put<User>(`/user/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/user/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/user/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/user/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<User>>(`/user/${id}`);
    return res.data.item;
  }

  // Search methods
  static async searchByLoginid(loginid: string) {
    const res = await get<ApiSingleResponse<User>>(
      `/user/search/loginid?loginid=${loginid}`
    );
    return res.data.item;
  }

  static async searchByName(name: string, params?: any) {
    const res = await get<ApiResponse<User>>(`/user/search/name?name=${name}`, {
      params,
    });
    return res.data.items || [];
  }

  static async searchByRole(role: UserRole, params?: any) {
    const res = await get<ApiResponse<User>>(`/user/search/role?role=${role}`, {
      params,
    });
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<User>>(
      `/user/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
