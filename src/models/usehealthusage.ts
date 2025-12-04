import { get, post, put, patch, del } from '../services/api';
import type {
  Usehealthusage,
  ApiResponse,
  ApiSingleResponse,
  UsehealthusageSearchParams,
} from '../types/usehealthusage';

export default class UsehealthusageModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    ENTRY: 1,
    PT: 2,
    CLASS: 3,
  };
  static readonly types = [
    '',
    '입장',
    'PT수업',
    '그룹수업',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Usehealthusage>) {
    const res = await post<Usehealthusage>('/usehealthusage', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Usehealthusage>[]) {
    const res = await post<Usehealthusage[]>('/usehealthusage/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Usehealthusage>) {
    const res = await put<Usehealthusage>(`/usehealthusage/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Usehealthusage>) {
    const res = await patch<Usehealthusage>(`/usehealthusage/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/usehealthusage/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/usehealthusage/batch', { data: ids });
    return res.data;
  }

  static async find(params?: UsehealthusageSearchParams) {
    const res = await get<ApiResponse<Usehealthusage>>('/usehealthusage', { params });
    return res.data.content || [];
  }

  static async findall(params?: UsehealthusageSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Usehealthusage>>('/usehealthusage', { params });
    return res.data.content || [];
  }

  static async count(params?: UsehealthusageSearchParams) {
    const res = await get<{ count: number }>('/usehealthusage/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Usehealthusage>>(`/usehealthusage/${id}`);
    return res.data;
  }
}
