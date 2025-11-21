import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../../components/ui';
import { theme } from '../../theme';
import { User } from '../../models';
import type { CreateUserRequest } from '../../types/user';
import {
  validateLoginId,
  validatePassword,
  validatePasswordConfirm,
  validateEmail,
  validatePhone,
  validateName,
  validateBirthDate,
  formatPhoneNumber,
} from '../../global/util';

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    loginid: '',
    passwd: '',
    confirmPasswd: '',
    email: '',
    name: '',
    tel: '',
    address: '',
    birth: '',
    sex: 1, // 1: 남성, 2: 여성
    role: User.role.MEMBER, // 기본값: 일반 회원
    image: '', // 프로필 이미지 URL
  });
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChange = (field: string, value: string | number) => {
    let processedValue = value;

    // 전화번호 입력 시 자동 포맷팅
    if (field === 'tel' && typeof value === 'string') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: '이미지 파일 크기는 5MB 이하여야 합니다.',
        }));
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          image: '이미지 파일만 업로드 가능합니다.',
        }));
        return;
      }

      setImageFile(file);

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string, // Base64로 저장
        }));
      };
      reader.readAsDataURL(file);

      // 에러 제거
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 아이디 검증
    const loginidValidation = validateLoginId(formData.loginid);
    if (!loginidValidation.valid) {
      newErrors.loginid = loginidValidation.message || '';
    }

    // 비밀번호 검증
    const passwordValidation = validatePassword(formData.passwd);
    if (!passwordValidation.valid) {
      newErrors.passwd = passwordValidation.message || '';
    }

    // 비밀번호 확인 검증
    const passwordConfirmValidation = validatePasswordConfirm(
      formData.passwd,
      formData.confirmPasswd
    );
    if (!passwordConfirmValidation.valid) {
      newErrors.confirmPasswd = passwordConfirmValidation.message || '';
    }

    // 이메일 검증
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.message || '';
    }

    // 이름 검증
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message || '';
    }

    // 전화번호 검증
    const phoneValidation = validatePhone(formData.tel);
    if (!phoneValidation.valid) {
      newErrors.tel = phoneValidation.message || '';
    }

    // 생년월일 검증
    const birthValidation = validateBirthDate(formData.birth);
    if (!birthValidation.valid) {
      newErrors.birth = birthValidation.message || '';
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

      // CreateUserRequest 생성
      const userData: CreateUserRequest = {
        loginid: formData.loginid,
        passwd: formData.passwd,
        email: formData.email,
        name: formData.name,
        tel: formData.tel,
        address: formData.address || '',
        image: '',
        sex: formData.sex,
        birth: formData.birth,
        type: 0,
        connectid: '',
        level: 0,
        role: User.role.MEMBER, // 기본적으로 회원으로 가입
        use: 1, // 활성 상태
        logindate: new Date().toISOString(),
        lastchangepasswddate: new Date().toISOString(),
        date: new Date().toISOString(),
      };

      await User.insert(userData);

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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
          maxWidth: '500px',
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
            회원가입
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.text.secondary,
            }}
          >
            헬스장 관리 시스템에 오신 것을 환영합니다
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
            {/* 아이디 */}
            <Input
              label="아이디"
              type="text"
              placeholder="영문자로 시작, 4~20자"
              value={formData.loginid}
              onChange={(e) => handleChange('loginid', e.target.value)}
              error={errors.loginid}
              helperText="영문자, 숫자, 언더스코어(_) 사용 가능"
              fullWidth
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              placeholder="8~20자, 영문+숫자/특수문자 조합"
              value={formData.passwd}
              onChange={(e) => handleChange('passwd', e.target.value)}
              error={errors.passwd}
              helperText="영문자, 숫자, 특수문자 중 2가지 이상 조합"
              fullWidth
            />

            {/* 비밀번호 확인 */}
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPasswd}
              onChange={(e) => handleChange('confirmPasswd', e.target.value)}
              error={errors.confirmPasswd}
              fullWidth
            />

            {/* 이름 */}
            <Input
              label="이름"
              type="text"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              fullWidth
            />

            {/* 이메일 */}
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              fullWidth
            />

            {/* 전화번호 */}
            <Input
              label="전화번호"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.tel}
              onChange={(e) => handleChange('tel', e.target.value)}
              error={errors.tel}
              helperText="숫자만 입력하시면 자동으로 하이픈이 추가됩니다"
              fullWidth
            />

            {/* 생년월일 */}
            <Input
              label="생년월일"
              type="date"
              value={formData.birth}
              onChange={(e) => handleChange('birth', e.target.value)}
              error={errors.birth}
              fullWidth
            />

            {/* 프로필 이미지 */}
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
                프로필 이미지 (선택)
              </label>
              {imagePreview ? (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      width: '120px',
                      height: '120px',
                      marginBottom: theme.spacing[2],
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="프로필 미리보기"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: theme.borderRadius.md,
                        border: `2px solid ${theme.colors.border.medium}`,
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    이미지 제거
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="profile-image"
                  />
                  <label htmlFor="profile-image">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        document.getElementById('profile-image')?.click()
                      }
                    >
                      이미지 선택
                    </Button>
                  </label>
                  {errors.image && (
                    <div
                      style={{
                        marginTop: theme.spacing[2],
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.semantic.error,
                      }}
                    >
                      {errors.image}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: theme.spacing[2],
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    JPG, PNG, GIF 형식, 최대 5MB
                  </div>
                </div>
              )}
            </div>

            {/* 성별 */}
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
                성별
              </label>
              <div style={{ display: 'flex', gap: theme.spacing[4] }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="sex"
                    value={1}
                    checked={formData.sex === 1}
                    onChange={(e) =>
                      handleChange('sex', parseInt(e.target.value))
                    }
                    style={{ marginRight: theme.spacing[2] }}
                  />
                  남성
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="sex"
                    value={2}
                    checked={formData.sex === 2}
                    onChange={(e) =>
                      handleChange('sex', parseInt(e.target.value))
                    }
                    style={{ marginRight: theme.spacing[2] }}
                  />
                  여성
                </label>
              </div>
            </div>

            {/* 역할 */}
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
                회원 유형
              </label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing[2],
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={User.role.MEMBER}
                    checked={formData.role === User.role.MEMBER}
                    onChange={(e) =>
                      handleChange('role', parseInt(e.target.value))
                    }
                    style={{ marginRight: theme.spacing[2] }}
                  />
                  일반 회원
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={User.role.TRAINER}
                    checked={formData.role === User.role.TRAINER}
                    onChange={(e) =>
                      handleChange('role', parseInt(e.target.value))
                    }
                    style={{ marginRight: theme.spacing[2] }}
                  />
                  트레이너
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={User.role.GYM_ADMIN}
                    checked={formData.role === User.role.GYM_ADMIN}
                    onChange={(e) =>
                      handleChange('role', parseInt(e.target.value))
                    }
                    style={{ marginRight: theme.spacing[2] }}
                  />
                  헬스장 관리자
                </label>
              </div>
            </div>

            {/* 주소 (선택) */}
            <Input
              label="주소 (선택)"
              type="text"
              placeholder="주소를 입력하세요"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              fullWidth
            />

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              style={{ marginTop: theme.spacing[4] }}
            >
              회원가입
            </Button>

            {/* 로그인 링크 */}
            <div style={{ textAlign: 'center', marginTop: theme.spacing[2] }}>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                이미 계정이 있으신가요?{' '}
              </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.brand.primary,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
