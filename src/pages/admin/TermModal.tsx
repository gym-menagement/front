import { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/ui';
import { theme } from '../../theme';
import type { Term } from '../../types/term';
import type { Daytype } from '../../types/daytype';

interface TermModalProps {
  show: boolean;
  term: Term | null;
  gymId: number | null;
  daytypes: Daytype[];
  onClose: () => void;
  onSave: (data: { name: string; term: number; daytype: number }) => Promise<void>;
}

const TermModal = ({
  show,
  term,
  gymId,
  daytypes,
  onClose,
  onSave,
}: TermModalProps) => {
  const [name, setName] = useState('');
  const [termValue, setTermValue] = useState<string>('');
  const [daytypeId, setDaytypeId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && term) {
      setName(term.name);
      setTermValue(term.term.toString());
      setDaytypeId(term.daytype.toString());
    } else {
      setName('');
      setTermValue('');
      setDaytypeId(daytypes.length > 0 ? daytypes[0].id.toString() : '');
    }
  }, [show, term, daytypes]);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymId) return;
    if (!name || !termValue || !daytypeId) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      await onSave({
        name,
        term: parseInt(termValue, 10),
        daytype: parseInt(daytypeId, 10),
      });
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
          {term ? '기간 수정' : '새 기간 등록'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: theme.spacing[4] }}>
            <label
              style={{
                display: 'block',
                marginBottom: theme.spacing[2],
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              기간명
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 1개월, 3개월"
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing[4] }}>
            <label
              style={{
                display: 'block',
                marginBottom: theme.spacing[2],
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              기간 (일)
            </label>
            <Input
              type="number"
              value={termValue}
              onChange={(e) => setTermValue(e.target.value)}
              placeholder="예: 30"
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing[6] }}>
            <label
              style={{
                display: 'block',
                marginBottom: theme.spacing[2],
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              이용 시간대 (Daytype)
            </label>
            <Select
              value={daytypeId}
              onChange={(e) => setDaytypeId(e.target.value)}
              options={[
                { value: '', label: '선택해주세요' },
                ...daytypes.map((dt) => ({
                  value: dt.id.toString(),
                  label: dt.name,
                })),
              ]}
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

export default TermModal;
