import { useEffect, useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import { Stop } from '../../models';
import type { Stop as StopType } from '../../types/stop';
import type { User as UserType } from '../../types/user';
import type { Health as HealthType } from '../../types/health';

interface MemberDetailModalProps {
  show: boolean;
  usehealth: {
    id: number;
    startday: string;
    endday: string;
    totalcount: number;
    usedcount: number;
    remainingcount: number;
    status: number;
    extra?: {
      user?: UserType;
      health?: HealthType;
    };
  } | null;
  onClose: () => void;
}

const MemberDetailModal = ({ show, usehealth, onClose }: MemberDetailModalProps) => {
  const [stopHistory, setStopHistory] = useState<StopType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStopHistory = async () => {
      if (!usehealth) return;

      try {
        setLoading(true);
        const stops = await Stop.find({ usehealth: usehealth.id });
        // 최신 순으로 정렬
        stops.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setStopHistory(stops);
      } catch (error) {
        console.error('Failed to load stop history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (show && usehealth) {
      loadStopHistory();
    }
  }, [show, usehealth]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  if (!show || !usehealth) return null;

  const user = usehealth.extra?.user;
  const health = usehealth.extra?.health;

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
          maxWidth: '800px',
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

        {/* 회원 정보 */}
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
          </div>
        </Card>

        {/* 회원권 정보 */}
        <Card>
          <h3
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              marginBottom: theme.spacing[4],
            }}
          >
            회원권 정보
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing[4],
              marginBottom: theme.spacing[6],
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
                상품명
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {health?.name || '-'}
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
                이용 기간
              </div>
              <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                {formatDate(usehealth.startday)} ~ {formatDate(usehealth.endday)}
              </div>
            </div>
            {usehealth.totalcount > 0 && (
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
                    {usehealth.totalcount}회
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
                    {usehealth.usedcount}회
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
                    {usehealth.remainingcount}회
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 일시정지 이력 */}
          <div
            style={{
              marginTop: theme.spacing[6],
              paddingTop: theme.spacing[6],
              borderTop: `1px solid ${theme.colors.border.light}`,
            }}
          >
            <h4
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing[3],
                color: theme.colors.text.primary,
              }}
            >
              일시정지 이력
            </h4>

            {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing[4],
                color: theme.colors.text.secondary,
              }}
            >
              불러오는 중...
            </div>
          ) : stopHistory.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing[4],
                color: theme.colors.text.secondary,
              }}
            >
              일시정지 이력이 없습니다.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
              {stopHistory.map((stop) => (
                <div
                  key={stop.id}
                  style={{
                    padding: theme.spacing[4],
                    backgroundColor: theme.colors.background.secondary,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: theme.spacing[2],
                    }}
                  >
                    <Badge variant="warning">⏸️ 일시정지</Badge>
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      등록일: {formatDateTime(stop.date)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
                        {formatDate(stop.startday)}
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
                        {formatDate(stop.endday)}
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
                        일시정지 일수
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.semantic.warning,
                        }}
                      >
                        {stop.count}일
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </Card>

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
