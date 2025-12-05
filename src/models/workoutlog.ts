import { get, post, put, patch, del } from '../services/api';
import type {
  Workoutlog,
  ApiResponse,
  ApiSingleResponse,
  WorkoutlogSearchParams,
} from '../types/workoutlog';

export default class WorkoutlogModel {
  // CRUD operations
  static async insert(item: Partial<Workoutlog>) {
    const res = await post<Workoutlog>('/workoutlog', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Workoutlog>[]) {
    const res = await post<Workoutlog[]>('/workoutlog/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Workoutlog>) {
    const res = await put<Workoutlog>(`/workoutlog/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Workoutlog>) {
    const res = await patch<Workoutlog>(`/workoutlog/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/workoutlog/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/workoutlog/batch', { data: ids });
    return res.data;
  }

  static async find(params?: WorkoutlogSearchParams) {
    const res = await get<ApiResponse<Workoutlog>>('/workoutlog', { params });
    return res.data.content || [];
  }

  static async findall(params?: WorkoutlogSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Workoutlog>>('/workoutlog', { params });
    return res.data.content || [];
  }

  static async findpage(params?: WorkoutlogSearchParams) {
    const res = await get<ApiResponse<Workoutlog>>('/workoutlog', { params });
    return res.data
  }

  static async count(params?: WorkoutlogSearchParams) {
    const res = await get<{ count: number }>('/workoutlog/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Workoutlog>>(`/workoutlog/${id}`);
    return res.data;
  }
}
