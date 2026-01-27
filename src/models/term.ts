import { get, post, put, patch, del } from '../services/api';
import type {
  Term,
  ApiResponse,
  ApiSingleResponse,
  TermSearchParams,
} from '../types/term';

export default class TermModel {
  // CRUD operations
  static async insert(item: Partial<Term>) {
    const res = await post<Term>('/term', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Term>[]) {
    const res = await post<Term[]>('/term/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Term>) {
    const res = await put<Term>(`/term/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Term>) {
    const res = await patch<Term>(`/term/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/term/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/term/batch', { data: ids });
    return res.data;
  }

  static async find(params?: TermSearchParams) {
    const res = await get<ApiResponse<Term>>('/term', { params });
    return res.data.content || [];
  }

  static async findall(params?: TermSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Term>>('/term', { params });
    return res.data.content || [];
  }

  static async findpage(params?: TermSearchParams) {
    const res = await get<ApiResponse<Term>>('/term', { params });
    return res.data
  }

  static async count(params?: TermSearchParams) {
    const res = await get<{ count: number }>('/term/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Term>>(`/term/${id}`);
    return res.data;
  }
}
