import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { Button, Input, Card } from '../../components/ui';
import { authService } from '../../services/auth.service';
import { userAtom, isAuthenticatedAtom, tokenAtom } from '../../store/auth';
import { theme } from '../../theme';

const LoginPage = () => {
  const setUser = useSetAtom(userAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setToken = useSetAtom(tokenAtom);

  const [loginid, setLoginid] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginid || !passwd) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({ loginid, passwd });

      // Update global state
      setUser(response.user);
      setIsAuthenticated(true);
      setToken(response.token);

      console.log('Login successful:', response.user.role);

      // Redirect based on user role using window.location to ensure state is fresh
      switch (response.user.role) {
        case 1:
        case 2:
          window.location.href = '/admin/dashboard';
          break;
        case 3:
          window.location.href = '/admin/dashboard';
          break;
        case 4:
          window.location.href = '/admin/dashboard';
          break;
        case 5:
          window.location.href = '/admin/dashboard';
          break;
        default:
        // window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
      setLoading(false);
    }
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-bg-wash)',
    padding: theme.spacing[6],
  };

  const cardContainerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
  };

  const logoStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: 'var(--color-text-primary)',
    marginBottom: theme.spacing[2],
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    color: 'var(--color-text-secondary)',
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
  };

  const errorStyles: React.CSSProperties = {
    padding: theme.spacing[3],
    background: 'var(--color-error-subtle)',
    color: 'var(--color-error)',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    textAlign: 'center',
  };

  const linkContainerStyles: React.CSSProperties = {
    marginTop: theme.spacing[4],
    textAlign: 'center',
    fontSize: theme.typography.fontSize.sm,
    color: 'var(--color-text-secondary)',
  };

  const linkStyles: React.CSSProperties = {
    color: 'var(--color-brand-primary)',
    textDecoration: 'none',
    marginLeft: theme.spacing[1],
  };

  return (
    <div style={containerStyles}>
      <div style={cardContainerStyles}>
        <div style={logoStyles}>
          <h1 style={titleStyles}>GYM 플랫폼</h1>
          <p style={subtitleStyles}>통합 헬스장 관리 시스템</p>
        </div>

        <Card variant="elevated">
          <form style={formStyles} onSubmit={handleSubmit}>
            <Input
              label="아이디"
              type="text"
              placeholder="아이디를 입력하세요"
              value={loginid}
              onChange={(e) => setLoginid(e.target.value)}
              fullWidth
              disabled={loading}
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              fullWidth
              disabled={loading}
            />

            {error && <div style={errorStyles}>{error}</div>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              로그인
            </Button>
          </form>

          <div style={linkContainerStyles}>
            계정이 없으신가요?
            <a href="/signup" style={linkStyles}>
              회원가입
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
