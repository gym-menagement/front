import { useCallback, useEffect, useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import Subscription from '../../models/subscription';
import { User } from '../../models';
import type { Subscription as SubscriptionType } from '../../types/subscription';
import type { User as UserType } from '../../types/user';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

// P1 정기 구독결제 — 헬스장별 구독 현황 (docs/roadmap-p1-p6.md)
const SubscriptionManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [users, setUsers] = useState<Map<number, UserType>>(new Map());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const subs = await Subscription.findByGym(selectedGymId);
      setSubscriptions(subs);
      // 회원 이름 표시용 — 구독자만 조회
      const ids = [...new Set(subs.map((s) => s.user))];
      if (ids.length > 0) {
        const all = await User.findall({});
        setUsers(new Map(all.filter((u) => ids.includes(u.id)).map((u) => [u.id, u])));
      }
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedGymId]);

  useEffect(() => {
    if (selectedGymId) loadData();
  }, [selectedGymId, loadData]);

  const handleCancel = async (sub: SubscriptionType) => {
    if (!confirm(`구독 #${sub.id} 을 해지할까요? 다음 결제부터 청구되지 않습니다.`)) return;
    try {
      setBusy(sub.id);
      await Subscription.cancel(sub.id);
      await loadData();
    } catch (error) {
      console.error('Cancel failed:', error);
      alert('해지에 실패했습니다.');
    } finally {
      setBusy(null);
    }
  };

  const handleRetry = async (sub: SubscriptionType) => {
    if (!confirm(`구독 #${sub.id} 결제를 지금 재시도할까요?`)) return;
    try {
      setBusy(sub.id);
      await Subscription.retry(sub.id);
      alert('재시도 성공 — 회원권이 연장되었습니다.');
      await loadData();
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        '결제 재시도에 실패했습니다.';
      alert(`재시도 실패: ${msg}`);
      await loadData(); // 실패 카운트 갱신 반영
    } finally {
      setBusy(null);
    }
  };

  const statusVariant = (status: number): 'success' | 'warning' | 'default' | 'error' => {
    switch (status) {
      case Subscription.status.ACTIVE:
        return 'success';
      case Subscription.status.PAUSED:
        return 'warning';
      case Subscription.status.FAILED:
        return 'error';
      default:
        return 'default';
    }
  };

  const filtered = filterStatus
    ? subscriptions.filter((s) => s.status === filterStatus)
    : subscriptions;

  const activeCount = subscriptions.filter((s) => s.status === Subscription.status.ACTIVE).length;
  const failedCount = subscriptions.filter((s) => s.status === Subscription.status.FAILED).length;
  const monthlyRevenue = subscriptions
    .filter((s) => s.status === Subscription.status.ACTIVE)
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div>
      <AdminHeader title="구독 관리" />
      <div style={{ padding: theme.spacing[8] }}>
        {/* 요약 타일 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[6],
          }}
        >
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
              활성 구독
            </div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.semibold }}>
              {activeCount}건
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
              월 예상 매출
            </div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.semibold }}>
              {monthlyRevenue.toLocaleString()}원
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
              결제 실패
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.semibold,
                color: failedCount > 0 ? theme.colors.semantic.error : theme.colors.text.primary,
              }}
            >
              {failedCount}건
            </div>
          </Card>
        </div>

        {/* 상태 필터 */}
        <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[4] }}>
          <Button
            variant={filterStatus === null ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterStatus(null)}
          >
            전체 ({subscriptions.length})
          </Button>
          {[1, 2, 3, 4].map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus(s)}
            >
              {Subscription.getStatus(s)}
            </Button>
          ))}
        </div>

        {/* 목록 */}
        <Card padding="none">
          {loading ? (
            <div style={{ padding: theme.spacing[8], textAlign: 'center', color: theme.colors.text.tertiary }}>
              불러오는 중...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: theme.spacing[8], textAlign: 'center', color: theme.colors.text.tertiary }}>
              구독이 없습니다. 회원이 앱에서 정기결제를 등록하면 여기에 표시됩니다.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: theme.typography.fontSize.sm }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                    {['ID', '회원', '금액', '상태', '다음 결제일', '실패', '작업'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: theme.spacing[3],
                          textAlign: 'left',
                          color: theme.colors.text.tertiary,
                          fontWeight: theme.typography.fontWeight.medium,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub) => (
                    <tr key={sub.id} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                      <td style={{ padding: theme.spacing[3] }}>#{sub.id}</td>
                      <td style={{ padding: theme.spacing[3] }}>
                        {users.get(sub.user)?.name || `회원 ${sub.user}`}
                      </td>
                      <td style={{ padding: theme.spacing[3] }}>{sub.cost.toLocaleString()}원/월</td>
                      <td style={{ padding: theme.spacing[3] }}>
                        <Badge variant={statusVariant(sub.status)}>
                          {Subscription.getStatus(sub.status)}
                        </Badge>
                      </td>
                      <td style={{ padding: theme.spacing[3] }}>{sub.nextbillingdate}</td>
                      <td style={{ padding: theme.spacing[3] }}>
                        {sub.failcount > 0 ? `${sub.failcount}회` : '-'}
                      </td>
                      <td style={{ padding: theme.spacing[3], display: 'flex', gap: theme.spacing[2] }}>
                        {sub.status === Subscription.status.FAILED && (
                          <Button
                            variant="secondary"
                            size="sm"
                            loading={busy === sub.id}
                            onClick={() => handleRetry(sub)}
                          >
                            재시도
                          </Button>
                        )}
                        {(sub.status === Subscription.status.ACTIVE ||
                          sub.status === Subscription.status.FAILED) && (
                          <Button
                            variant="danger"
                            size="sm"
                            loading={busy === sub.id}
                            onClick={() => handleCancel(sub)}
                          >
                            해지
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
