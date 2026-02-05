import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { TrainerMember, Gymtrainer, UseHealth } from '../../models';
import type { Trainermember as TrainerMemberType } from '../../types/trainermember';
import type { User as UserType } from '../../types/user';
import type { Gymtrainer as GymtrainerType } from '../../types/gymtrainer';
import type { Usehealth as UsehealthType } from '../../types/usehealth';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const TrainerAssignmentManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [assignments, setAssignments] = useState<TrainerMemberType[]>([]);
  const [trainers, setTrainers] = useState<UserType[]>([]);
  const [members, setMembers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTrainer, setFilterTrainer] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | null>(
    TrainerMember.status.IN_PROGRESS,
  );
  const [showModal, setShowModal] = useState(false);

  // 새 배정 폼 상태
  const [newAssignment, setNewAssignment] = useState({
    trainer: 0,
    member: 0,
    startdate: new Date().toISOString().split('T')[0],
    enddate: '',
    note: '',
  });

  useEffect(() => {
    if (selectedGymId) {
      loadData();
    }
  }, [selectedGymId]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setAssignments([]);
        return;
      }

      // 이 체육관에 소속된 트레이너 목록 (Gymtrainer 테이블 조회)
      const gymTrainerData = await Gymtrainer.findall({
        gym: selectedGymId,
        status: Gymtrainer.status.TERMINATED,
      });
      // extra.traineruser에서 User 정보 추출
      const trainerUsers = gymTrainerData
        .filter((gt: GymtrainerType) => gt.extra?.traineruser)
        .map((gt: GymtrainerType) => gt.extra!.traineruser as UserType);
      setTrainers(trainerUsers);

      // 이 체육관에 등록된 회원 목록 (UseHealth 테이블 조회)
      const useHealthData = await UseHealth.findall({
        gym: selectedGymId,
      });
      // extra.user에서 User 정보 추출 (중복 제거)
      const memberMap = new Map<number, UserType>();
      useHealthData.forEach((uh: UsehealthType) => {
        if (uh.extra?.user && !memberMap.has(uh.extra.user.id)) {
          memberMap.set(uh.extra.user.id, uh.extra.user);
        }
      });
      setMembers(Array.from(memberMap.values()));

      // 배정 목록
      const data = await TrainerMember.findall({
        gym: selectedGymId,
      });

      // 최신 순 정렬
      data.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      setAssignments(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newAssignment.trainer || !newAssignment.member) {
      alert('트레이너와 회원을 선택해주세요.');
      return;
    }

    try {
      await TrainerMember.insert({
        trainer: newAssignment.trainer,
        member: newAssignment.member,
        gym: selectedGymId,
        startdate: newAssignment.startdate,
        enddate: newAssignment.enddate || undefined,
        status: TrainerMember.status.IN_PROGRESS,
        note: newAssignment.note,
      });
      setShowModal(false);
      setNewAssignment({
        trainer: 0,
        member: 0,
        startdate: new Date().toISOString().split('T')[0],
        enddate: '',
        note: '',
      });
      await loadData();
    } catch (error) {
      console.error('Failed to create assignment:', error);
      alert('배정 등록에 실패했습니다.');
    }
  };

  const handleStatusChange = async (
    assignment: TrainerMemberType,
    newStatus: number,
  ) => {
    try {
      await TrainerMember.patch(assignment.id, { status: newStatus });
      await loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await TrainerMember.remove(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (filterStatus !== null && assignment.status !== filterStatus) {
      return false;
    }
    if (filterTrainer !== null && assignment.trainer !== filterTrainer) {
      return false;
    }
    return true;
  });

  const getStatusColor = (
    status: number,
  ): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case TrainerMember.status.IN_PROGRESS:
        return 'success';
      case TrainerMember.status.TERMINATED:
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  // 트레이너별 회원 수 집계
  const trainerStats = trainers.map((trainer) => {
    const count = assignments.filter(
      (a) =>
        a.trainer === trainer.id &&
        a.status === TrainerMember.status.IN_PROGRESS,
    ).length;
    return { ...trainer, memberCount: count };
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="트레이너-회원 배정">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + 새 배정
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
        {/* Trainer Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[6],
          }}
        >
          {trainerStats.map((trainer) => (
            <Card
              key={trainer.id}
              hoverable
              clickable
              onClick={() =>
                setFilterTrainer(
                  filterTrainer === trainer.id ? null : trainer.id,
                )
              }
              style={{
                border:
                  filterTrainer === trainer.id
                    ? `2px solid ${theme.colors.brand.primary}`
                    : undefined,
              }}
            >
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing[1],
                }}
              >
                {trainer.name}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.brand.primary,
                }}
              >
                {trainer.memberCount}
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.normal,
                    marginLeft: theme.spacing[1],
                  }}
                >
                  명
                </span>
              </div>
            </Card>
          ))}
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
                  filterStatus === TrainerMember.status.IN_PROGRESS
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() =>
                  setFilterStatus(TrainerMember.status.IN_PROGRESS)
                }
              >
                진행중
              </Button>
              <Button
                variant={
                  filterStatus === TrainerMember.status.TERMINATED
                    ? 'primary'
                    : 'secondary'
                }
                size="sm"
                onClick={() => setFilterStatus(TrainerMember.status.TERMINATED)}
              >
                종료
              </Button>
            </div>

            {filterTrainer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterTrainer(null)}
              >
                트레이너 필터 해제
              </Button>
            )}
          </div>
        </Card>

        {/* Assignment List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              배정 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredAssignments.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {filterStatus !== null || filterTrainer !== null
                ? '검색 결과가 없습니다.'
                : '배정 내역이 없습니다.'}
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
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr auto auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* Trainer */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      트레이너
                    </div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      {assignment.extra?.traineruser?.name ||
                        `#${assignment.trainer}`}
                    </div>
                  </div>

                  {/* Member */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.text.tertiary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      회원
                    </div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      {assignment.extra?.memberuser?.name ||
                        `#${assignment.member}`}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {formatDate(assignment.startdate)} ~{' '}
                      {assignment.enddate
                        ? formatDate(assignment.enddate)
                        : '진행중'}
                    </div>
                    {assignment.note && (
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.tertiary,
                          marginTop: theme.spacing[1],
                        }}
                      >
                        {assignment.note}
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <Badge variant={getStatusColor(assignment.status)}>
                    {TrainerMember.getStatus(assignment.status)}
                  </Badge>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    {assignment.status === TrainerMember.status.IN_PROGRESS && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(
                            assignment,
                            TrainerMember.status.TERMINATED,
                          )
                        }
                      >
                        종료
                      </Button>
                    )}
                    {assignment.status === TrainerMember.status.TERMINATED && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(
                            assignment,
                            TrainerMember.status.IN_PROGRESS,
                          )
                        }
                      >
                        재개
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(assignment.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
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
          }}
          onClick={() => setShowModal(false)}
        >
          <Card
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: theme.spacing[4],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                marginBottom: theme.spacing[6],
              }}
            >
              새 트레이너-회원 배정
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[4],
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    marginBottom: theme.spacing[2],
                  }}
                >
                  트레이너 *
                </label>
                <select
                  value={newAssignment.trainer}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      trainer: Number(e.target.value),
                    })
                  }
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`,
                    backgroundColor: theme.colors.background.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value={0}>선택하세요</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    marginBottom: theme.spacing[2],
                  }}
                >
                  회원 *
                </label>
                <select
                  value={newAssignment.member}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      member: Number(e.target.value),
                    })
                  }
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`,
                    backgroundColor: theme.colors.background.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value={0}>선택하세요</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.tel || member.email})
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: theme.spacing[4],
                }}
              >
                <Input
                  label="시작일 *"
                  type="date"
                  value={newAssignment.startdate}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      startdate: e.target.value,
                    })
                  }
                />
                <Input
                  label="종료일"
                  type="date"
                  value={newAssignment.enddate}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      enddate: e.target.value,
                    })
                  }
                  helperText="비워두면 무기한"
                />
              </div>

              <Input
                label="메모"
                value={newAssignment.note}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, note: e.target.value })
                }
                placeholder="예: PT 30회 패키지"
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: theme.spacing[3],
                marginTop: theme.spacing[6],
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                취소
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                배정하기
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainerAssignmentManagement;
