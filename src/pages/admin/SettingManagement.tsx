import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Setting } from '../../models';
import type { Setting as SettingType } from '../../types/setting';
import AdminHeader from '../../components/AdminHeader';

const SettingManagement = () => {
  const [settings, setSettings] = useState<SettingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSetting, setNewSetting] = useState({
    category: '',
    name: '',
    key: '',
    value: '',
    remark: '',
    type: Setting.type.STRING,
    order: 0,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await Setting.findall({});
      data.sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.order - b.order;
      });
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (setting: SettingType) => {
    setEditingId(setting.id);
    setEditValue(setting.value);
  };

  const handleEditSave = async (setting: SettingType) => {
    try {
      await Setting.patch(setting.id, { value: editValue });
      setEditingId(null);
      await loadSettings();
    } catch (error) {
      console.error('Failed to update setting:', error);
      alert('설정 저장에 실패했습니다.');
    }
  };

  const handleAdd = async () => {
    if (!newSetting.key.trim() || !newSetting.name.trim()) {
      alert('키와 이름을 입력해주세요.');
      return;
    }
    try {
      await Setting.insert({
        ...newSetting,
        data: '',
        date: new Date().toISOString(),
      });
      setShowAddModal(false);
      setNewSetting({ category: '', name: '', key: '', value: '', remark: '', type: Setting.type.STRING, order: 0 });
      await loadSettings();
    } catch (error) {
      console.error('Failed to add setting:', error);
      alert('설정 추가에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await Setting.remove(id);
      await loadSettings();
    } catch (error) {
      console.error('Failed to delete setting:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  // Group settings by category
  const grouped = settings.reduce<Record<string, SettingType[]>>((acc, setting) => {
    const cat = setting.category || '기타';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(setting);
    return acc;
  }, {});

  const renderValueInput = (setting: SettingType) => {
    if (setting.type === Setting.type.BOOLEAN) {
      return (
        <select
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          style={{
            padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border.medium}`,
            backgroundColor: theme.colors.background.primary,
            fontSize: theme.typography.fontSize.sm,
          }}
        >
          <option value="true">참</option>
          <option value="false">거짓</option>
        </select>
      );
    }
    return (
      <Input
        type={setting.type === Setting.type.NUMBER ? 'number' : 'text'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        inputSize="sm"
        style={{ width: '200px' }}
      />
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="설정 관리" showGymSelector={false}>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          설정 추가
        </Button>
      </AdminHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : Object.keys(grouped).length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>설정이 없습니다.</div></Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[6] }}>
            {Object.entries(grouped).map(([category, items]) => (
              <Card key={category}>
                <h3 style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  marginBottom: theme.spacing[4],
                  paddingBottom: theme.spacing[3],
                  borderBottom: `1px solid ${theme.colors.border.light}`,
                }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
                  {items.map((setting) => (
                    <div key={setting.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: `${theme.spacing[3]} 0`,
                      borderBottom: `1px solid ${theme.colors.border.light}`,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                          <span style={{ fontWeight: theme.typography.fontWeight.medium, fontSize: theme.typography.fontSize.sm }}>
                            {setting.name}
                          </span>
                          <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
                            ({setting.key})
                          </span>
                          <span style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.tertiary,
                            backgroundColor: theme.colors.background.secondary,
                            padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                            borderRadius: theme.borderRadius.sm,
                          }}>
                            {Setting.getType(setting.type)}
                          </span>
                        </div>
                        {setting.remark && (
                          <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary, marginTop: theme.spacing[1] }}>
                            {setting.remark}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                        {editingId === setting.id ? (
                          <>
                            {renderValueInput(setting)}
                            <Button variant="primary" size="sm" onClick={() => handleEditSave(setting)}>저장</Button>
                            <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>취소</Button>
                          </>
                        ) : (
                          <>
                            <span style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.primary,
                              backgroundColor: theme.colors.background.secondary,
                              padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                              borderRadius: theme.borderRadius.md,
                              minWidth: '80px',
                              textAlign: 'center',
                            }}>
                              {setting.value || '-'}
                            </span>
                            <Button variant="ghost" size="sm" onClick={() => handleEditStart(setting)}>편집</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(setting.id)}>삭제</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '500px',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              설정 추가
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              <Input label="카테고리" value={newSetting.category} onChange={(e) => setNewSetting({ ...newSetting, category: e.target.value })} placeholder="예: 일반, 보안, 알림" />
              <Input label="이름" value={newSetting.name} onChange={(e) => setNewSetting({ ...newSetting, name: e.target.value })} placeholder="설정 표시 이름" />
              <Input label="키" value={newSetting.key} onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })} placeholder="고유 설정 키" />
              <div>
                <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>타입</label>
                <select value={newSetting.type} onChange={(e) => setNewSetting({ ...newSetting, type: Number(e.target.value) })}
                  style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}>
                  <option value={Setting.type.STRING}>문자열</option>
                  <option value={Setting.type.NUMBER}>숫자</option>
                  <option value={Setting.type.BOOLEAN}>참거짓</option>
                </select>
              </div>
              <Input label="값" value={newSetting.value} onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })} />
              <Input label="설명" value={newSetting.remark} onChange={(e) => setNewSetting({ ...newSetting, remark: e.target.value })} placeholder="선택사항" />
              <Input label="순서" type="number" value={String(newSetting.order)} onChange={(e) => setNewSetting({ ...newSetting, order: Number(e.target.value) })} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleAdd}>추가</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingManagement;
