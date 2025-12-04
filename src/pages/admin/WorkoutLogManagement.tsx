import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { WorkoutLog, User } from '../../models';
import type { WorkoutLog as WorkoutLogType } from '../../types/workoutlog';
import type { User as UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const WorkoutLogManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadWorkoutLogs();
      loadUsers();
    }
  }, [selectedGymId]);

  const loadWorkoutLogs = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setWorkoutLogs([]);
        return;
      }

      const data = await WorkoutLog.findall({ gym: selectedGymId });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
            >
              ← 대시보드
            </Button>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              운동 기록 관리
            </h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <GymSelector />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Search */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder="회원명 또는 운동명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
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
              {searchTerm ? '검색 결과가 없습니다.' : '운동 기록이 없습니다.'}
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
