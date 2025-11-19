import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth';
import { Card, Button, Badge } from '../../components/ui';
import { get } from '../../services/api';
import type {
  Membership,
  Attendance,
  MemberQR,
  PTReservation,
  ApiResponse,
} from '../../types';
import { QRCodeSVG } from 'qrcode.react';

const MemberDashboard = () => {
  const user = useAtomValue(userAtom);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [recentAttendance, setRecentAttendance] = useState<Attendance[]>([]);
  const [qrCode, setQrCode] = useState<MemberQR | null>(null);
  const [upcomingPT, setUpcomingPT] = useState<PTReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load active memberships
      const membershipRes = await get<ApiResponse<Membership>>(
        `/membership/search/userId?userId=${user.u_id}&page=0&pageSize=10`
      );
      setMemberships(membershipRes.data.items || []);

      // Load recent attendance (last 7 days)
      const attendanceRes = await get<ApiResponse<Attendance>>(
        `/attendance/search/userId?userId=${user.u_id}&page=0&pageSize=7`
      );
      setRecentAttendance(attendanceRes.data.items || []);

      // Load QR code
      const qrRes = await get<ApiResponse<MemberQR>>(
        `/memberqr/search/userId?userId=${user.u_id}&page=0&pageSize=1`
      );
      if (qrRes.data.items && qrRes.data.items.length > 0) {
        setQrCode(qrRes.data.items[0]);
      }

      // Load upcoming PT reservations
      const ptRes = await get<ApiResponse<PTReservation>>(
        `/ptreservation/search/userId?userId=${user.u_id}&page=0&pageSize=5`
      );
      setUpcomingPT(ptRes.data.items || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'EXPIRED':
        return 'danger';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            안녕하세요, {user?.u_name}님
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            오늘도 건강한 하루 되세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Memberships */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  내 회원권
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = '/member/memberships')}
                >
                  전체 보기
                </Button>
              </div>

              {memberships.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    현재 이용 중인 회원권이 없습니다
                  </p>
                  <Button
                    onClick={() => (window.location.href = '/member/gyms')}
                  >
                    회원권 구매하기
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {memberships.slice(0, 3).map((membership) => (
                    <div
                      key={membership.m_id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {membership.gym?.g_name || '체육관'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {membership.health?.h_name || '회원권'}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(membership.m_status)}>
                          {membership.m_status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          {formatDate(membership.m_start_date)} ~{' '}
                          {formatDate(membership.m_end_date)}
                        </div>
                        {membership.m_remaining_count !== undefined && (
                          <div className="font-medium">
                            잔여 {membership.m_remaining_count}회
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Attendance */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  최근 출석 기록
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = '/member/attendance')}
                >
                  전체 보기
                </Button>
              </div>

              {recentAttendance.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    아직 출석 기록이 없습니다
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAttendance.map((attendance) => (
                    <div
                      key={attendance.a_id}
                      className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formatDate(attendance.a_check_in_time)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          입실: {formatTime(attendance.a_check_in_time)}
                          {attendance.a_check_out_time && (
                            <>
                              {' '}
                              · 퇴실: {formatTime(attendance.a_check_out_time)}
                            </>
                          )}
                        </div>
                      </div>
                      <Badge variant="success">출석</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Upcoming PT Sessions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  예정된 PT 세션
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = '/member/pt')}
                >
                  전체 보기
                </Button>
              </div>

              {upcomingPT.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    예정된 PT 세션이 없습니다
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingPT.map((pt) => (
                    <div
                      key={pt.pr_id}
                      className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formatDate(pt.pr_date)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {pt.pr_start_time} - {pt.pr_end_time}
                          {pt.trainer && <> · {pt.trainer.u_name} 트레이너</>}
                        </div>
                      </div>
                      <Badge
                        variant={pt.pr_status === 1 ? 'success' : 'warning'}
                      >
                        {pt.pr_status === 0 && '대기중'}
                        {pt.pr_status === 1 && '확정'}
                        {pt.pr_status === 2 && '취소'}
                        {pt.pr_status === 3 && '노쇼'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* QR Code Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                입장 QR 코드
              </h2>

              {qrCode ? (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <QRCodeSVG value={qrCode.mq_qr_code} size={200} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    입장 시 이 QR 코드를 스캔해주세요
                  </p>
                  {qrCode.mq_expires_at && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      만료: {formatDate(qrCode.mq_expires_at)}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    QR 코드가 생성되지 않았습니다
                  </p>
                  <Button onClick={loadDashboardData}>QR 코드 생성</Button>
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                빠른 메뉴
              </h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/member/gyms')}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/member/purchase')}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/member/lockers')}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    (window.location.href = '/member/body-metrics')
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/member/notices')}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            </Card>

            {/* User Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                내 정보
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    이름
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {user?.u_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    아이디
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {user?.u_loginid}
                  </div>
                </div>
                {user?.u_phone && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      전화번호
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.u_phone}
                    </div>
                  </div>
                )}
                {user?.u_email && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      이메일
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.u_email}
                    </div>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => (window.location.href = '/member/profile')}
                  >
                    프로필 수정
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
