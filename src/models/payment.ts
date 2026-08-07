import { get, post, put, patch, del } from '../services/api';
import type {
  Payment,
  ApiResponse,
  ApiSingleResponse,
  PaymentSearchParams,
} from '../types/payment';

export default class PaymentModel {
  // CRUD operations
  static async insert(item: Partial<Payment>) {
    const res = await post<Payment>('/payment', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Payment>[]) {
    const res = await post<Payment[]>('/payment/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Payment>) {
    const res = await put<Payment>(`/payment/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Payment>) {
    const res = await patch<Payment>(`/payment/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/payment/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/payment/batch', { data: ids });
    return res.data;
  }

  static async find(params?: PaymentSearchParams) {
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data.content || [];
  }

  static async findall(params?: PaymentSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data.content || [];
  }

  static async findpage(params?: PaymentSearchParams) {
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data
  }

  static async count(params?: PaymentSearchParams) {
    const res = await get<{ count: number }>('/payment/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Payment>>(`/payment/${id}`);
    return res.data;
  }
}

/**
 * 수동 결제 등록 (오프라인 매출).
 *
 * 생성 모델(POST /payment)은 결제수단·상태 컬럼을 모르기 때문에 전부
 * 카드·성공으로만 기록된다. 현금·계좌이체를 제대로 남기려면 이 손코드
 * 라우트를 써야 한다 (back/router/payment.go).
 */
export const PaymentMethod = {
  CARD: 1,
  TRANSFER: 2,
  CASH: 3,
  BILLING: 4,
} as const;

export const PaymentMethodLabels = ['', '카드', '계좌이체', '현금', '정기결제'];

export interface ManualPaymentInput {
  gym: number;
  user: number;
  order?: number;
  cost: number;
  method: number;
  date?: string;
  note?: string;
}

export async function insertManualPayment(input: ManualPaymentInput) {
  const res = await post<{ code: string; id: number }>('/payment/manual', input);
  return res.data;
}

/** 오기입 취소 — 행을 지우지 않고 상태만 '취소'로 바꾼다. */
export async function cancelPayment(id: number) {
  const res = await patch<{ code: string }>(`/payment/${id}/cancel`);
  return res.data;
}
