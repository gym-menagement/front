import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth';
import { Card, Button, Badge } from '../../components/ui';
import { theme } from '../../theme';
import {
  Attendance as AttendanceModel,
  MemberQR as MemberQRModel,
  PTReservation as PTReservationModel,
} from '../../models';
import MembershipModel from '../../models/membership';
import type { Attendance, MemberQR, PTReservation } from '../../types';
import { QRCodeSVG } from 'qrcode.react';

const MemberDashboard = () => {
  const user = useAtomValue(userAtom);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [recentAttendance, setRecentAttendance] = useState<Attendance[]>([]);
  const [qrCode, setQrCode] = useState<MemberQR | null>(null);
  const [upcomingPT, setUpcomingPT] = useState<PTReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load active memberships
      const memberships = await MembershipModel.searchByUserId(user.id, {
        page: 0,
        pageSize: 10,
      });
      setMemberships(memberships);

      // Load recent attendance (last 7 days)
      const attendance = await AttendanceModel.searchByUserId(user.id, {
        page: 0,
        pageSize: 7,
      });
      setRecentAttendance(attendance);

      // Load QR code
      const qrCodes = await MemberQRModel.searchByUserId(user.id, {
        page: 0,
        pageSize: 1,
      });
      if (qrCodes && qrCodes.length > 0) {
        setQrCode(qrCodes[0]);
      }

      // Load upcoming PT reservations
      const ptReservations = await PTReservationModel.searchByUserId(user.id, {
        page: 0,
        pageSize: 5,
      });
      setUpcomingPT(ptReservations);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'default' => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'EXPIRED':
        return 'error';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 통계 계산
  const stats = {
    totalMemberships: memberships.length,
    activeMemberships: memberships.filter((m) => m.m_status === 'ACTIVE').length,
    attendanceThisWeek: recentAttendance.length,
    upcomingPTCount: upcomingPT.filter((pt) => pt.pr_status === 1).length,
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme.colors.background.secondary,
        }}
      >
        <div style={{ fontSize: theme.typography.fontSize.lg }}>로딩 중...</div>
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
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header with Welcome */}
        <div style={{ marginBottom: theme.spacing[8] }}>
          <h1
            style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[2],
            }}
          >
            안녕하세요, {user?.name}님 👋
          </h1>
          <p style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.secondary }}>
            오늘도 건강한 하루 되세요!
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[6],
          }}
        >
          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[2],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  이용중인 회원권
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.brand.primary}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={theme.colors.brand.primary}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                }}
              >
                {stats.activeMemberships}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}
              >
                전체 {stats.totalMemberships}개
              </div>
            </div>
          </Card>

          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[2],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  이번 주 출석
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.success}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={theme.colors.semantic.success}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.semantic.success,
                }}
              >
                {stats.attendanceThisWeek}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}
              >
                최근 7일
              </div>
            </div>
          </Card>

          <Card hoverable>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[2],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  예정된 PT
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.info}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={theme.colors.semantic.info}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.semantic.info,
                }}
              >
                {stats.upcomingPTCount}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}
              >
                확정된 세션
              </div>
            </div>
          </Card>

          {/* QR Code Quick Access */}
          <Card hoverable clickable onClick={() => document.getElementById('qr-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <div style={{ padding: theme.spacing[6] }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing[2],
                }}
              >
                <div
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  입장 QR 코드
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.warning}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={theme.colors.semantic.warning}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                {qrCode ? '보기' : '생성필요'}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.tertiary,
                  marginTop: theme.spacing[1],
                }}
              >
                클릭하여 확인
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: theme.spacing[6],
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
            {/* Active Memberships */}
            <Card>
              <div style={{ padding: theme.spacing[6] }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: theme.spacing[4],
                  }}
                >
                  <h2
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    내 회원권
                  </h2>
                  <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/member/memberships')}>
                    전체 보기
                  </Button>
                </div>

                {memberships.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                    <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing[4] }}>
                      현재 이용 중인 회원권이 없습니다
                    </p>
                    <Button onClick={() => (window.location.href = '/member/gyms')}>회원권 구매하기</Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                    {memberships.slice(0, 3).map((membership) => (
                      <div
                        key={membership.m_id}
                        style={{
                          border: `1px solid ${theme.colors.border.light}`,
                          borderRadius: theme.borderRadius.lg,
                          padding: theme.spacing[4],
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'space-between',
                            marginBottom: theme.spacing[2],
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                fontWeight: theme.typography.fontWeight.semibold,
                                color: theme.colors.text.primary,
                              }}
                            >
                              {membership.gym?.g_name || '체육관'}
                            </h3>
                            <p
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.text.secondary,
                              }}
                            >
                              {membership.health?.h_name || '회원권'}
                            </p>
                          </div>
                          <Badge variant={getStatusColor(membership.m_status)}>{membership.m_status}</Badge>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                          }}
                        >
                          <div>
                            {formatDate(membership.m_start_date)} ~ {formatDate(membership.m_end_date)}
                          </div>
                          {membership.m_remaining_count !== undefined && (
                            <div
                              style={{
                                fontWeight: theme.typography.fontWeight.medium,
                                color: theme.colors.brand.primary,
                              }}
                            >
                              잔여 {membership.m_remaining_count}회
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Upcoming PT Sessions */}
            <Card>
              <div style={{ padding: theme.spacing[6] }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: theme.spacing[4],
                  }}
                >
                  <h2
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    예정된 PT 세션
                  </h2>
                  <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/member/pt')}>
                    전체 보기
                  </Button>
                </div>

                {upcomingPT.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                    <p style={{ color: theme.colors.text.secondary }}>예정된 PT 세션이 없습니다</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                    {upcomingPT.map((pt) => (
                      <div
                        key={pt.pr_id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: theme.spacing[3],
                          borderBottom: `1px solid ${theme.colors.border.light}`,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.medium,
                              color: theme.colors.text.primary,
                            }}
                          >
                            {formatDate(pt.pr_date)}
                          </div>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                            }}
                          >
                            {pt.pr_start_time} - {pt.pr_end_time}
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(pt as any).trainer && <> · {(pt as any).trainer.name} 트레이너</>}
                          </div>
                        </div>
                        <Badge variant={pt.pr_status === 1 ? 'success' : 'warning'}>
                          {pt.pr_status === 0 && '대기중'}
                          {pt.pr_status === 1 && '확정'}
                          {pt.pr_status === 2 && '취소'}
                          {pt.pr_status === 3 && '노쇼'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
            {/* QR Code Card */}
            <Card id="qr-section">
              <div style={{ padding: theme.spacing[6] }}>
                <h2
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing[4],
                    textAlign: 'center',
                  }}
                >
                  입장 QR 코드
                </h2>

                {qrCode ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        backgroundColor: 'white',
                        padding: theme.spacing[4],
                        borderRadius: theme.borderRadius.lg,
                        marginBottom: theme.spacing[4],
                        boxShadow: theme.boxShadow.md,
                      }}
                    >
                      <QRCodeSVG value={qrCode.mq_qr_code} size={200} />
                    </div>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        textAlign: 'center',
                      }}
                    >
                      입장 시 이 QR 코드를 스캔해주세요
                    </p>
                    {qrCode.mq_expires_at && (
                      <p
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.text.tertiary,
                          marginTop: theme.spacing[2],
                        }}
                      >
                        만료: {formatDate(qrCode.mq_expires_at)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                    <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing[4] }}>
                      QR 코드가 생성되지 않았습니다
                    </p>
                    <Button onClick={loadDashboardData}>QR 코드 생성</Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Recent Attendance */}
            <Card>
              <div style={{ padding: theme.spacing[6] }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: theme.spacing[4],
                  }}
                >
                  <h2
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    최근 출석 기록
                  </h2>
                  <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/member/attendance')}>
                    전체 보기
                  </Button>
                </div>

                {recentAttendance.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                    <p style={{ color: theme.colors.text.secondary }}>아직 출석 기록이 없습니다</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
                    {recentAttendance.map((attendance) => (
                      <div
                        key={attendance.a_id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: theme.spacing[3],
                          borderBottom: `1px solid ${theme.colors.border.light}`,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: theme.typography.fontWeight.medium,
                              color: theme.colors.text.primary,
                            }}
                          >
                            {formatDate(attendance.a_check_in_time)}
                          </div>
                          <div
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                            }}
                          >
                            입실: {formatTime(attendance.a_check_in_time)}
                            {attendance.a_check_out_time && (
                              <> · 퇴실: {formatTime(attendance.a_check_out_time)}</>
                            )}
                          </div>
                        </div>
                        <Badge variant="success">출석</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions - Full Width at Bottom */}
        <div style={{ marginTop: theme.spacing[6] }}>
          <Card>
            <div style={{ padding: theme.spacing[6] }}>
              <h2
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing[4],
                }}
              >
                빠른 메뉴
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: theme.spacing[3],
                }}
              >
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/gyms')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  체육관 찾기
                </Button>
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/purchase')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  회원권 구매
                </Button>
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/payments')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  결제 내역
                </Button>
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/lockers')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  라커 신청
                </Button>
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/body-metrics')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  체성분 기록
                </Button>
                <Button
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => (window.location.href = '/member/notices')}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ marginRight: theme.spacing[2] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  공지사항
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
