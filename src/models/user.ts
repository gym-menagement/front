import { get, post, put, patch, del } from '../services/api';
import type {
  User,
  ApiResponse,
  ApiSingleResponse,
  UserSearchParams,
} from '../types/user';

export default class UserModel {
  // Level constants (from backend: enums/level/Enums.kt)
  static readonly level = {
    NORMAL: 1,
    MANAGER: 2,
    ADMIN: 3,
    SUPERADMIN: 4,
    ROOTADMIN: 5,
  };
  static readonly levels = [
    '',
    '일반회원',
    '트레이너/직원',
    '헬스장관리자',
    '플랫폼관리자',
    '최고관리자',
  ];

  static getLevel(value: number): string {
    return this.levels[value] || String(value);
  }

  // Use constants (from backend: enums/use/Enums.kt)
  static readonly use = {
    USE: 1,
    NOTUSE: 2,
  };
  static readonly uses = [
    '',
    '사용',
    '사용안함',
  ];

  static getUse(value: number): string {
    return this.uses[value] || String(value);
  }

  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    NORMAL: 1,
    KAKAO: 2,
    NAVER: 3,
    GOOGLE: 4,
    APPLE: 5,
  };
  static readonly types = [
    '',
    '일반',
    '카카오',
    '네이버',
    '구글',
    '애플',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Role constants (from backend: enums/role/Enums.kt)
  static readonly role = {
    MEMBER: 1,
    TRAINER: 2,
    STAFF: 3,
    GYM_ADMIN: 4,
    PLATFORM_ADMIN: 5,
  };
  static readonly roles = [
    '',
    '회원',
    '트레이너',
    '직원',
    '헬스장관리자',
    '플랫폼관리자',
  ];

  static getRole(value: number): string {
    return this.roles[value] || String(value);
  }

  // Sex constants (from backend: enums/sex/Enums.kt)
  static readonly sex = {
    MALE: 1,
    FEMALE: 2,
  };
  static readonly sexs = [
    '',
    '남성',
    '여성',
  ];

  static getSex(value: number): string {
    return this.sexs[value] || String(value);
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

  static async patch(id: number, item: Partial<User>) {
    const res = await patch<User>(`/user/${id}`, item);
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

  static async find(params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data.content || [];
  }

  static async findall(params?: UserSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data.content || [];
  }

  static async findpage(params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>('/user', { params });
    return res.data
  }

  static async count(params?: UserSearchParams) {
    const res = await get<{ count: number }>('/user/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<User>>(`/user/${id}`);
    return res.data;
  }

  static async searchByLoginid(loginid: string) {
    const res = await get<ApiSingleResponse<User>>(
      `/user/search/loginid?loginid=${loginid}`
    );
    return res.data.item;
  }

  static async searchByConnectid(connectid: string) {
    const res = await get<ApiSingleResponse<User>>(
      `/user/search/connectid?connectid=${connectid}`
    );
    return res.data.item;
  }

  static async searchByLevel(level: number, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/level?level=${level}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByEmail(email: string, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/email?email=${email}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByTel(tel: string, params?: UserSearchParams) {
    const res = await get<ApiResponse<User>>(
      `/user/search/tel?tel=${tel}`,
      { params }
    );
    return res.data.items || [];
  }
}
