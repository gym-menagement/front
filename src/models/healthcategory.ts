import { get, post, put, del } from '../services/api';
import type {
  Healthcategory,
  ApiResponse,
  ApiSingleResponse,
  HealthcategorySearchParams,
} from '../types/healthcategory';

export default class HealthcategoryModel {
  // CRUD operations
  static async insert(item: Partial<Healthcategory>) {
    const res = await post<Healthcategory>('/healthcategory', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Healthcategory>[]) {
    const res = await post<Healthcategory[]>('/healthcategory/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Healthcategory>) {
    const res = await put<Healthcategory>(`/healthcategory/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/healthcategory/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/healthcategory/batch', { data: ids });
    return res.data;
  }

  static async find(params?: HealthcategorySearchParams) {
    const res = await get<ApiResponse<Healthcategory>>('/healthcategory', { params });
    return res.data.items || [];
  }

  static async count(params?: HealthcategorySearchParams) {
    const res = await get<{ count: number }>('/healthcategory/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Healthcategory>>(`/healthcategory/${id}`);
    return res.data.item;
  }
}
