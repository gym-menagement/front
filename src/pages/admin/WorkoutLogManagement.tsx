import { useEffect, useState } from 'react';
import { Card, Button, Input, Pagination } from '../../components/ui';
import { theme } from '../../theme';
import { WorkoutLog } from '../../models';
import type {
  WorkoutlogSearchParams,
  Workoutlog as WorkoutLogType,
} from '../../types/workoutlog';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { formatLocalDateTime } from '../../global/util';

const WorkoutLogManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    if (selectedGymId) {
      loadWorkoutLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGymId, selectedDate, page]);

  const loadWorkoutLogs = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setWorkoutLogs([]);
        return;
      }

      const params: WorkoutlogSearchParams = {
        gym: selectedGymId,
        page,
        pagesize: pageSize,
      };

      // 날짜 필터가 있으면 추가
      if (selectedDate) {
        params.startdate = formatLocalDateTime(new Date(selectedDate));
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 1);
        params.enddate = formatLocalDateTime(new Date(endDate));
      }

      const res = await WorkoutLog.findpage(params);
      const data = res.content;
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
      setWorkoutLogs(data);
    } catch (error) {
      console.error('Failed to load workout logs:', error);
    } finally {
      setLoading(false);
    }
  };

  // 클라이언트 사이드 필터링 (검색어)
  const filteredLogs = workoutLogs.filter((log) => {
    if (!searchTerm) return true;
    const userName = log.extra?.user?.name || '';
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePageChange = (newPage: number) => {
    // Pagination 컴포넌트는 1-based, API는 0-based이므로 변환
    setPage(newPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  // 통계 계산 (현재 페이지 데이터 기준)
  const stats = {
    total: totalElements, // API에서 제공하는 전체 데이터 수
    totalCalories: filteredLogs.reduce(
      (sum, log) => sum + (log.calories || 0),
      0
    ),
    totalDuration: filteredLogs.reduce(
      (sum, log) => sum + (log.duration || 0),
      0
    ),
    uniqueUsers: new Set(filteredLogs.map((log) => log.extra?.user?.id).filter(Boolean)).size,
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
              <Button variant="ghost" onClick={() => setSelectedDate('')}>
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
              {searchTerm || selectedDate
                ? '검색 결과가 없습니다.'
                : '운동 기록이 없습니다.'}
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
                        {log.extra?.user?.name || '알 수 없음'} 님
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
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(150px, 1fr))',
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
              currentPage={page + 1} // API는 0-based, UI는 1-based
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogManagement;
