import { useState } from 'react';
import { Button, Input, Card, Badge } from '../components/ui';
import { theme } from '../theme';

const ComponentsDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: theme.colors.background.wash,
    padding: theme.spacing[8],
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: theme.spacing[12],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
    lineHeight: theme.typography.lineHeight.tight,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: theme.spacing[16],
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  };

  const sectionDescStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[6],
    lineHeight: theme.typography.lineHeight.relaxed,
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const demoBoxStyles: React.CSSProperties = {
    padding: theme.spacing[6],
    background: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    border: `1px solid ${theme.colors.border.light}`,
  };

  const demoTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  };

  const demoContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
    alignItems: 'center',
  };

  const codeBoxStyles: React.CSSProperties = {
    background: theme.colors.background.secondary,
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    overflowX: 'auto',
    marginTop: theme.spacing[2],
  };

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={titleStyles}>Linear Design System</h1>
        <p style={subtitleStyles}>
          재사용 가능한 컴포넌트 라이브러리 - Linear.app 디자인 시스템 기반
        </p>
      </header>

      {/* Buttons Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Buttons</h2>
        <p style={sectionDescStyles}>
          다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.
        </p>

        <div style={gridStyles}>
          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Variants</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div style={codeBoxStyles}>
                {'<Button variant="primary">Primary</Button>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Sizes</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div style={codeBoxStyles}>
                {'<Button size="md">Medium</Button>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>States</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Button disabled>Disabled</Button>
                <Button loading={loading} onClick={handleLoadingDemo}>
                  {loading ? 'Loading...' : 'Click me'}
                </Button>
              </div>
              <div style={codeBoxStyles}>
                {'<Button loading={true}>Loading...</Button>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Full Width</h3>
            <div style={demoContentStyles}>
              <Button fullWidth variant="primary">
                Full Width Button
              </Button>
              <div style={codeBoxStyles}>
                {'<Button fullWidth>Full Width</Button>'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Inputs</h2>
        <p style={sectionDescStyles}>
          레이블, 에러 메시지, 아이콘 등을 지원하는 입력 컴포넌트입니다.
        </p>

        <div style={gridStyles}>
          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Basic Input</h3>
            <div style={demoContentStyles}>
              <Input
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div style={codeBoxStyles}>
                {'<Input placeholder="Enter your email" />'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>With Label</h3>
            <div style={demoContentStyles}>
              <Input
                label="Email Address"
                placeholder="you@example.com"
                type="email"
              />
              <div style={codeBoxStyles}>
                {'<Input label="Email" placeholder="you@example.com" />'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>With Helper Text</h3>
            <div style={demoContentStyles}>
              <Input
                label="Username"
                placeholder="johndoe"
                helperText="Choose a unique username"
              />
              <div style={codeBoxStyles}>
                {'<Input helperText="Choose a unique username" />'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Error State</h3>
            <div style={demoContentStyles}>
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
              <div style={codeBoxStyles}>
                {'<Input error="Password must be at least 8 characters" />'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Sizes</h3>
            <div style={demoContentStyles}>
              <Input inputSize="sm" placeholder="Small" />
              <Input inputSize="md" placeholder="Medium" />
              <Input inputSize="lg" placeholder="Large" />
              <div style={codeBoxStyles}>
                {'<Input inputSize="md" />'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Disabled</h3>
            <div style={demoContentStyles}>
              <Input
                label="Disabled Input"
                placeholder="Cannot edit"
                disabled
                value="Disabled value"
              />
              <div style={codeBoxStyles}>
                {'<Input disabled />'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Cards</h2>
        <p style={sectionDescStyles}>
          다양한 스타일과 인터랙션을 지원하는 카드 컴포넌트입니다.
        </p>

        <div style={gridStyles}>
          <Card variant="default">
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Default Card
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              This is a default card with border and subtle shadow.
            </p>
            <div style={codeBoxStyles}>
              {'<Card variant="default">...</Card>'}
            </div>
          </Card>

          <Card variant="elevated">
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Elevated Card
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              This card has a stronger shadow for emphasis.
            </p>
            <div style={codeBoxStyles}>
              {'<Card variant="elevated">...</Card>'}
            </div>
          </Card>

          <Card variant="outlined">
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Outlined Card
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              A simple outlined card without shadow.
            </p>
            <div style={codeBoxStyles}>
              {'<Card variant="outlined">...</Card>'}
            </div>
          </Card>

          <Card variant="default" hoverable>
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Hoverable Card
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              Hover over this card to see the lift effect.
            </p>
            <div style={codeBoxStyles}>
              {'<Card hoverable>...</Card>'}
            </div>
          </Card>

          <Card variant="default" clickable onClick={() => alert('Card clicked!')}>
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Clickable Card
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              Click this card to trigger an action.
            </p>
            <div style={codeBoxStyles}>
              {'<Card clickable onClick={...}>...</Card>'}
            </div>
          </Card>

          <Card padding="lg">
            <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
              Custom Padding
            </h3>
            <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
              This card uses large padding (lg).
            </p>
            <div style={codeBoxStyles}>
              {'<Card padding="lg">...</Card>'}
            </div>
          </Card>
        </div>
      </section>

      {/* Badges Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Badges</h2>
        <p style={sectionDescStyles}>
          상태나 카테고리를 표시하는 배지 컴포넌트입니다.
        </p>

        <div style={gridStyles}>
          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Variants</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <div style={codeBoxStyles}>
                {'<Badge variant="success">Success</Badge>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Sizes</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Badge size="sm" variant="info">Small</Badge>
                <Badge size="md" variant="info">Medium</Badge>
                <Badge size="lg" variant="info">Large</Badge>
              </div>
              <div style={codeBoxStyles}>
                {'<Badge size="md">Medium</Badge>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>With Dot</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="error" dot>Failed</Badge>
                <Badge variant="info" dot>In Progress</Badge>
              </div>
              <div style={codeBoxStyles}>
                {'<Badge variant="success" dot>Active</Badge>'}
              </div>
            </div>
          </div>

          <div style={demoBoxStyles}>
            <h3 style={demoTitleStyles}>Use Cases</h3>
            <div style={demoContentStyles}>
              <div style={rowStyles}>
                <Badge variant="success">Completed</Badge>
                <Badge variant="warning">Draft</Badge>
                <Badge variant="error">Urgent</Badge>
                <Badge variant="default">New</Badge>
              </div>
              <div style={codeBoxStyles}>
                {'<Badge variant="default">New</Badge>'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Colors Preview */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Theme Colors</h2>
        <p style={sectionDescStyles}>
          디자인 시스템의 컬러 팔레트입니다.
        </p>

        <Card>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Brand Colors
          </h3>
          <div style={{ display: 'flex', gap: theme.spacing[3], flexWrap: 'wrap' }}>
            {Object.entries(theme.colors.brand).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: value,
                    borderRadius: theme.borderRadius.md,
                    marginBottom: theme.spacing[2],
                    border: `1px solid ${theme.colors.border.light}`,
                  }}
                />
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  {key}
                </div>
                <div style={{ fontSize: theme.typography.fontSize.xs, fontFamily: theme.typography.fontFamily.mono, color: theme.colors.text.tertiary }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ ...demoTitleStyles, marginTop: theme.spacing[8], marginBottom: theme.spacing[4] }}>
            Semantic Colors
          </h3>
          <div style={{ display: 'flex', gap: theme.spacing[3], flexWrap: 'wrap' }}>
            {Object.entries(theme.colors.semantic).filter(([key]) => !key.includes('Subtle')).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: value,
                    borderRadius: theme.borderRadius.md,
                    marginBottom: theme.spacing[2],
                    border: `1px solid ${theme.colors.border.light}`,
                  }}
                />
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  {key}
                </div>
                <div style={{ fontSize: theme.typography.fontSize.xs, fontFamily: theme.typography.fontFamily.mono, color: theme.colors.text.tertiary }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ComponentsDemo;
