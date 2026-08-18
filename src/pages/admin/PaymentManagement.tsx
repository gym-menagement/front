import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Card, Badge, Button, Pagination } from '../../components/ui';
import { theme } from '../../theme';
import AdminHeader from '../../components/AdminHeader';
import { selectedGymIdAtom } from '../../store/gym';
import PaymentModel, {
  PaymentMethodLabels,
  PaymentStatus,
  PaymentStatusLabels,
  cancelPayment,
  fetchPaymentStatusMeta,
  refundPayment,
} from '../../models/payment';
import type { PaymentStatusMeta } from '../../models/payment';
import type { Payment } from '../../types/payment';
import PaymentReceiptModal from '../../components/PaymentReceiptModal';
import ManualPaymentModal from '../../components/admin/ManualPaymentModal';

const PaymentManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showManualModal, setShowManualModal] = useState(false);
  const [statusMeta, setStatusMeta] = useState<Map<number, PaymentStatusMeta>>(new Map());

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
        pagesize: pageSize,
        // We can add sorting here if API supports it, usually default is by ID or Date
      });

      if (response && response.content) {
        setPayments(response.content);
        setTotalPages(response.totalPages);
        // 상태·수단은 생성 모델에 없어서 따로 조회 (실패해도 목록은 그대로 둔다)
        try {
          setStatusMeta(
            await fetchPaymentStatusMeta(selectedGymId, response.content.map((p) => p.id))
          );
        } catch {
          setStatusMeta(new Map());
        }
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

  const handleRefund = async (e: React.MouseEvent, payment: Payment) => {
    e.stopPropagation();
    if (!confirm('이 결제를 환불 처리하시겠습니까?\n같은 주문의 회원권도 함께 종료됩니다.')) return;
    try {
      await refundPayment(payment.id);
      await loadPayments();
    } catch (error) {
      console.error('Failed to refund payment:', error);
      alert('환불 처리에 실패했습니다.');
    }
  };

  const handleCancel = async (e: React.MouseEvent, payment: Payment) => {
    e.stopPropagation();
    if (!confirm('오기입 취소 처리하시겠습니까?\n기록은 삭제되지 않고 취소 상태로 남습니다.')) return;
    try {
      await cancelPayment(payment.id);
      await loadPayments();
    } catch (error) {
      console.error('Failed to cancel payment:', error);
      alert('취소 처리에 실패했습니다.');
    }
  };

  const statusBadgeVariant = (status: number) => {
    switch (status) {
      case PaymentStatus.SUCCESS: return 'success' as const;
      case PaymentStatus.PENDING: return 'warning' as const;
      case PaymentStatus.FAIL: return 'error' as const;
      case PaymentStatus.REFUNDED: return 'info' as const;
      default: return 'default' as const; // 취소 등
    }
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
        <Button variant="primary" onClick={() => setShowManualModal(true)}>
          + 결제 등록
        </Button>
        <Button variant="secondary" onClick={loadPayments}>
          새로고침
        </Button>
      </AdminHeader>

      {showManualModal && selectedGymId > 0 && (
        <ManualPaymentModal
          gymId={selectedGymId}
          onClose={() => setShowManualModal(false)}
          onSaved={loadPayments}
        />
      )}

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
                    {(() => {
                      const meta = statusMeta.get(payment.id);
                      const status = meta?.status ?? PaymentStatus.SUCCESS;
                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: theme.spacing[2],
                            marginTop: theme.spacing[1],
                          }}
                        >
                          {meta && PaymentMethodLabels[meta.method] && (
                            <span
                              style={{
                                color: theme.colors.text.tertiary,
                                fontSize: theme.typography.fontSize.sm,
                              }}
                            >
                              {PaymentMethodLabels[meta.method]}
                            </span>
                          )}
                          <Badge variant={statusBadgeVariant(status)}>
                            {PaymentStatusLabels[status] || '성공'}
                          </Badge>
                          {meta && status === PaymentStatus.SUCCESS && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleCancel(e, payment)}
                              >
                                취소
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={(e) => handleRefund(e, payment)}
                              >
                                환불
                              </Button>
                            </>
                          )}
                        </div>
                      );
                    })()}
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
