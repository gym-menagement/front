import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Rocker } from '../../models';
import type { Rockergroup as RockergroupType } from '../../types/rockergroup';
import { useNavigate, useParams } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const RockerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    group: 0,
    available: Rocker.available.AVAILABLE,
  });
  const [groups, setGroups] = useState<RockergroupType[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadGroups();
    if (isEditMode && id) {
      loadRocker();
    } else {
      setInitialLoading(false);
    }
  }, [id, selectedGymId]);

  const loadGroups = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Rockergroup.find({ gym: selectedGymId });
      setGroups(data);
    } catch (error) {
      console.error('Failed to load rocker groups:', error);
    }
  };

  const loadRocker = async () => {
    try {
      setInitialLoading(true);
      const response = await Rocker.get(Number(id));
      const rocker = response.item;
      setFormData({
        name: rocker.name,
        group: rocker.group,
        available: rocker.available,
      });
    } catch (error) {
      console.error('Failed to load rocker:', error);
      alert('락커 정보를 불러오는데 실패했습니다.');
      navigate('/admin/rockers');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    if (!formData.name.trim()) {
      alert('락커 번호를 입력해주세요.');
      return;
    }

    if (!formData.group) {
      alert('락커 그룹을 선택해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await Rocker.update(Number(id), formData);
        alert('락커가 수정되었습니다.');
      } else {
        await Rocker.insert({
          ...formData,
          gym: selectedGymId,
          date: new Date().toISOString(),
        });
        alert('락커가 등록되었습니다.');
      }

      navigate('/admin/rockers');
    } catch (error) {
      console.error('Failed to save rocker:', error);
      alert(`락커 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ padding: theme.spacing[8] }}>
        <div style={{ textAlign: 'center', marginTop: theme.spacing[16] }}>
          데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <Button variant="ghost" onClick={() => navigate('/admin/rockers')}>
              ← 목록
            </Button>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              {isEditMode ? '락커 수정' : '락커 등록'}
            </h1>
          </div>
          <GymSelector />
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        <Card>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[6],
              }}
            >
              <Input
                label="락커 번호"
                placeholder="예: 101, A-1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
              />

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  락커 그룹 *
                </label>
                <select
                  value={formData.group}
                  onChange={(e) =>
                    setFormData({ ...formData, group: Number(e.target.value) })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value="">그룹 선택</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  상태 *
                </label>
                <select
                  value={formData.available}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available: Number(e.target.value),
                    })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value={Rocker.available.AVAILABLE}>사용가능</option>
                  <option value={Rocker.available.IN_USE}>사용중</option>
                </select>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[3],
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/admin/rockers')}
                >
                  취소
                </Button>
                <Button type="submit" variant="primary" loading={loading}>
                  {isEditMode ? '수정' : '등록'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RockerForm;
