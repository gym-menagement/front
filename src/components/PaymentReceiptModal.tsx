import { theme } from '../theme';

interface PaymentReceiptModalProps {
  payment: any; // Payment or Paymentform type
  onClose: () => void;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

const PaymentReceiptModal = ({
  payment,
  onClose,
  formatDate,
  formatCurrency,
}: PaymentReceiptModalProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing[4],
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.colors.background.primary,
          borderRadius: theme.borderRadius.lg,
          maxWidth: '500px',
          width: '100%',
          boxShadow: theme.boxShadow.xl,
          overflow: 'hidden',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Receipt Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.colors.brand.primary} 0%, ${theme.colors.brand.secondary} 100%)`,
            padding: theme.spacing[6],
            color: 'white',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: theme.spacing[4],
              right: theme.spacing[4],
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: theme.borderRadius.full,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[2],
            }}
          >
            {payment.extra?.gym?.name || '체육관'}
          </h2>
          <p style={{ opacity: 0.9 }}>결제 영수증</p>
        </div>

        {/* Receipt Body */}
        <div style={{ padding: theme.spacing[6] }}>
          {/* 결제 정보 */}
          <div
            style={{
              borderBottom: `2px dashed ${theme.colors.border.light}`,
              paddingBottom: theme.spacing[4],
              marginBottom: theme.spacing[4],
            }}
          >
            <div
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.tertiary,
                marginBottom: theme.spacing[2],
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              결제 정보
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.colors.text.secondary }}>결제 번호</span>
                <span
                  style={{
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                    fontFamily: 'monospace',
                  }}
                >
                  #{payment.id}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.colors.text.secondary }}>결제 일시</span>
                <span
                  style={{
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  {formatDate(payment.date)}
                </span>
              </div>

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {((payment.extra as any)?.paymenttype?.name || (payment.extra as any)?.payment?.extra?.paymenttype?.name) && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.colors.text.secondary }}>결제 방법</span>
                  <span
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(payment.extra as any)?.paymenttype?.name || (payment.extra as any)?.payment?.extra?.paymenttype?.name}
                  </span>
                </div>
              )}

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(payment.order || (payment.extra as any)?.payment?.extra?.order?.id) && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.colors.text.secondary }}>주문 번호</span>
                  <span
                    style={{
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.primary,
                      fontFamily: 'monospace',
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    #{payment.order || (payment.extra as any)?.payment?.extra?.order?.id}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {((payment.extra as any)?.order?.extra?.health || (payment.extra as any)?.payment?.extra?.order?.extra?.health) && (
            <div
              style={{
                borderBottom: `2px dashed ${theme.colors.border.light}`,
                paddingBottom: theme.spacing[4],
                marginBottom: theme.spacing[4],
              }}
            >
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginBottom: theme.spacing[3],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                상품 정보
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                <div>
                  <div
                    style={{
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[1],
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(payment.extra as any)?.order?.extra?.health?.name || (payment.extra as any)?.payment?.extra?.order?.extra?.health?.name || '상품'}
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(payment.extra as any)?.order?.extra?.health?.content || (payment.extra as any)?.payment?.extra?.order?.extra?.health?.content}
                  </div>
                </div>

                {/* 카테고리 및 기간 */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {((payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.healthcategory ||
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  (payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.term) && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: theme.spacing[2],
                    }}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.healthcategory && (
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.tertiary,
                          }}
                        >
                          카테고리
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.primary,
                          }}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.healthcategory?.name}
                        </div>
                      </div>
                    )}

                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.term && (
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.tertiary,
                          }}
                        >
                          기간
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.primary,
                          }}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.term?.name}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 금액 상세 (Paymentform 타입인 경우) */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {((payment.extra as any)?.payment?.extra?.order?.extra?.health?.cost ||
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            (payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.discount) && (
            <div
              style={{
                borderBottom: `2px dashed ${theme.colors.border.light}`,
                paddingBottom: theme.spacing[4],
                marginBottom: theme.spacing[4],
              }}
            >
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginBottom: theme.spacing[2],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                금액 상세
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.cost && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: theme.colors.text.secondary }}>상품 금액</span>
                    <span style={{ color: theme.colors.text.primary }}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {formatCurrency((payment.extra as any)?.payment?.extra?.order?.extra?.health?.cost)}
                    </span>
                  </div>
                )}

                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.discount && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: theme.colors.semantic.success }}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      할인 ({(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.discount?.name})
                    </span>
                    <span style={{ color: theme.colors.semantic.success }}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      -{(payment.extra as any)?.payment?.extra?.order?.extra?.health?.extra?.discount?.discount}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 총 결제 금액 */}
          <div
            style={{
              backgroundColor: theme.colors.background.secondary,
              padding: theme.spacing[4],
              borderRadius: theme.borderRadius.md,
              marginBottom: theme.spacing[4],
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                총 결제 금액
              </span>
              <span
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                }}
              >
                {formatCurrency(payment.cost)}
              </span>
            </div>
          </div>

          {/* 사용자 정보 */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(payment.extra?.user || (payment.extra as any)?.payment?.extra?.user) && (
            <div style={{ marginBottom: theme.spacing[4] }}>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginBottom: theme.spacing[2],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                결제자 정보
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[1] }}>
                <div style={{ color: theme.colors.text.primary }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {payment.extra?.user?.name || (payment.extra as any)?.payment?.extra?.user?.name}
                </div>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {payment.extra?.user?.tel || (payment.extra as any)?.payment?.extra?.user?.tel}
                </div>
              </div>
            </div>
          )}

          {/* 하단 안내 */}
          <div
            style={{
              textAlign: 'center',
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.tertiary,
              paddingTop: theme.spacing[4],
              borderTop: `1px solid ${theme.colors.border.light}`,
            }}
          >
            <p>이용해 주셔서 감사합니다</p>
            <p style={{ marginTop: theme.spacing[1] }}>문의사항이 있으시면 고객센터로 연락주세요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptModal;
