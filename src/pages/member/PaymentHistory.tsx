import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth';
import PaymentformModel from '../../models/paymentform';
import type { Paymentform } from '../../types/paymentform';
import { Card, Badge, Pagination, Button } from '../../components/ui';
import { theme } from '../../theme';
import PaymentReceiptModal from '../../components/PaymentReceiptModal';

const PaymentHistory = () => {
  const user = useAtomValue(userAtom);
  const [payments, setPayments] = useState<Paymentform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Paymentform | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0); // API는 0-based
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentPage]);

  const fetchPayments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const response = await PaymentformModel.findpage({
        page: currentPage,
        pageSize: pageSize,
      });

      if (response && response.content) {
        setPayments(response.content);
        setTotalPages(response.totalPages);
      } else {
        setPayments([]);
      }
    } catch (err) {
      console.error('Failed to fetch payment history:', err);
      setError('결제 내역을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // UI는 1-based, API는 0-based
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const handlePaymentClick = (payment: Paymentform) => {
    setSelectedPayment(payment);
  };

  const closeDetail = () => {
    setSelectedPayment(null);
  };

  const getPaymentStatusVariant = (): 'success' | 'warning' | 'error' => {
    return 'success'; // 기본값
  };

  if (loading && payments.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: theme.colors.text.secondary,
        }}
      >
        로딩 중...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing[6],
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing[8],
          }}
        >
          <div>
            <h1
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[2],
              }}
            >
              결제 내역
            </h1>
            <p style={{ color: theme.colors.text.secondary }}>
              회원님의 결제 상세 내역을 확인하세요.
            </p>
          </div>
          <Button variant="secondary" onClick={fetchPayments}>
            새로고침
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card
            style={{
              padding: theme.spacing[4],
              marginBottom: theme.spacing[6],
              backgroundColor: theme.colors.semantic.error + '10',
              border: `1px solid ${theme.colors.semantic.error}`,
            }}
          >
            <div style={{ color: theme.colors.semantic.error }}>{error}</div>
          </Card>
        )}

        {/* Payment List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing[4],
          }}
        >
          {payments.length === 0 ? (
            <Card>
              <div
                style={{
                  padding: theme.spacing[8],
                  textAlign: 'center',
                  color: theme.colors.text.secondary,
                }}
              >
                결제 내역이 없습니다.
              </div>
            </Card>
          ) : (
            payments.map((paymentForm) => (
              <Card
                key={paymentForm.id}
                hoverable
                clickable
                onClick={() => handlePaymentClick(paymentForm)}
                style={{
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing[3],
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: theme.spacing[2],
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing[2],
                          marginBottom: theme.spacing[2],
                        }}
                      >
                        <Badge variant={getPaymentStatusVariant()}>
                          {paymentForm.extra?.paymenttype?.name || '결제'}
                        </Badge>
                        <span
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                          }}
                        >
                          {formatDate(paymentForm.date)}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: theme.typography.fontSize.lg,
                          fontWeight: theme.typography.fontWeight.bold,
                          color: theme.colors.text.primary,
                          marginBottom: theme.spacing[1],
                        }}
                      >
                        {paymentForm.extra?.gym?.name || '체육관'}
                      </h3>

                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(paymentForm.extra?.payment as any)?.extra?.order?.extra?.health?.name && (
                        <p
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                          }}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(paymentForm.extra?.payment as any)?.extra?.order?.extra?.health?.name}
                        </p>
                      )}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize['2xl'],
                          fontWeight: theme.typography.fontWeight.bold,
                          color: theme.colors.brand.primary,
                        }}
                      >
                        {formatCurrency(paymentForm.cost)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              marginTop: theme.spacing[8],
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              currentPage={currentPage + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
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

export default PaymentHistory;
