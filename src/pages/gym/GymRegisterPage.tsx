import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Button, Input, Card } from '../../components/ui';
import { theme } from '../../theme';
import { Gym } from '../../models';
import { userAtom } from '../../store/auth';
import type { CreateGymRequest } from '../../types/gym';

const GymRegisterPage = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 헬스장 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '헬스장 이름을 입력해주세요.';
    } else if (formData.name.length < 2) {
      newErrors.name = '헬스장 이름은 2자 이상이어야 합니다.';
    }

    // 주소 검증
    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    // 전화번호 검증 (선택)
    if (formData.phone && !/^0\d{1,2}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다. (예: 02-1234-5678)';
    }

    // 이메일 검증 (선택)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (!user) {
        navigate('/login');
        return;
      }

      // CreateGymRequest 생성
      const gymData: CreateGymRequest = {
        name: formData.name,
        address: formData.address,
        tel: formData.phone,
        user: user.id,
        date: new Date().toISOString(),
      };

      await Gym.insert(gymData);

      alert('헬스장 등록이 완료되었습니다.');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Gym registration failed:', error);
      alert('헬스장 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing[4],
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: theme.spacing[8] }}>
          <h1
            style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[2],
            }}
          >
            헬스장 등록
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.text.secondary,
            }}
          >
            운영하실 헬스장 정보를 입력해주세요
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[4],
            }}
          >
            {/* 헬스장 이름 */}
            <Input
              label="헬스장 이름"
              type="text"
              placeholder="예: 강남 피트니스 센터"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              fullWidth
              required
            />

            {/* 주소 */}
            <Input
              label="주소"
              type="text"
              placeholder="헬스장 주소를 입력하세요"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
              fullWidth
              required
            />

            {/* 전화번호 */}
            <Input
              label="전화번호 (선택)"
              type="tel"
              placeholder="02-1234-5678"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              helperText="대표 전화번호를 입력하세요"
              fullWidth
            />

            {/* 이메일 */}
            <Input
              label="이메일 (선택)"
              type="email"
              placeholder="gym@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              helperText="문의 이메일 주소를 입력하세요"
              fullWidth
            />

            {/* 설명 */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing[2],
                }}
              >
                헬스장 소개 (선택)
              </label>
              <textarea
                placeholder="헬스장에 대한 간단한 소개를 입력하세요"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: theme.spacing[3],
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.primary,
                  backgroundColor: theme.colors.background.primary,
                  border: `1px solid ${theme.colors.border.medium}`,
                  borderRadius: theme.borderRadius.md,
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* 등록 버튼 */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              style={{ marginTop: theme.spacing[4] }}
            >
              헬스장 등록
            </Button>

            {/* 나중에 등록 링크 */}
            <div style={{ textAlign: 'center', marginTop: theme.spacing[2] }}>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                나중에 등록하기
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default GymRegisterPage;
