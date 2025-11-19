import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ComponentsDemo from './pages/ComponentsDemo';
import { theme } from './theme';

function App() {
  const navStyles: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(230, 232, 235, 0.8)',
    padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.sticky,
  };

  const navContentStyles: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    textDecoration: 'none',
  };

  const linkStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.md,
    transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
  };

  return (
    <BrowserRouter>
      <nav style={navStyles}>
        <div style={navContentStyles}>
          <Link to="/" style={logoStyles}>
            Linear Design System
          </Link>
          <div style={{ display: 'flex', gap: theme.spacing[2] }}>
            <Link
              to="/components"
              style={linkStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.colors.background.secondary;
                e.currentTarget.style.color = theme.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = theme.colors.text.secondary;
              }}
            >
              Components
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const containerStyles: React.CSSProperties = {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[8],
    background: theme.colors.background.wash,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['6xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.tight,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[8],
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: theme.typography.lineHeight.relaxed,
  };

  const linkButtonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    background: theme.colors.brand.primary,
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.md,
    textDecoration: 'none',
    transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
    boxShadow: theme.boxShadow.sm,
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Linear Design System</h1>
      <p style={subtitleStyles}>
        Linear.app에서 영감을 받은 모던하고 재사용 가능한 컴포넌트 라이브러리
      </p>
      <Link
        to="/components"
        style={linkButtonStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.brand.primaryHover;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = theme.boxShadow.md;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.colors.brand.primary;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = theme.boxShadow.sm;
        }}
      >
        컴포넌트 둘러보기
      </Link>
    </div>
  );
}

export default App;
