import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import type { Membership as MembershipType } from '../../types/membership';
import type { Usehealth as UsehealthType } from '../../types/usehealth';

interface MemberDetailModalProps {
  show: boolean;
  membership: MembershipType;
  usehealths: UsehealthType[];
  onClose: () => void;
  onRefresh: () => void;
}

const MemberDetailModal = ({
  show,
  membership,
  usehealths,
  onClose,
}: MemberDetailModalProps) => {
  if (!show) return null;

  const user = membership.extra?.user;
  const today = new Date();

  // Debug: Log usehealth data
  console.log('=== MemberDetailModal Debug ===');
  console.log('Membership ID:', membership.id);
  console.log('User ID:', membership.user);
  console.log('User Name:', user?.name);
  console.log('Total usehealths:', usehealths.length);
  console.log('Usehealths data:', usehealths);

  // Separate active and expired usehealths
  const activeUsehealths = usehealths.filter((uh) => {
    const startDate = new Date(uh.startday);
    const endDate = new Date(uh.endday);
    return startDate <= today && today <= endDate;
  });

  const expiredUsehealths = usehealths.filter((uh) => {
    const endDate = new Date(uh.endday);
    return endDate < today;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getDaysRemaining = (endday: string) => {
    const end = new Date(endday);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderUsehealthCard = (uh: UsehealthType, isActive: boolean) => {
    const daysRemaining = getDaysRemaining(uh.endday);
    const healthName = uh.extra?.health?.name || '알 수 없음';

    return (
      <div
        key={uh.id}
        style={{
          padding: theme.spacing[4],
          backgroundColor: isActive
            ? theme.colors.semantic.successSubtle
            : theme.colors.background.secondary,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${
            isActive ? theme.colors.semantic.success : theme.colors.border.light
          }`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing[3],
          }}
        >
          <div
            style={{
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize.base,
            }}
          >
            {healthName}
          </div>
          <Badge variant={isActive ? 'success' : 'info'}>
            {isActive ? '사용중' : '만료'}
          </Badge>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: theme.spacing[3],
          }}
        >
          <div>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              시작일
            </div>
            <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
              {formatDate(uh.startday)}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              종료일
            </div>
            <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
              {formatDate(uh.endday)}
            </div>
          </div>
          {isActive && (
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                남은 일수
              </div>
              <div
                style={{
                  fontWeight: theme.typography.fontWeight.semibold,
                  color:
                    daysRemaining <= 7
                      ? theme.colors.semantic.error
                      : daysRemaining <= 30
                      ? theme.colors.semantic.warning
                      : theme.colors.semantic.success,
                }}
              >
                {daysRemaining}일
              </div>
            </div>
          )}
          {uh.totalcount > 0 && (
            <>
              <div>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing[1],
                  }}
                >
                  총 횟수
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {uh.totalcount}회
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing[1],
                  }}
                >
                  사용 횟수
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {uh.usedcount}회
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing[1],
                  }}
                >
                  잔여 횟수
                </div>
                <div
                  style={{
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.brand.primary,
                  }}
                >
                  {uh.remainingcount}회
                </div>
              </div>
            </>
          )}
        </div>

        <div
          style={{
            marginTop: theme.spacing[3],
            paddingTop: theme.spacing[3],
            borderTop: `1px solid ${theme.colors.border.light}`,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.tertiary,
          }}
        >
          등록일: {formatDateTime(uh.date)}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: theme.spacing[4],
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderRadius: theme.borderRadius.lg,
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: theme.spacing[6],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing[6],
            paddingBottom: theme.spacing[4],
            borderBottom: `2px solid ${theme.colors.border.light}`,
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              margin: 0,
            }}
          >
            회원 상세 정보
          </h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* 회원 기본 정보 */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <h3
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              marginBottom: theme.spacing[4],
            }}
          >
            기본 정보
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing[4],
            }}
          >
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                이름
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {user?.name || '-'}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                아이디
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {user?.loginid || '-'}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                전화번호
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {user?.tel || '-'}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                이메일
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {user?.email || '-'}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                가입일
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {formatDate(membership.date)}
              </div>
            </div>
          </div>
        </Card>

        {/* 활성 이용권 */}
        {activeUsehealths.length > 0 && (
          <Card style={{ marginBottom: theme.spacing[6] }}>
            <h3
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing[4],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2],
              }}
            >
              사용중인 이용권
              <Badge variant="success">{activeUsehealths.length}개</Badge>
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
              }}
            >
              {activeUsehealths.map((uh) => renderUsehealthCard(uh, true))}
            </div>
          </Card>
        )}

        {/* 만료된 이용권 */}
        {expiredUsehealths.length > 0 && (
          <Card style={{ marginBottom: theme.spacing[6] }}>
            <h3
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing[4],
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[2],
              }}
            >
              만료된 이용권
              <Badge variant="info">{expiredUsehealths.length}개</Badge>
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
              }}
            >
              {expiredUsehealths.map((uh) => renderUsehealthCard(uh, false))}
            </div>
          </Card>
        )}

        {/* No usehealths */}
        {usehealths.length === 0 && (
          <Card>
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing[8],
                color: theme.colors.text.secondary,
              }}
            >
              등록된 이용권이 없습니다.
            </div>
          </Card>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: theme.spacing[6],
            paddingTop: theme.spacing[4],
            borderTop: `1px solid ${theme.colors.border.light}`,
          }}
        >
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;
