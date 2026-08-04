import { get, post, del } from '../services/api';
import type { ApiResponse } from '../types/user';
import type { Subscription } from '../types/subscription';

export default class SubscriptionModel {
  // 상태 상수 (back/services/billing/billing.go 와 일치)
  static readonly status = {
    ACTIVE: 1,
    PAUSED: 2,
    CANCELLED: 3,
    FAILED: 4,
  };
  static readonly statuses = ['', '활성', '일시정지', '해지', '실패'];

  static getStatus(value: number): string {
    return this.statuses[value] || String(value);
  }

  /** 헬스장별 구독 현황 (관리자) */
  static async findByGym(gymId: number) {
    const res = await get<ApiResponse<Subscription>>(`/subscription/gym/${gymId}`);
    return res.data.content || [];
  }

  /** 내 구독 목록 (회원) */
  static async findMy() {
    const res = await get<ApiResponse<Subscription>>('/subscription/my');
    return res.data.content || [];
  }

  /** 구독 해지 */
  static async cancel(id: number) {
    const res = await del<{ code: string }>(`/subscription/${id}`);
    return res.data;
  }

  /** 실패 구독 수동 재시도 (관리자) — 실패 시 502 로 떨어진다 */
  static async retry(id: number) {
    const res = await post<{ code: string; message?: string }>(`/subscription/${id}/retry`);
    return res.data;
  }
}
