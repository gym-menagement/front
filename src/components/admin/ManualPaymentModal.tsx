import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../ui';
import { theme } from '../../theme';
import { User } from '../../models';
import {
  PaymentMethod,
  PaymentMethodLabels,
  insertManualPayment,
} from '../../models/payment';
import type { User as UserType } from '../../types/user';

interface Props {
  gymId: number;
  onClose: () => void;
  onSaved: () => void;
}

/**
 * 수동 결제 등록 — 현금·계좌이체 등 오프라인 매출을 기록한다.
 * POS 연동(P6) 전까지 오프라인 결제가 리포트에 잡히게 하는 통로.
 * 정기결제(4)는 PG 청구로만 생성되므로 선택지에 넣지 않는다.
 */
const ManualPaymentModal = ({ gymId, onClose, onSaved }: Props) => {
  const [members, setMembers] = useState<UserType[]>([]);
  const [keyword, setKeyword] = useState('');
  const [form, setForm] = useState<{
    user: number;
    cost: string;
    method: number;
    note: string;
  }>({
    user: 0,
    cost: '',
    method: PaymentMethod.CASH,
    note: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setMembers(await User.findall({ role: User.role.MEMBER }));
      } catch (error) {
        console.error('Failed to load members:', error);
      }
    })();
  }, []);

  const filtered = keyword
    ? members.filter(
        (m) => m.name?.includes(keyword) || m.loginid?.includes(keyword),
      )
    : members.slice(0, 30);

  const handleSave = async () => {
    const cost = Number(form.cost);
    if (!form.user) {
      alert('회원을 선택해주세요.');
      return;
    }
    if (!cost || cost <= 0) {
      alert('결제 금액을 확인해주세요.');
      return;
    }
    try {
      setSaving(true);
      await insertManualPayment({
        gym: gymId,
        user: form.user,
        cost,
        method: form.method,
        note: form.note,
      });
      onSaved();
      onClose();
    } catch (error) {
      console.error('Manual payment failed:', error);
      alert('결제 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: 420, maxWidth: '90vw' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>결제 등록</h3>
          <p
            style={{
              marginTop: 0,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.tertiary,
            }}
          >
            현금·계좌이체 등 오프라인 결제를 기록합니다. 매출 리포트에 즉시 반영됩니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            <Input
              label="회원 검색"
              placeholder="이름 또는 아이디"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div>
              <label
                style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}
              >
                회원 선택
              </label>
              <select
                value={form.user}
                onChange={(e) => setForm({ ...form, user: Number(e.target.value) })}
                style={{
                  width: '100%',
                  marginTop: theme.spacing[1],
                  padding: theme.spacing[2],
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border.light}`,
                  backgroundColor: theme.colors.background.primary,
                  color: theme.colors.text.primary,
                }}
              >
                <option value={0}>선택하세요</option>
                {filtered.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.loginid})
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="결제 금액"
              type="number"
              placeholder="50000"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
            />

            <div>
              <label
                style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}
              >
                결제 수단
              </label>
              <div style={{ display: 'flex', gap: theme.spacing[2], marginTop: theme.spacing[1] }}>
                {[PaymentMethod.CASH, PaymentMethod.TRANSFER, PaymentMethod.CARD].map((m) => (
                  <Button
                    key={m}
                    variant={form.method === m ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setForm({ ...form, method: m })}
                  >
                    {PaymentMethodLabels[m]}
                  </Button>
                ))}
              </div>
            </div>

            <Input
              label="메모 (선택)"
              placeholder="예: 3개월권 현금 결제"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            <div style={{ display: 'flex', gap: theme.spacing[2], justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={onClose}>
                취소
              </Button>
              <Button variant="primary" loading={saving} onClick={handleSave}>
                등록
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManualPaymentModal;
