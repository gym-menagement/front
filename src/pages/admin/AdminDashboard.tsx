import { useEffect, useState } from 'react';
import { Card } from '../../components/ui';
import { theme } from '../../theme';
import { Attendance, UseHealth, Payment } from '../../models';
import type { Attendance as AttendanceType } from '../../types/attendance';
import type { Usehealth as UsehealthType } from '../../types/usehealth';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { formatLocalDateTime, getDayRange } from '../../global/util';

interface DashboardStats {
  activeMembers: number;
  newMembers: number;
  todayAttendance: number;
  monthlyRevenue: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);

  const [stats, setStats] = useState<DashboardStats>({
    activeMembers: 0,
    newMembers: 0,
    todayAttendance: 0,
    monthlyRevenue: 0,
  });

  const [recentAtts, setRecentAtts] = useState<AttendanceType[]>([]);
  const [expiringMembers, setExpiringMembers] = useState<UsehealthType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = authService.getCurrentUser();

  const today = new Date();
  const { startDate: todayStart, endDate: todayEnd } = getDayRange(
    today.toISOString().split('T')[0]
  );

  // First day of current month for Monthly Revenue & New Members
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  useEffect(() => {
    if (selectedGymId) {
      loadDashboardStats();
    } else {
      setLoading(false);
    }
  }, [selectedGymId]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);

      // Parallel Data Fetching
      const [allUseHealths, todayAttendances, monthPayments] = await Promise.all([
        UseHealth.findall({ gym: selectedGymId }),
        Attendance.findall({
            gym: selectedGymId,
            startcheckintime: formatLocalDateTime(todayStart),
            endcheckintime: formatLocalDateTime(todayEnd)
        }),
        Payment.findall({
            gym: selectedGymId,
            startdate: formatLocalDateTime(firstDayOfMonth),
            enddate: formatLocalDateTime(lastDayOfMonth)
        })
      ]);

      // 1. Active Members
      const activeMembers = allUseHealths.filter((uh) => {
        const start = new Date(uh.startday);
        const end = new Date(uh.endday);
        return start <= today && today <= end;
      }).length;

      // 2. New Members (Started this month)
      const newMembers = allUseHealths.filter((uh) => {
        const start = new Date(uh.startday);
        return start >= firstDayOfMonth && start <= lastDayOfMonth;
      }).length;


      // 3. Today Attendance Count
      const todayAttendanceCount = todayAttendances.length;

      // 4. Monthly Revenue
      const monthlyRevenue = monthPayments.reduce((sum, p) => sum + p.cost, 0);

      // 5. Recent Check-ins (Top 5 from today's attendance, sorted desc)
      // Assuming todayAttendances might not be sorted by time
      const sortedAtts = [...todayAttendances].sort((a, b) => 
        new Date(b.checkintime).getTime() - new Date(a.checkintime).getTime()
      ).slice(0, 5);
      
      setRecentAtts(sortedAtts);

      // 6. Expiring Soon (Top 5, expiring within 30 days)
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(today.getDate() + 30);

      const expiringList = allUseHealths
        .filter((uh) => {
          const end = new Date(uh.endday);
          return end >= today && end <= thirtyDaysLater;
        })
        .sort((a, b) => new Date(a.endday).getTime() - new Date(b.endday).getTime())
        .slice(0, 5);

      setExpiringMembers(expiringList);

      setStats({
        activeMembers,
        newMembers,
        todayAttendance: todayAttendanceCount,
        monthlyRevenue,
      });

    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: theme.spacing[8], textAlign: 'center', marginTop: theme.spacing[16] }}>
        데이터를 불러오는 중...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing[8],
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: theme.spacing[8] }}>
          <h1
            style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[2],
            }}
          >
            대시보드
          </h1>
          <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary }}>
            {currentUser?.name}님, 오늘도 좋은 하루 되세요!
          </p>
        </div>

        {/* Stats Overview Grid (4 Columns) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[8],
          }}
        >
          {/* Active Members */}
          <StatCard 
            title="활성 회원" 
            value={stats.activeMembers} 
            subtitle="이용 가능한 회원권" 
            iconColor={theme.colors.brand.primary}
            iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />

          {/* New Members */}
          <StatCard 
            title="신규 회원 (이번 달)" 
            value={stats.newMembers} 
            subtitle="이번 달 새로 등록한 회원" 
            iconColor={theme.colors.brand.secondary}
            iconPath="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />

          {/* Today Attendance */}
          <StatCard 
            title="오늘 출석" 
            value={stats.todayAttendance} 
            subtitle={today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
            iconColor={theme.colors.semantic.success}
            iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />

           {/* Monthly Revenue */}
           <StatCard 
            title="이번 달 매출" 
            value={stats.monthlyRevenue.toLocaleString() + '원'} 
            subtitle="이번 달 결제 합계" 
            iconColor="#8da399" // Custom color for money
            iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </div>

        {/* Detailed Lists Grid (2 Columns) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: theme.spacing[6],
          }}
        >
          {/* Recent Check-ins */}
          <div style={{ backgroundColor: '#fff', borderRadius: theme.borderRadius.lg, padding: theme.spacing[6], border: `1px solid ${theme.colors.border.light}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[4] }}>
               <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold, margin: 0 }}>
                최근 출석 현황
               </h3>
               <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary, cursor: 'pointer' }} onClick={() => navigate('/admin/attendance')}>
                 전체보기 &rarr;
               </span>
            </div>
            
            {recentAtts.length === 0 ? (
                <div style={{ color: theme.colors.text.tertiary, textAlign: 'center', padding: theme.spacing[4] }}>
                    오늘 출석 내역이 없습니다.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                    {recentAtts.map(att => (
                        <div key={att.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
                                <div style={{ 
                                    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.colors.background.secondary,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: theme.typography.fontSize.xs, fontWeight: 'bold'
                                }}>
                                    {att.extra?.user?.name ? att.extra.user.name.substring(0, 1) : '?'}
                                </div>
                                <div>
                                    <div style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                                        {att.extra?.user?.name || '알 수 없음'}
                                    </div>
                                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                                        {Attendance.getType(att.type)} | {Attendance.getMethod(att.method)}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                                {new Date(att.checkintime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* Expiring Soon */}
          <div style={{ backgroundColor: '#fff', borderRadius: theme.borderRadius.lg, padding: theme.spacing[6], border: `1px solid ${theme.colors.border.light}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[4] }}>
               <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold, margin: 0 }}>
                만료 임박 회원
               </h3>
               <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary, cursor: 'pointer' }} onClick={() => navigate('/admin/usehealth')}>
                 전체보기 &rarr;
               </span>
            </div>

            {expiringMembers.length === 0 ? (
                <div style={{ color: theme.colors.text.tertiary, textAlign: 'center', padding: theme.spacing[4] }}>
                    만료 예정 회원이 없습니다.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                    {expiringMembers.map(uh => {
                        const daysLeft = Math.ceil((new Date(uh.endday).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        return (
                            <div key={uh.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                                            {uh.extra?.user?.name || '알 수 없음'}
                                        </div>
                                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                                            {uh.extra?.health?.name || '회원권'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ 
                                        fontSize: theme.typography.fontSize.xs, 
                                        fontWeight: theme.typography.fontWeight.bold, 
                                        color: daysLeft <= 7 ? theme.colors.semantic.error : theme.colors.semantic.warning 
                                    }}>
                                        D-{daysLeft}
                                    </div>
                                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                                        {new Date(uh.endday).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card Component within the file for cleaner code
const StatCard = ({ title, value, subtitle, iconColor, iconPath }: { title: string, value: string | number, subtitle: string, iconColor: string, iconPath: string }) => (
  <Card hoverable>
    <div style={{ padding: theme.spacing[6] }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing[3] }}>
        <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>{title}</div>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: theme.borderRadius.full,
            backgroundColor: `${iconColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
      </div>
      <div
        style={{
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: iconColor,
          marginBottom: theme.spacing[1],
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
        {subtitle}
      </div>
    </div>
  </Card>
);

export default AdminDashboard;