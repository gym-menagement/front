import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../../components/ui';
import { theme } from '../../theme';
import Report from '../../models/report';
import type { ReportSummary } from '../../types/subscription';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

// P4 CEO 리포트 (docs/roadmap-p1-p6.md)
// 차트는 외부 라이브러리 없이 SVG/CSS — 단일 색상(브랜드) + 순차 램프만 사용.
// 값 텍스트는 항상 텍스트 토큰(색상 시리즈 아님), 막대 간 2px 간격, 4px 라운드.

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const PERIODS = [
  { label: '3개월', months: 3 },
  { label: '6개월', months: 6 },
  { label: '12개월', months: 12 },
];

function periodRange(months: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - months);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { from: fmt(from), to: fmt(to) };
}

const StatTile = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Card>
    <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
      {label}
    </div>
    <div
      style={{
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text.primary,
      }}
    >
      {value}
    </div>
    {sub && (
      <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
        {sub}
      </div>
    )}
  </Card>
);

/** 월별 매출 세로 막대 — 단일 시리즈(범례 불필요), 최댓값만 직접 라벨 + 전체 hover 툴팁 */
const MonthlyBars = ({ data }: { data: ReportSummary['monthly'] }) => {
  const H = 180;
  const max = Math.max(...data.map((d) => d.revenue), 1);
  const maxIdx = data.findIndex((d) => d.revenue === max);
  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '2px',
          height: H + 40,
          minWidth: data.length * 48,
        }}
      >
        {data.map((d, i) => {
          const h = Math.max(Math.round((d.revenue / max) * H), 2);
          return (
            <div
              key={d.month}
              title={`${d.month} · ${d.revenue.toLocaleString()}원 (${d.count}건)`}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing[1] }}
            >
              {i === maxIdx && (
                <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  {(d.revenue / 10000).toLocaleString()}만
                </span>
              )}
              <div
                style={{
                  width: '70%',
                  height: h,
                  backgroundColor: theme.colors.brand.primary,
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                {d.month.slice(5)}월
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** 결제수단별 가로 막대 — 정체성은 행 라벨이 담당, 색은 단일 색상 */
const MethodBars = ({ data }: { data: ReportSummary['bymethod'] }) => {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
      {data.map((d) => (
        <div key={d.method} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
          <span
            style={{
              width: 64,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              flexShrink: 0,
            }}
          >
            {Report.getMethod(d.method)}
          </span>
          <div style={{ flex: 1, height: 16 }} title={`${d.revenue.toLocaleString()}원 (${d.count}건)`}>
            <div
              style={{
                width: `${Math.max((d.revenue / max) * 100, 1)}%`,
                height: '100%',
                backgroundColor: theme.colors.brand.primary,
                borderRadius: '0 4px 4px 0',
              }}
            />
          </div>
          <span
            style={{
              width: 100,
              textAlign: 'right',
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.primary,
              flexShrink: 0,
            }}
          >
            {d.revenue.toLocaleString()}원
          </span>
        </div>
      ))}
      {data.length === 0 && (
        <span style={{ color: theme.colors.text.tertiary, fontSize: theme.typography.fontSize.sm }}>
          기간 내 결제가 없습니다.
        </span>
      )}
    </div>
  );
};

/** 출석 히트맵 — 순차(단일 색조 light→dark), 2px 간격, 셀 hover 툴팁 */
const AttendanceHeatmap = ({ data }: { data: ReportSummary['attendance'] }) => {
  const byKey = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach((d) => m.set(`${d.dow}-${d.hour}`, d.count));
    return m;
  }, [data]);
  const max = Math.max(...data.map((d) => d.count), 1);
  // 운영시간대만 (05시~23시)
  const hours = Array.from({ length: 19 }, (_, i) => i + 5);
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'inline-block', minWidth: 560 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `28px repeat(${hours.length}, 1fr)`, gap: '2px' }}>
          <span />
          {hours.map((h) => (
            <span
              key={h}
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.tertiary,
                textAlign: 'center',
              }}
            >
              {h}
            </span>
          ))}
          {DAYS.map((day, dow) => (
            <Fragment key={dow}>
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  lineHeight: '18px',
                }}
              >
                {day}
              </span>
              {hours.map((h) => {
                const count = byKey.get(`${dow}-${h}`) || 0;
                const alpha = count === 0 ? 0 : 0.15 + (count / max) * 0.85;
                return (
                  <div
                    key={`${dow}-${h}`}
                    title={`${day} ${h}시 · ${count}명`}
                    style={{
                      height: 18,
                      borderRadius: 3,
                      backgroundColor:
                        count === 0
                          ? theme.colors.background.secondary
                          : `rgba(94, 106, 210, ${alpha.toFixed(2)})`,
                    }}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
        {/* 순차 범례 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            marginTop: theme.spacing[3],
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.tertiary,
          }}
        >
          <span>적음</span>
          {[0.15, 0.4, 0.65, 1].map((a) => (
            <div
              key={a}
              style={{ width: 18, height: 12, borderRadius: 3, backgroundColor: `rgba(94, 106, 210, ${a})` }}
            />
          ))}
          <span>많음 (최대 {max}명)</span>
        </div>
      </div>
    </div>
  );
};

const ReportDashboard = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [months, setMonths] = useState(6);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { from, to } = periodRange(months);
      setSummary(await Report.summary(selectedGymId, from, to));
    } catch (error) {
      console.error('Failed to load report:', error);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [selectedGymId, months]);

  useEffect(() => {
    if (selectedGymId) loadData();
  }, [selectedGymId, loadData]);

  const totalRevenue = summary?.monthly.reduce((s, m) => s + m.revenue, 0) ?? 0;

  return (
    <div>
      <AdminHeader title="CEO 리포트" />
      <div style={{ padding: theme.spacing[8] }}>
        {/* 기간 필터 — 차트 위 한 줄 */}
        <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[6] }}>
          {PERIODS.map((p) => (
            <button
              key={p.months}
              onClick={() => setMonths(p.months)}
              style={{
                padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${months === p.months ? theme.colors.brand.primary : theme.colors.border.light}`,
                backgroundColor: months === p.months ? theme.colors.brand.primarySubtle : theme.colors.background.primary,
                color: months === p.months ? theme.colors.brand.primary : theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                cursor: 'pointer',
              }}
            >
              최근 {p.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: theme.spacing[8], textAlign: 'center', color: theme.colors.text.tertiary }}>
            불러오는 중...
          </div>
        ) : !summary ? (
          <div style={{ padding: theme.spacing[8], textAlign: 'center', color: theme.colors.text.tertiary }}>
            리포트를 불러오지 못했습니다.
          </div>
        ) : (
          <>
            {/* 헤드라인 타일 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: theme.spacing[4],
                marginBottom: theme.spacing[6],
              }}
            >
              <StatTile label="기간 총 매출" value={`${totalRevenue.toLocaleString()}원`} />
              <StatTile label="신규 회원권" value={`${summary.newmembers}건`} />
              <StatTile
                label="재등록률"
                value={`${(summary.renewrate * 100).toFixed(1)}%`}
                sub={`만료 ${summary.expired}건 중 ${summary.renewed}건 재구매 (30일 내)`}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: theme.spacing[4],
                marginBottom: theme.spacing[6],
              }}
            >
              <Card>
                <h3 style={{ margin: 0, marginBottom: theme.spacing[4], fontSize: theme.typography.fontSize.base }}>
                  월별 매출
                </h3>
                <MonthlyBars data={summary.monthly} />
              </Card>
              <Card>
                <h3 style={{ margin: 0, marginBottom: theme.spacing[4], fontSize: theme.typography.fontSize.base }}>
                  결제수단별 매출
                </h3>
                <MethodBars data={summary.bymethod} />
              </Card>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: theme.spacing[4],
              }}
            >
              <Card>
                <h3 style={{ margin: 0, marginBottom: theme.spacing[4], fontSize: theme.typography.fontSize.base }}>
                  회원권 판매 순위
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: theme.typography.fontSize.sm }}>
                  <tbody>
                    {summary.tophealth.map((h, i) => (
                      <tr key={h.health} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                        <td style={{ padding: theme.spacing[2], color: theme.colors.text.tertiary, width: 28 }}>
                          {i + 1}
                        </td>
                        <td style={{ padding: theme.spacing[2], color: theme.colors.text.primary }}>
                          {h.name || `상품 #${h.health}`}
                        </td>
                        <td
                          style={{
                            padding: theme.spacing[2],
                            textAlign: 'right',
                            color: theme.colors.text.secondary,
                          }}
                        >
                          {h.count}건
                        </td>
                      </tr>
                    ))}
                    {summary.tophealth.length === 0 && (
                      <tr>
                        <td style={{ padding: theme.spacing[2], color: theme.colors.text.tertiary }}>
                          기간 내 주문이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Card>
              <Card>
                <h3 style={{ margin: 0, marginBottom: theme.spacing[4], fontSize: theme.typography.fontSize.base }}>
                  출석 히트맵 (요일 × 시간)
                </h3>
                <AttendanceHeatmap data={summary.attendance} />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportDashboard;
