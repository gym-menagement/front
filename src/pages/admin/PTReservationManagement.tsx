import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { PTReservation, User } from '../../models';
import type { Ptreservation as PTReservationType } from '../../types/ptreservation';
import type { User as UserType } from '../../types/user';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { userAtom } from '../../store/auth';
import { formatLocalDateTime } from '../../global/util';

const PTReservationManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const currentUser = useAtomValue(userAtom);
  const [reservations, setReservations] = useState<PTReservationType[]>([]);
  const [trainers, setTrainers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [filterStatus, setFilterStatus] = useState<number | null>(null);
  const [filterTrainer, setFilterTrainer] = useState<number | null>(null);

  const isAdmin = currentUser?.role === User.role.GYM_ADMIN;
  const isTrainer = currentUser?.role === User.role.TRAINER;

  useEffect(() => {
    if (selectedGymId) {
      loadData();
    }
  }, [selectedGymId, selectedDate]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setReservations([]);
        return;
      }

      // 트레이너 목록 로드 (관리자만)
      if (isAdmin) {
        const trainerData = await User.findall({
          role: User.role.TRAINER,
        });
        setTrainers(trainerData);
      }

      // 예약 목록 로드
      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);

      const params: Record<string, unknown> = {
        gym: selectedGymId,
        startreservationdate: formatLocalDateTime(startDate),
        endreservationdate: formatLocalDateTime(endDate),
      };

      // 트레이너는 본인 예약만 조회
      if (isTrainer && currentUser) {
        params.trainer = currentUser.id;
      }

      const data = await PTReservation.findall(params);

      // 시간순 정렬
      data.sort((a, b) => {
        const timeA = a.starttime || '';
        const timeB = b.starttime || '';
        return timeA.localeCompare(timeB);
      });

      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    reservation: PTReservationType,
    newStatus: number,
  ) => {
    try {
      await PTReservation.patch(reservation.id, { status: newStatus });
      await loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filterStatus !== null && reservation.status !== filterStatus) {
      return false;
    }
    if (filterTrainer !== null && reservation.trainer !== filterTrainer) {
      return false;
    }
    return true;
  });

  const getStatusColor = (
    status: number,
  ): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case PTReservation.status.RESERVED:
        return 'info';
      case PTReservation.status.COMPLETED:
        return 'success';
      case PTReservation.status.CANCELLED:
        return 'warning';
      case PTReservation.status.NO_SHOW:
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    // HH:mm:ss -> HH:mm
    return timeString.substring(0, 5);
  };

  const stats = {
    total: filteredReservations.length,
    reserved: filteredReservations.filter(
      (r) => r.status === PTReservation.status.RESERVED,
    ).length,
    completed: filteredReservations.filter(
      (r) => r.status === PTReservation.status.COMPLETED,
    ).length,
    cancelled: filteredReservations.filter(
      (r) => r.status === PTReservation.status.CANCELLED,
    ).length,
    noShow: filteredReservations.filter(
      (r) => r.status === PTReservation.status.NO_SHOW,
    ).length,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="PT 예약 관리">
        <div
          style={{
            display: 'flex',
            gap: theme.spacing[2],
            alignItems: 'center',
          }}
        >
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: '180px' }}
          />
          <Button variant="secondary" onClick={loadData}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
              전체
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
              예약
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.info,
              }}
            >
              {stats.reserved}
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
              완료
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.success,
              }}
            >
              {stats.completed}
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
              취소
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.warning,
              }}
            >
              {stats.cancelled}
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
              노쇼
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.error,
              }}
            >
              {stats.noShow}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[4],
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* 상태 필터 */}
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterStatus === null ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterStatus(null)}
              >
                전체
              </Button>
              <Button
                variant={
                  filterStatus === PTReservation.status.RESERVED
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() => setFilterStatus(PTReservation.status.RESERVED)}
              >
                예약
              </Button>
              <Button
                variant={
                  filterStatus === PTReservation.status.COMPLETED
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() => setFilterStatus(PTReservation.status.COMPLETED)}
              >
                완료
              </Button>
              <Button
                variant={
                  filterStatus === PTReservation.status.CANCELLED
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() => setFilterStatus(PTReservation.status.CANCELLED)}
              >
                취소
              </Button>
              <Button
                variant={
                  filterStatus === PTReservation.status.NO_SHOW
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() => setFilterStatus(PTReservation.status.NO_SHOW)}
              >
                노쇼
              </Button>
            </div>

            {/* 트레이너 필터 (관리자만) */}
            {isAdmin && trainers.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[2],
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  트레이너:
                </span>
                <select
                  value={filterTrainer || ''}
                  onChange={(e) =>
                    setFilterTrainer(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  style={{
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`,
                    backgroundColor: theme.colors.background.primary,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  <option value="">전체</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </Card>

        {/* Reservation List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              예약 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredReservations.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {filterStatus !== null || filterTrainer !== null
                ? '검색 결과가 없습니다.'
                : '예약이 없습니다.'}
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
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* Time */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.md,
                      minWidth: '100px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xl,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.brand.primary,
                      }}
                    >
                      {formatTime(reservation.starttime)}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      ~ {formatTime(reservation.endtime)}
                    </div>
                    {reservation.duration > 0 && (
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.text.tertiary,
                        }}
                      >
                        {reservation.duration}분
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing[3],
                        marginBottom: theme.spacing[2],
                      }}
                    >
                      <span
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.base,
                        }}
                      >
                        회원:{' '}
                        {reservation.extra?.memberuser?.name ||
                          `#${reservation.member}`}
                      </span>
                      <Badge variant={getStatusColor(reservation.status)}>
                        {PTReservation.getStatus(reservation.status)}
                      </Badge>
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
                        트레이너:{' '}
                        {reservation.extra?.traineruser?.name ||
                          `#${reservation.trainer}`}
                      </span>
                      {reservation.note && (
                        <span>메모: {reservation.note}</span>
                      )}
                    </div>
                    {reservation.cancelreason && (
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.semantic.error,
                          marginTop: theme.spacing[1],
                        }}
                      >
                        취소 사유: {reservation.cancelreason}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {reservation.status === PTReservation.status.RESERVED && (
                    <div
                      style={{
                        display: 'flex',
                        gap: theme.spacing[2],
                        flexDirection: 'column',
                      }}
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(
                            reservation,
                            PTReservation.status.COMPLETED,
                          )
                        }
                      >
                        완료
                      </Button>
                      <div style={{ display: 'flex', gap: theme.spacing[1] }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(
                              reservation,
                              PTReservation.status.CANCELLED,
                            )
                          }
                        >
                          취소
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(
                              reservation,
                              PTReservation.status.NO_SHOW,
                            )
                          }
                        >
                          노쇼
                        </Button>
                      </div>
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

export default PTReservationManagement;
