import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { DayType } from '../../models';
import type { Daytype } from '../../types/daytype';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const DaytypeManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [daytypes, setDaytypes] = useState<Daytype[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDaytype, setEditingDaytype] = useState<Daytype | null>(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (selectedGymId) {
      loadDaytypes();
    }
  }, [selectedGymId]);

  const loadDaytypes = async () => {
    try {
      setLoading(true);
      const data = await DayType.findall({ gym: selectedGymId! });
      setDaytypes(data);
    } catch (error) {
      console.error('Failed to load daytypes:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingDaytype(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const openEditModal = (daytype: Daytype) => {
    setEditingDaytype(daytype);
    setFormData({ name: daytype.name });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    try {
      if (editingDaytype) {
        await DayType.update(editingDaytype.id, {
          name: formData.name,
        });
      } else {
        await DayType.insert({
          gym: selectedGymId!,
          name: formData.name,
          date: new Date().toISOString(),
        });
      }
      setShowModal(false);
      await loadDaytypes();
    } catch (error) {
      console.error('Failed to save daytype:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await DayType.remove(id);
      await loadDaytypes();
    } catch (error) {
      console.error('Failed to delete daytype:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="운영일 분류 관리">
        <Button variant="primary" onClick={openCreateModal}>
          분류 추가
        </Button>
      </AdminHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Info */}
        <Card style={{ marginBottom: theme.spacing[6], backgroundColor: theme.colors.background.tertiary }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: theme.borderRadius.full,
              backgroundColor: `${theme.colors.brand.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={theme.colors.brand.primary} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>운영일 분류란?</div>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                평일, 주말, 공휴일 등 헬스장 운영 시간대를 구분하기 위한 분류입니다. 시간대별 가격 설정에 사용됩니다.
              </div>
            </div>
          </div>
        </Card>

        {/* Daytype List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : daytypes.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              <p style={{ marginBottom: theme.spacing[4], color: theme.colors.text.secondary }}>등록된 운영일 분류가 없습니다.</p>
              <Button variant="primary" onClick={openCreateModal}>첫 분류 추가하기</Button>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: theme.spacing[4] }}>
            {daytypes.map((dt) => (
              <Card key={dt.id} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, margin: 0 }}>
                      {dt.name}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(dt)}>수정</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(dt.id)}>삭제</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Common Presets */}
        {daytypes.length === 0 && (
          <Card style={{ marginTop: theme.spacing[6] }}>
            <h3 style={{ fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[4] }}>
              추천 분류
            </h3>
            <div style={{ display: 'flex', gap: theme.spacing[3], flexWrap: 'wrap' }}>
              {['평일', '주말', '공휴일'].map((preset) => (
                <Button
                  key={preset}
                  variant="secondary"
                  size="sm"
                  onClick={async () => {
                    await DayType.insert({
                      gym: selectedGymId!,
                      name: preset,
                      date: new Date().toISOString(),
                    });
                    await loadDaytypes();
                  }}
                >
                  + {preset}
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '400px',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              {editingDaytype ? '분류 수정' : '분류 추가'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              <Input
                label="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 평일, 주말, 공휴일"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleSave}>{editingDaytype ? '수정' : '추가'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaytypeManagement;
