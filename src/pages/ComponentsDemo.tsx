import { useState } from 'react';
import { Button, Input, Card, Badge, Carousel, Navbar, Footer, Hero } from '../components/ui';
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

        {/* Image Cards */}
        <h3 style={{ ...sectionTitleStyles, fontSize: theme.typography.fontSize.xl, marginTop: theme.spacing[8], marginBottom: theme.spacing[6] }}>
          Image Cards
        </h3>
        <div style={gridStyles}>
          <Card padding="none" hoverable>
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderTopLeftRadius: theme.borderRadius.xl,
              borderTopRightRadius: theme.borderRadius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.semibold,
            }}>
              Image
            </div>
            <div style={{ padding: theme.spacing[6] }}>
              <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
                Card with Image
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed, marginBottom: theme.spacing[4] }}>
                Cards can include images at the top with content below.
              </p>
              <Button size="sm" variant="primary">Learn More</Button>
            </div>
          </Card>

          <Card padding="none" hoverable>
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderTopLeftRadius: theme.borderRadius.xl,
              borderTopRightRadius: theme.borderRadius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.semibold,
            }}>
              Image
            </div>
            <div style={{ padding: theme.spacing[6] }}>
              <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[2] }}>
                <Badge variant="success">Featured</Badge>
                <Badge variant="info">New</Badge>
              </div>
              <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
                Product Card
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed, marginBottom: theme.spacing[4] }}>
                Perfect for showcasing products with images and badges.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>
                  $99
                </span>
                <Button size="sm" variant="secondary">Add to Cart</Button>
              </div>
            </div>
          </Card>

          <Card padding="none" clickable>
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderTopLeftRadius: theme.borderRadius.xl,
              borderTopRightRadius: theme.borderRadius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.semibold,
            }}>
              Image
            </div>
            <div style={{ padding: theme.spacing[6] }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3], marginBottom: theme.spacing[3] }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: theme.borderRadius.full,
                  background: theme.colors.background.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.secondary,
                }}>
                  JD
                </div>
                <div>
                  <h4 style={{ fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text.primary }}>
                    John Doe
                  </h4>
                  <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
                    2 hours ago
                  </p>
                </div>
              </div>
              <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[2] }}>
                Blog Post Card
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
                Ideal for blog posts with author information and timestamps.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Carousel Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Carousel</h2>
        <p style={sectionDescStyles}>
          이미지나 콘텐츠를 슬라이드 형태로 보여주는 캐러셀 컴포넌트입니다.
        </p>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Auto-play Carousel
          </h3>
          <Carousel autoPlay autoPlayInterval={3000}>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              Slide 1
            </div>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              Slide 2
            </div>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              Slide 3
            </div>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              Slide 4
            </div>
          </Carousel>
          <div style={codeBoxStyles}>
            {'<Carousel autoPlay autoPlayInterval={3000}>...</Carousel>'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Content Carousel with Cards
          </h3>
          <Carousel showDots showArrows>
            <div style={{ padding: theme.spacing[8], background: theme.colors.background.secondary }}>
              <Card variant="elevated" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Badge variant="info" style={{ marginBottom: theme.spacing[3] }}>Feature 1</Badge>
                <h3 style={{ fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[4], color: theme.colors.text.primary }}>
                  Amazing Feature
                </h3>
                <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
                  This is the first feature of our product. It provides incredible value and helps you achieve your goals faster.
                </p>
              </Card>
            </div>
            <div style={{ padding: theme.spacing[8], background: theme.colors.background.secondary }}>
              <Card variant="elevated" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Badge variant="success" style={{ marginBottom: theme.spacing[3] }}>Feature 2</Badge>
                <h3 style={{ fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[4], color: theme.colors.text.primary }}>
                  Powerful Integration
                </h3>
                <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
                  Seamlessly integrate with your existing tools and workflows. Save time and boost productivity.
                </p>
              </Card>
            </div>
            <div style={{ padding: theme.spacing[8], background: theme.colors.background.secondary }}>
              <Card variant="elevated" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Badge variant="warning" style={{ marginBottom: theme.spacing[3] }}>Feature 3</Badge>
                <h3 style={{ fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[4], color: theme.colors.text.primary }}>
                  Real-time Analytics
                </h3>
                <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
                  Track your performance with real-time analytics and insights. Make data-driven decisions.
                </p>
              </Card>
            </div>
          </Carousel>
          <div style={codeBoxStyles}>
            {'<Carousel showDots showArrows>...</Carousel>'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Carousel Options
          </h3>
          <div style={demoBoxStyles}>
            <div style={demoContentStyles}>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, lineHeight: theme.typography.lineHeight.relaxed }}>
                <p style={{ marginBottom: theme.spacing[2] }}><strong>autoPlay</strong>: Enable automatic slide transitions</p>
                <p style={{ marginBottom: theme.spacing[2] }}><strong>autoPlayInterval</strong>: Time between slides in milliseconds (default: 3000)</p>
                <p style={{ marginBottom: theme.spacing[2] }}><strong>showDots</strong>: Show navigation dots (default: true)</p>
                <p style={{ marginBottom: theme.spacing[2] }}><strong>showArrows</strong>: Show navigation arrows (default: true)</p>
                <p><strong>infinite</strong>: Enable infinite loop (default: true)</p>
              </div>
            </div>
          </div>
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

      {/* Hero Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Hero</h2>
        <p style={sectionDescStyles}>
          페이지 상단에 사용되는 히어로 섹션 컴포넌트입니다.
        </p>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Center Aligned Hero
          </h3>
          <Hero
            subtitle="NEW FEATURE"
            title="Build amazing products with Linear Design System"
            description="A modern, reusable component library inspired by Linear.app. Create beautiful user interfaces with ease."
            alignment="center"
            size="lg"
            actions={
              <>
                <Button variant="primary" size="lg">Get Started</Button>
                <Button variant="secondary" size="lg">Learn More</Button>
              </>
            }
          />
          <div style={codeBoxStyles}>
            {'<Hero title="..." description="..." actions={<Button>...</Button>} />'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Left Aligned Hero with Image
          </h3>
          <Hero
            subtitle="WELCOME"
            title="Modern Design System"
            description="Build faster with pre-built components that follow best practices."
            alignment="left"
            size="md"
            actions={
              <>
                <Button variant="primary">Start Building</Button>
                <Button variant="ghost">View Docs</Button>
              </>
            }
            image={
              <div style={{
                width: '100%',
                height: '400px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: theme.borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
              }}>
                Hero Image
              </div>
            }
          />
          <div style={codeBoxStyles}>
            {'<Hero alignment="left" image={<img src="..." />} />'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Hero with Background & Overlay
          </h3>
          <Hero
            title="Create Something Amazing"
            description="Join thousands of developers building the future with our design system"
            alignment="center"
            size="xl"
            background="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            overlay
            actions={
              <>
                <Button variant="primary" size="lg">Get Started Free</Button>
                <Button variant="ghost" size="lg" style={{ color: 'white', borderColor: 'white' }}>Watch Demo</Button>
              </>
            }
          />
          <div style={codeBoxStyles}>
            {'<Hero background="..." overlay actions={...} />'}
          </div>
        </div>
      </section>

      {/* Navbar Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Navbar</h2>
        <p style={sectionDescStyles}>
          반응형 네비게이션 바 컴포넌트입니다.
        </p>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Basic Navbar
          </h3>
          <Card padding="none">
            <Navbar
              logo={<span style={{ fontWeight: theme.typography.fontWeight.bold }}>Logo</span>}
              leftItems={
                <>
                  <Button variant="ghost" size="sm">Features</Button>
                  <Button variant="ghost" size="sm">Pricing</Button>
                  <Button variant="ghost" size="sm">About</Button>
                </>
              }
              rightItems={
                <>
                  <Button variant="ghost" size="sm">Sign In</Button>
                  <Button variant="primary" size="sm">Sign Up</Button>
                </>
              }
            />
          </Card>
          <div style={codeBoxStyles}>
            {'<Navbar logo={...} leftItems={...} rightItems={...} />'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Transparent Navbar
          </h3>
          <Card padding="none" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '200px' }}>
            <Navbar
              logo={<span style={{ fontWeight: theme.typography.fontWeight.bold, color: 'white' }}>Logo</span>}
              leftItems={
                <>
                  <Button variant="ghost" size="sm" style={{ color: 'white' }}>Home</Button>
                  <Button variant="ghost" size="sm" style={{ color: 'white' }}>Products</Button>
                  <Button variant="ghost" size="sm" style={{ color: 'white' }}>Contact</Button>
                </>
              }
              rightItems={
                <Button variant="secondary" size="sm">Get Started</Button>
              }
              transparent
              bordered={false}
              sticky={false}
            />
            <div style={{ padding: theme.spacing[12], color: 'white', textAlign: 'center' }}>
              <h2 style={{ fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold }}>
                Content Below Navbar
              </h2>
            </div>
          </Card>
          <div style={codeBoxStyles}>
            {'<Navbar transparent bordered={false} />'}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Footer</h2>
        <p style={sectionDescStyles}>
          페이지 하단에 사용되는 푸터 컴포넌트입니다.
        </p>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Complete Footer
          </h3>
          <Card padding="none">
            <Footer
              logo={<span style={{ fontWeight: theme.typography.fontWeight.bold, fontSize: theme.typography.fontSize.xl }}>Logo</span>}
              description="Building the future of design systems with modern, reusable components."
              columns={[
                {
                  title: 'Product',
                  links: [
                    { label: 'Features', href: '#' },
                    { label: 'Pricing', href: '#' },
                    { label: 'Security', href: '#' },
                    { label: 'Roadmap', href: '#' },
                  ],
                },
                {
                  title: 'Company',
                  links: [
                    { label: 'About', href: '#' },
                    { label: 'Blog', href: '#' },
                    { label: 'Careers', href: '#' },
                    { label: 'Contact', href: '#' },
                  ],
                },
                {
                  title: 'Resources',
                  links: [
                    { label: 'Documentation', href: '#' },
                    { label: 'Help Center', href: '#' },
                    { label: 'Community', href: '#' },
                    { label: 'Updates', href: '#' },
                  ],
                },
              ]}
              socialLinks={
                <div style={{ display: 'flex', gap: theme.spacing[3] }}>
                  <Button variant="ghost" size="sm">Twitter</Button>
                  <Button variant="ghost" size="sm">GitHub</Button>
                  <Button variant="ghost" size="sm">LinkedIn</Button>
                </div>
              }
              copyright="© 2025 Linear Design System. All rights reserved."
              bottomLinks={
                <>
                  <a href="#" style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="#" style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, textDecoration: 'none' }}>Terms of Service</a>
                  <a href="#" style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, textDecoration: 'none' }}>Cookie Policy</a>
                </>
              }
            />
          </Card>
          <div style={codeBoxStyles}>
            {'<Footer logo={...} columns={...} copyright="..." />'}
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing[8] }}>
          <h3 style={{ ...demoTitleStyles, marginBottom: theme.spacing[4] }}>
            Simple Footer
          </h3>
          <Card padding="none">
            <Footer
              copyright="© 2025 Your Company. All rights reserved."
              bottomLinks={
                <>
                  <a href="#" style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, textDecoration: 'none' }}>Privacy</a>
                  <a href="#" style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, textDecoration: 'none' }}>Terms</a>
                </>
              }
            />
          </Card>
          <div style={codeBoxStyles}>
            {'<Footer copyright="..." bottomLinks={...} />'}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentsDemo;
