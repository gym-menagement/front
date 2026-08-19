import { describe, it, expect } from 'vitest';
import { normalizeGoListResponse } from './api';

// Go 백엔드 { code, items, total } → Spring envelope 정규화의 회귀 테스트.
// 백엔드 목록 응답 형태를 바꾸면 이 계약도 함께 바뀌어야 한다 (CLAUDE.md).

describe('normalizeGoListResponse', () => {
  it('목록 응답을 Spring envelope 로 채운다', () => {
    const d: Record<string, unknown> = {
      code: 'ok',
      items: [{ id: 1 }, { id: 2 }],
      total: 23,
    };
    normalizeGoListResponse(d, { page: 1, pagesize: 10 });

    expect(d.content).toEqual([{ id: 1 }, { id: 2 }]);
    expect(d.totalElements).toBe(23);
    expect(d.count).toBe(23);
    expect(d.page).toBe(1);
    expect(d.pageSize).toBe(10);
    expect(d.totalPages).toBe(3); // ceil(23/10)
    expect(d.first).toBe(false);
    expect(d.last).toBe(false);
    expect(d.empty).toBe(false);
  });

  it('pagesize 가 없으면 items 길이를 페이지 크기로 쓴다', () => {
    const d: Record<string, unknown> = { code: 'ok', items: [{ id: 1 }], total: 1 };
    normalizeGoListResponse(d, {});
    expect(d.pageSize).toBe(1);
    expect(d.totalPages).toBe(1);
    expect(d.first).toBe(true);
    expect(d.last).toBe(true);
  });

  it('빈 목록도 envelope 은 완성된다', () => {
    const d: Record<string, unknown> = { code: 'ok', items: [], total: 0 };
    normalizeGoListResponse(d, { page: 0, pagesize: 10 });
    expect(d.content).toEqual([]);
    expect(d.totalPages).toBe(0);
    expect(d.empty).toBe(true);
    expect(d.last).toBe(true);
  });

  it('백엔드가 이미 채운 필드는 덮어쓰지 않는다', () => {
    const d: Record<string, unknown> = {
      items: [{ id: 1 }],
      total: 1,
      content: ['preset'],
    };
    normalizeGoListResponse(d, {});
    expect(d.content).toEqual(['preset']);
  });

  it('count 응답 { total } 에 count alias 를 단다', () => {
    const d: Record<string, unknown> = { code: 'ok', total: 7 };
    normalizeGoListResponse(d, {});
    expect(d.count).toBe(7);
  });

  it('단건 { item } 응답은 건드리지 않는다', () => {
    const d: Record<string, unknown> = { code: 'ok', item: { id: 1 } };
    normalizeGoListResponse(d, {});
    expect(d).toEqual({ code: 'ok', item: { id: 1 } });
  });

  it('null·배열 응답은 무시한다', () => {
    expect(() => normalizeGoListResponse(null, {})).not.toThrow();
    const arr = [1, 2] as unknown as Record<string, unknown>;
    normalizeGoListResponse(arr, {});
    expect(arr).toEqual([1, 2]);
  });
});
