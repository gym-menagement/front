import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import type { Discount } from '../../types/discount';

interface DiscountModalProps {
  show: boolean;
  discount: Discount | null;
  gymId: number | null;
  onClose: () => void;
  onSave: (data: { name: string; discount: number }) => Promise<void>;
}

const DiscountModal: React.FC<DiscountModalProps> = ({
  show,
  discount,
  gymId,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; discount?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (show) {
      if (discount) {
        // 수정 모드
        setName(discount.name);
        setDiscountRate(String(discount.discount));
      } else {
        // 등록 모드
        setName('');
        setDiscountRate('');
      }
      setErrors({});
    }
  }, [show, discount]);

  const validate = () => {
    const newErrors: { name?: string; discount?: string } = {};

    if (!name.trim()) {
      newErrors.name = '할인명을 입력해주세요.';
    }

    const rate = Number(discountRate);
    if (!discountRate || isNaN(rate)) {
      newErrors.discount = '할인율을 입력해주세요.';
    } else if (rate <= 0 || rate > 100) {
      newErrors.discount = '할인율은 1~100 사이의 값이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      await onSave({
        name: name.trim(),
        discount: Number(discountRate),
      });
      onClose();
    } catch (error) {
      console.error('Failed to save discount:', error);
      alert('할인 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
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
        padding: theme.spacing[4],
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <h2
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[6],
              color: theme.colors.text.primary,
            }}
          >
            {discount ? '할인 수정' : '새 할인 등록'}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[4],
            }}
          >
            <Input
              label="할인명"
              placeholder="예: 학생 할인, 조기 등록 할인"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              error={errors.name}
              fullWidth
              autoFocus
            />

            <Input
              label="할인율 (%)"
              type="number"
              placeholder="10"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              onKeyPress={handleKeyPress}
              error={errors.discount}
              helperText="1~100 사이의 숫자를 입력하세요"
              fullWidth
            />

            <div
              style={{
                display: 'flex',
                gap: theme.spacing[3],
                marginTop: theme.spacing[2],
              }}
            >
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving}
                fullWidth
              >
                {saving ? '저장 중...' : discount ? '수정' : '등록'}
              </Button>
              <Button variant="ghost" onClick={onClose} disabled={saving} fullWidth>
                취소
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiscountModal;
