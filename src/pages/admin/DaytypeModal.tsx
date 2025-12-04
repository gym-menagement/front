import { useEffect, useState } from 'react';
import { Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import type { Daytype } from '../../types/daytype';

interface DaytypeModalProps {
  show: boolean;
  daytype: Daytype | null;
  gymId: number | null;
  onClose: () => void;
  onSave: (data: { name: string }) => Promise<void>;
}

const DaytypeModal = ({
  show,
  daytype,
  gymId,
  onClose,
  onSave,
}: DaytypeModalProps) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && daytype) {
      setName(daytype.name);
    } else {
      setName('');
    }
  }, [show, daytype]);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymId) return;
    if (!name) {
      alert('이용시간대명을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      await onSave({ name });
      onClose();
    } catch (error) {
      console.error(error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
    >
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[6],
          width: '100%',
          maxWidth: '500px',
          boxShadow: theme.boxShadow.xl,
        }}
      >
        <h2
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing[6],
          }}
        >
          {daytype ? '이용시간대 수정' : '새 이용시간대 등록'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: theme.spacing[6] }}>
            <label
              style={{
                display: 'block',
                marginBottom: theme.spacing[2],
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              이용시간대명
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 전일, 오전, 오후"
              fullWidth
              required
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: theme.spacing[2],
            }}
          >
            <Button type="button" variant="secondary" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaytypeModal;
