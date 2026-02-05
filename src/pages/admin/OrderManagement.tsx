import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Order } from '../../models';
import type { Order as OrderType } from '../../types/order';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const OrderManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadOrders();
    }
  }, [selectedGymId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params: Record<string, unknown> = { gym: selectedGymId! };
      if (startDate) params.startdate = `${startDate}T00:00:00`;
      if (endDate) params.enddate = `${endDate}T23:59:59`;
      const data = await Order.findall(params);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadOrders();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="주문 관리" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Search Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4], alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <Input label="시작일" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '180px' }} />
            <Input label="종료일" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '180px' }} />
            <Button variant="primary" onClick={handleSearch}>조회</Button>
            <Button variant="ghost" onClick={() => { setStartDate(''); setEndDate(''); }}>초기화</Button>
          </div>
        </Card>

        {/* Stats */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[8], alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>전체 주문</div>
              <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{orders.length}</div>
            </div>
          </div>
        </Card>

        {/* Order List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : orders.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>주문 내역이 없습니다.</div></Card>
        ) : (
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.colors.border.light}` }}>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>ID</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>회원</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>상품</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>주문일</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{order.id}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{order.extra?.user?.name || `#${order.user}`}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{order.extra?.health?.name || `#${order.health}`}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>{order.date ? order.date.split('T')[0] : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
