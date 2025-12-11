import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Card, Badge, Button, Pagination } from '../../components/ui';
import { theme } from '../../theme';
import AdminHeader from '../../components/AdminHeader';
import { selectedGymIdAtom } from '../../store/gym';
import PaymentModel from '../../models/payment';
import type { Payment } from '../../types/payment';
import PaymentReceiptModal from '../../components/PaymentReceiptModal';

const PaymentManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (selectedGymId) {
      loadPayments();
    }
  }, [selectedGymId, currentPage]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      if (!selectedGymId) {
        setPayments([]);
        return;
      }

      // We might need to implement server-side search later, 
      // but for now let's use the findpage with gym filter
      const response = await PaymentModel.findpage({
        gym: selectedGymId,
        page: currentPage - 1,
        pageSize: pageSize,
        // We can add sorting here if API supports it, usually default is by ID or Date
      });

      if (response && response.content) {
        setPayments(response.content);
        setTotalPages(response.totalPages);
      } else {
        setPayments([]);
        setTotalPages(0);
      }

    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const closeDetail = () => {
    setSelectedPayment(null);
  };

  // Client-side filtering for currently loaded page (limited utility with server pagination, but helpful for quick check)
  // Better approach: If we want real search, we should pass search params to API.
  // For now, I will trust the user just wants to see the list.
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="결제 관리">
        <Button variant="secondary" onClick={loadPayments}>
          새로고침
        </Button>
      </AdminHeader>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Search Bar - Visual only for now if API doesn't support complex search easily without more work */}
        {/* 
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder="회원명, 주문번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Card>
        */}

        {/* Payments List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              결제 내역을 불러오는 중...
            </div>
          </Card>
        ) : payments.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              결제 내역이 없습니다.
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {payments.map((payment) => (
              <Card
                key={payment.id}
                hoverable
                clickable
                onClick={() => handlePaymentClick(payment)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: theme.spacing[4],
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.lg,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                       {payment.extra?.user?.name || `User #${payment.user}`}
                    </div>
                    <div style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
                      {formatDate(payment.date)}
                    </div>
                    <div style={{ color: theme.colors.text.tertiary, fontSize: theme.typography.fontSize.sm }}>
                      주문번호: {payment.order || 'N/A'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.xl,
                        color: theme.colors.brand.primary,
                      }}
                    >
                      {formatCurrency(payment.cost)}
                    </div>
                    <Badge variant="success" style={{ marginTop: theme.spacing[1] }}>
                      결제완료
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing[8] }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Receipt Modal */}
        {selectedPayment && (
          <PaymentReceiptModal
            payment={selectedPayment}
            onClose={closeDetail}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
