import { get, post, put, patch, del } from '../services/api';
import type {
  Notice,
  ApiResponse,
  ApiSingleResponse,
  NoticeSearchParams,
} from '../types/notice';

export default class NoticeModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    GENERAL: 1,
    IMPORTANT: 2,
    EVENT: 3,
  };
  static readonly types = [
    '',
    '일반',
    '중요',
    '이벤트',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Ispopup constants (from backend: enums/ispopup/Enums.kt)
  static readonly ispopup = {
    NO: 1,
    YES: 2,
  };
  static readonly ispopups = [
    '',
    '아니오',
    '예',
  ];

  static getIspopup(value: number): string {
    return this.ispopups[value] || String(value);
  }

  // Ispush constants (from backend: enums/ispush/Enums.kt)
  static readonly ispush = {
    NO: 1,
    YES: 2,
  };
  static readonly ispushs = [
    '',
    '아니오',
    '예',
  ];

  static getIspush(value: number): string {
    return this.ispushs[value] || String(value);
  }

  // Target constants (from backend: enums/target/Enums.kt)
  static readonly target = {
    ALL: 1,
    MEMBERS_ONLY: 2,
    SPECIFIC_MEMBERS: 3,
  };
  static readonly targets = [
    '',
    '전체',
    '회원만',
    '특정회원',
  ];

  static getTarget(value: number): string {
    return this.targets[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    PRIVATE: 1,
    PUBLIC: 2,
  };
  static readonly statuss = [
    '',
    '비공개',
    '공개',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Notice>) {
    const res = await post<Notice>('/notice', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Notice>[]) {
    const res = await post<Notice[]>('/notice/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Notice>) {
    const res = await put<Notice>(`/notice/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Notice>) {
    const res = await patch<Notice>(`/notice/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/notice/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/notice/batch', { data: ids });
    return res.data;
  }

  static async find(params?: NoticeSearchParams) {
    const res = await get<ApiResponse<Notice>>('/notice', { params });
    return res.data.content || [];
  }

  static async findall(params?: NoticeSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Notice>>('/notice', { params });
    return res.data.content || [];
  }

  static async count(params?: NoticeSearchParams) {
    const res = await get<{ count: number }>('/notice/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Notice>>(`/notice/${id}`);
    return res.data;
  }
}
