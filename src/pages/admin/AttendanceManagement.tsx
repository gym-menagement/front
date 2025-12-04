import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Attendance } from '../../models';
import type { Attendance as AttendanceType } from '../../types/attendance';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const AttendanceManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGymId) {
      loadAttendances();
    }
  }, [selectedGymId, selectedDate]);

  const loadAttendances = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setAttendances([]);
        return;
      }

      const data = await Attendance.find({
        gym: selectedGymId,
        date: selectedDate,
      });

      // 정렬: 최신 순
      data.sort((a, b) => {
        const timeA = new Date(a.checkintime).getTime();
        const timeB = new Date(b.checkintime).getTime();
        return timeB - timeA;
      });

      setAttendances(data);
    } catch (error) {
      console.error('Failed to load attendances:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendances = attendances.filter((attendance) => {
    // 타입 필터
    if (filterType !== null && attendance.type !== filterType) {
      return false;
    }

    // 검색어 필터 (사용자 이름, IP, 디바이스 등)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const userName = attendance.extra?.user?.name || '';
      const ip = attendance.ip || '';
      const device = attendance.device || '';
      const note = attendance.note || '';

      return (
        userName.toLowerCase().includes(searchLower) ||
        ip.toLowerCase().includes(searchLower) ||
        device.toLowerCase().includes(searchLower) ||
        note.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const getTypeColor = (type: number): 'success' | 'info' | 'warning' | 'error' => {
    switch (type) {
      case Attendance.type.ENTRY:
        return 'success';
      case Attendance.type.EXIT:
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusColor = (status: number): 'success' | 'info' | 'warning' | 'error' => {
    switch (status) {
      case Attendance.status.NORMAL:
        return 'success';
      case Attendance.status.LATE:
        return 'warning';
      case Attendance.status.UNAUTHORIZED:
        return 'error';
      default:
        return 'info';
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  const stats = {
    total: filteredAttendances.length,
    entry: filteredAttendances.filter((a) => a.type === Attendance.type.ENTRY).length,
    exit: filteredAttendances.filter((a) => a.type === Attendance.type.EXIT).length,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="출석 현황">
        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: '200px' }}
          />
          <Button variant="secondary" onClick={loadAttendances}>
            새로고침
          </Button>
        </div>
      </AdminHeader>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[6],
          }}
        >
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              전체 기록
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.brand.primary,
              }}
            >
              {stats.total}
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              입장
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.success,
              }}
            >
              {stats.entry}
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              퇴장
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.info,
              }}
            >
              {stats.exit}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: theme.spacing[4],
              alignItems: 'center',
            }}
          >
            <Input
              placeholder="회원명, IP, 디바이스, 메모로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterType === null ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType(null)}
              >
                전체
              </Button>
              <Button
                variant={filterType === Attendance.type.ENTRY ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType(Attendance.type.ENTRY)}
              >
                입장
              </Button>
              <Button
                variant={filterType === Attendance.type.EXIT ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType(Attendance.type.EXIT)}
              >
                퇴장
              </Button>
            </div>
          </div>
        </Card>

        {/* Attendance List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              출석 기록을 불러오는 중...
            </div>
          </Card>
        ) : filteredAttendances.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm || filterType !== null
                ? '검색 결과가 없습니다.'
                : '출석 기록이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[3],
            }}
          >
            {filteredAttendances.map((attendance) => (
              <Card key={attendance.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* Type Badge */}
                  <Badge variant={getTypeColor(attendance.type)} size="lg">
                    {Attendance.getType(attendance.type)}
                  </Badge>

                  {/* User Info */}
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      {attendance.extra?.user?.name || `사용자 #${attendance.user}`}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        display: 'flex',
                        gap: theme.spacing[3],
                        flexWrap: 'wrap',
                      }}
                    >
                      <span>
                        입장: {formatTime(attendance.checkintime)}
                      </span>
                      {attendance.checkouttime && (
                        <span>
                          퇴장: {formatTime(attendance.checkouttime)}
                        </span>
                      )}
                      {attendance.duration > 0 && (
                        <span>
                          이용시간: {formatDuration(attendance.duration)}
                        </span>
                      )}
                      <span>
                        방법: {Attendance.getMethod(attendance.method)}
                      </span>
                    </div>
                    {attendance.note && (
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.tertiary,
                          marginTop: theme.spacing[1],
                        }}
                      >
                        메모: {attendance.note}
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <Badge variant={getStatusColor(attendance.status)}>
                    {Attendance.getStatus(attendance.status)}
                  </Badge>

                  {/* Device Info */}
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.tertiary,
                      textAlign: 'right',
                    }}
                  >
                    {attendance.device && <div>{attendance.device}</div>}
                    {attendance.ip && <div>{attendance.ip}</div>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
