import { get } from '../services/api';
import type { ReportSummary } from '../types/subscription';

export default class ReportModel {
  // 결제수단 라벨 (payment p_method 와 일치)
  static readonly methods = ['', '카드', '계좌이체', '현금', '정기결제'];

  static getMethod(value: number): string {
    return this.methods[value] || String(value);
  }

  /** CEO 리포트 요약 (from/to: YYYY-MM-DD) */
  static async summary(gym: number, from: string, to: string) {
    const res = await get<{ code: string; item: ReportSummary }>('/report/summary', {
      params: { gym, from, to },
    });
    return res.data.item;
  }
}
