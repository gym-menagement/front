import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/api', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  del: vi.fn(),
}));

import { get, patch } from '../services/api';
import {
  PaymentStatus,
  PaymentStatusLabels,
  PaymentMethod,
  PaymentMethodLabels,
  fetchPaymentStatusMeta,
  refundPayment,
} from './payment';

// 상수는 back/services/billing/billing.go 의 DB int 값과 일치해야 한다.

describe('결제 상태·수단 상수', () => {
  it('상태 라벨이 상수 값 인덱스와 일치한다', () => {
    expect(PaymentStatusLabels[PaymentStatus.SUCCESS]).toBe('성공');
    expect(PaymentStatusLabels[PaymentStatus.PENDING]).toBe('대기');
    expect(PaymentStatusLabels[PaymentStatus.FAIL]).toBe('실패');
    expect(PaymentStatusLabels[PaymentStatus.CANCELLED]).toBe('취소');
    expect(PaymentStatusLabels[PaymentStatus.REFUNDED]).toBe('환불');
  });

  it('수단 라벨이 상수 값 인덱스와 일치한다', () => {
    expect(PaymentMethodLabels[PaymentMethod.CARD]).toBe('카드');
    expect(PaymentMethodLabels[PaymentMethod.TRANSFER]).toBe('계좌이체');
    expect(PaymentMethodLabels[PaymentMethod.CASH]).toBe('현금');
    expect(PaymentMethodLabels[PaymentMethod.BILLING]).toBe('정기결제');
  });
});

describe('fetchPaymentStatusMeta', () => {
  beforeEach(() => vi.clearAllMocks());

  it('id → 메타 Map 을 만든다 (인터셉터가 items 를 content 로 매핑한 뒤)', async () => {
    vi.mocked(get).mockResolvedValue({
      data: {
        content: [
          { id: 1, status: 1, method: 1 },
          { id: 2, status: 5, method: 3 },
        ],
      },
    } as never);

    const map = await fetchPaymentStatusMeta(7, [1, 2]);
    expect(get).toHaveBeenCalledWith('/payment/statusmeta', {
      params: { gym: 7, ids: '1,2' },
    });
    expect(map.get(2)).toEqual({ id: 2, status: 5, method: 3 });
  });

  it('빈 id 목록이면 요청 없이 빈 Map', async () => {
    const map = await fetchPaymentStatusMeta(7, []);
    expect(get).not.toHaveBeenCalled();
    expect(map.size).toBe(0);
  });
});

describe('refundPayment', () => {
  beforeEach(() => vi.clearAllMocks());

  it('기본은 회원권 종료(keepmembership=false)로 보낸다', async () => {
    vi.mocked(patch).mockResolvedValue({ data: { code: 'ok' } } as never);
    await refundPayment(3);
    expect(patch).toHaveBeenCalledWith('/payment/3/refund', {
      keepmembership: false,
    });
  });

  it('keepMembership=true 를 그대로 전달한다', async () => {
    vi.mocked(patch).mockResolvedValue({ data: { code: 'ok' } } as never);
    await refundPayment(3, true);
    expect(patch).toHaveBeenCalledWith('/payment/3/refund', {
      keepmembership: true,
    });
  });
});
