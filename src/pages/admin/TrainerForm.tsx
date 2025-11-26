import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User } from '../../models';
import { useNavigate, useParams } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const TrainerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedGymId = useAtomValue(selectedGymIdAtom);

  // 트레이너는 별도로 등록하지 않고 수정만 가능
  if (!id) {
    navigate('/admin/trainers');
    return null;
  }

  const [formData, setFormData] = useState({
    name: '',
    loginid: '',
    password: '',
    tel: '',
    sex: User.sex.MALE,
    use: 1,
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadTrainer();
  }, [id]);

  const loadTrainer = async () => {
    try {
      setInitialLoading(true);
      const response = await User.get(Number(id));
      const trainer = response.item;
      setFormData({
        name: trainer.name,
        loginid: trainer.loginid,
        password: '',
        tel: trainer.tel,
        sex: trainer.sex,
        use: trainer.use,
      });
    } catch (error) {
      console.error('Failed to load trainer:', error);
      alert('트레이너 정보를 불러오는데 실패했습니다.');
      navigate('/admin/trainers');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.loginid.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (!formData.tel.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const updateData: any = {
        name: formData.name,
        tel: formData.tel,
        sex: formData.sex,
        use: formData.use,
      };
      // 비밀번호가 입력된 경우만 업데이트
      if (formData.password.trim()) {
        updateData.password = formData.password;
      }
      await User.update(Number(id), updateData);
      alert('트레이너 정보가 수정되었습니다.');

      navigate('/admin/trainers');
    } catch (error) {
      console.error('Failed to save trainer:', error);
      alert('트레이너 정보 수정에 실패했습니다.');
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
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/trainers')}
            >
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
              트레이너 정보 수정
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
                label="이름"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
              />

              <Input
                label="아이디"
                placeholder="trainer@example.com"
                value={formData.loginid}
                onChange={(e) =>
                  setFormData({ ...formData, loginid: e.target.value })
                }
                required
                fullWidth
                disabled={isEditMode}
                helperText={isEditMode ? '아이디는 수정할 수 없습니다' : ''}
              />

              <Input
                label="비밀번호 (변경시에만 입력)"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                fullWidth
                helperText="비밀번호를 변경하지 않으려면 비워두세요"
              />

              <Input
                label="전화번호"
                placeholder="010-1234-5678"
                value={formData.tel}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
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
                  성별 *
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: Number(e.target.value) })
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
                  <option value={User.sex.MALE}>남성</option>
                  <option value={User.sex.FEMALE}>여성</option>
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
                  value={formData.use}
                  onChange={(e) =>
                    setFormData({ ...formData, use: Number(e.target.value) })
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
                  <option value={1}>활성</option>
                  <option value={0}>비활성</option>
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
                  onClick={() => navigate('/admin/trainers')}
                >
                  취소
                </Button>
                <Button type="submit" variant="primary" loading={loading}>
                  수정
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TrainerForm;
