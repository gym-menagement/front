import { useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import type { User as UserType } from '../../types/user';
import type { Health as HealthType } from '../../types/health';

interface PauseModalProps {
  show: boolean;
  usehealthId: number | null;
  usehealthData: {
    id: number;
    endday: string;
    extra?: {
      user?: UserType;
      health?: HealthType;
    };
  } | null;
  onClose: () => void;
  onConfirm: (usehealthId: number, startDate: string, days: number) => void;
}

const PauseModal = ({
  show,
  usehealthId,
  usehealthData,
  onClose,
  onConfirm,
}: PauseModalProps) => {
  const [pauseDays, setPauseDays] = useState<number>(7);
  const [pauseStartDate, setPauseStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const handleConfirm = () => {
    if (!usehealthId || !pauseStartDate) {
      alert('일시정지 시작일을 선택해주세요.');
      return;
    }

    if (pauseDays <= 0) {
      alert('일시정지 기간을 올바르게 입력해주세요.');
      return;
    }

    onConfirm(usehealthId, pauseStartDate, pauseDays);
  };

  if (!show) return null;

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
      }}
      onClick={onClose}
    >
      <Card
        style={{
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: theme.spacing[6] }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[6],
            }}
          >
            회원권 일시정지
          </h2>

          {usehealthData && (
            <div
              style={{
                marginBottom: theme.spacing[6],
                padding: theme.spacing[4],
                backgroundColor: theme.colors.background.secondary,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <div style={{ marginBottom: theme.spacing[2] }}>
                <strong>회원:</strong> {usehealthData.extra?.user?.name}
              </div>
              <div style={{ marginBottom: theme.spacing[2] }}>
                <strong>회원권:</strong> {usehealthData.extra?.health?.name}
              </div>
              <div>
                <strong>현재 종료일:</strong> {formatDate(usehealthData.endday)}
              </div>
            </div>
          )}

          <div style={{ marginBottom: theme.spacing[4] }}>
            <Input
              label="일시정지 시작일"
              type="date"
              value={pauseStartDate}
              onChange={(e) => setPauseStartDate(e.target.value)}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing[4] }}>
            <label
              style={{
                display: 'block',
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                marginBottom: theme.spacing[2],
                color: theme.colors.text.primary,
              }}
            >
              일시정지 기간 (일)
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: theme.spacing[2],
                marginBottom: theme.spacing[3],
              }}
            >
              {[7, 14, 30, 60].map((days) => (
                <Button
                  key={days}
                  variant={pauseDays === days ? 'primary' : 'ghost'}
                  onClick={() => setPauseDays(days)}
                  fullWidth
                >
                  {days}일
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={pauseDays}
              onChange={(e) => setPauseDays(Number(e.target.value))}
              placeholder="직접 입력"
              fullWidth
              min={1}
            />
          </div>

          {pauseStartDate && pauseDays > 0 && (
            <div
              style={{
                marginBottom: theme.spacing[6],
                padding: theme.spacing[4],
                backgroundColor: theme.colors.background.secondary,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <div style={{ marginBottom: theme.spacing[2] }}>
                <strong>일시정지 종료일:</strong>{' '}
                {(() => {
                  const endDate = new Date(pauseStartDate);
                  endDate.setDate(endDate.getDate() + pauseDays);
                  return formatDate(endDate.toISOString().split('T')[0]);
                })()}
              </div>
              <div style={{ color: theme.colors.brand.primary }}>
                <strong>연장된 회원권 종료일:</strong>{' '}
                {usehealthData &&
                  (() => {
                    const newEndDay = new Date(usehealthData.endday);
                    newEndDay.setDate(newEndDay.getDate() + pauseDays);
                    return formatDate(newEndDay.toISOString().split('T')[0]);
                  })()}
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: theme.spacing[3],
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              일시정지 등록
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PauseModal;
