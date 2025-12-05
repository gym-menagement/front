import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { WorkoutLog, User } from '../../models';
import type { WorkoutLog as WorkoutLogType } from '../../types/workoutlog';
import type { User as UserType } from '../../types/user';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const WorkoutLogManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    if (selectedGymId) {
      loadWorkoutLogs();
      loadUsers();
    }
  }, [selectedGymId, selectedDate]);

  const loadWorkoutLogs = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setWorkoutLogs([]);
        return;
      }

      const params: any = { gym: selectedGymId };

      // 날짜 필터가 있으면 추가
      if (selectedDate) {
        params.startdate = selectedDate;
        params.enddate = selectedDate;
      }

      const data = await WorkoutLog.findall(params);
      // 날짜순으로 정렬 (최신순)
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setWorkoutLogs(data);
    } catch (error) {
      console.error('Failed to load workout logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await User.findall({ role: User.role.MEMBER });
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : '-';
  };

  const filteredLogs = workoutLogs.filter((log) => {
    const userName = getUserName(log.user);
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  // 통계 계산
  const stats = {
    total: filteredLogs.length,
    totalCalories: filteredLogs.reduce((sum, log) => sum + (log.calories || 0), 0),
    totalDuration: filteredLogs.reduce((sum, log) => sum + (log.duration || 0), 0),
    uniqueUsers: new Set(filteredLogs.map((log) => log.user)).size,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="운동 기록 관리">
        <Button variant="secondary" onClick={loadWorkoutLogs}>
          새로고침
        </Button>
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
              운동한 회원 수
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.success,
              }}
            >
              {stats.uniqueUsers}
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
              총 소모 칼로리
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.error,
              }}
            >
              {stats.totalCalories.toLocaleString()} kcal
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
              총 운동 시간
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.info,
              }}
            >
              {stats.totalDuration.toLocaleString()} 분
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[4],
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <Input
                placeholder="회원명 또는 운동명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ flex: '0 1 200px' }}>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
              />
            </div>
            {selectedDate && (
              <Button
                variant="ghost"
                onClick={() => setSelectedDate('')}
              >
                날짜 필터 해제
              </Button>
            )}
          </div>
        </Card>

        {/* Workout Logs List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              운동 기록을 불러오는 중...
            </div>
          </Card>
        ) : filteredLogs.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm || selectedDate ? '검색 결과가 없습니다.' : '운동 기록이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[4],
            }}
          >
            {filteredLogs.map((log) => (
              <Card key={log.id} hoverable>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing[3],
                  }}
                >
                  {/* Header: 회원명, 운동명, 날짜 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: theme.spacing[3],
                      borderBottom: `1px solid ${theme.colors.border.light}`,
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
                        {log.exercisename}
                      </div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                        }}
                      >
                        {getUserName(log.user)}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {formatDateTime(log.date)}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
                        세트 수
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {log.sets} 세트
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
                        반복 횟수
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {log.reps} 회
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
                        중량
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {log.weight} kg
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
                        운동 시간
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        {log.duration} 분
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
                        소모 칼로리
                      </div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                          color: theme.colors.semantic.error,
                        }}
                      >
                        {log.calories} kcal
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  {log.note && (
                    <div
                      style={{
                        padding: theme.spacing[3],
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      메모: {log.note}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogManagement;
