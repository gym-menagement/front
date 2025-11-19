# Linear Design System Components

Linear.app에서 영감을 받은 재사용 가능한 컴포넌트 라이브러리입니다.

## 프로젝트 구조

```
src/
├── theme/              # 테마 설정 및 디자인 시스템 상수
│   ├── theme.ts       # 테마 정의 (색상, 타이포그래피, 간격 등)
│   └── index.ts       # 테마 export
├── components/
│   └── ui/            # 재사용 가능한 UI 컴포넌트
│       ├── Button.tsx   # 버튼 컴포넌트
│       ├── Input.tsx    # 입력 컴포넌트
│       ├── Card.tsx     # 카드 컴포넌트
│       ├── Badge.tsx    # 배지 컴포넌트
│       ├── Carousel.tsx # 캐러셀 컴포넌트
│       ├── Navbar.tsx   # 네비게이션 바 컴포넌트
│       ├── Footer.tsx   # 푸터 컴포넌트
│       ├── Hero.tsx     # 히어로 섹션 컴포넌트
│       └── index.ts     # 컴포넌트 export
├── pages/
│   └── ComponentsDemo.tsx  # 컴포넌트 데모 페이지
├── index.css          # 전역 스타일 및 CSS 변수
└── App.tsx            # 라우터 설정
```

## 사용 가능한 컴포넌트

### Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트

```tsx
import { Button } from './components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// Other props
<Button fullWidth>Full Width</Button>
<Button leftIcon={<Icon />}>With Icon</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

### Input

레이블, 에러 메시지, 아이콘 등을 지원하는 입력 컴포넌트

```tsx
import { Input } from './components/ui';

// Basic
<Input placeholder="Enter text" />

// With label
<Input label="Email" placeholder="you@example.com" />

// With helper text
<Input helperText="Choose a unique username" />

// Error state
<Input error="This field is required" />

// Sizes
<Input inputSize="sm" />
<Input inputSize="md" />
<Input inputSize="lg" />

// With icons
<Input leftIcon={<Icon />} />
<Input rightIcon={<Icon />} />
```

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- `inputSize`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode
- 모든 HTML input 속성 지원

### Card

다양한 스타일과 인터랙션을 지원하는 카드 컴포넌트

```tsx
import { Card } from './components/ui';

// Variants
<Card variant="default">Content</Card>
<Card variant="elevated">Content</Card>
<Card variant="outlined">Content</Card>
<Card variant="ghost">Content</Card>

// Padding
<Card padding="sm">Content</Card>
<Card padding="md">Content</Card>
<Card padding="lg">Content</Card>

// Interactive
<Card hoverable>Hoverable Card</Card>
<Card clickable onClick={handleClick}>Clickable Card</Card>

// With Image
<Card padding="none" hoverable>
  <img src="image.jpg" alt="Card image" />
  <div style={{ padding: '1.5rem' }}>
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</Card>
```

**Props:**

- `variant`: 'default' | 'elevated' | 'outlined' | 'ghost'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `hoverable`: boolean
- `clickable`: boolean

### Carousel

이미지나 콘텐츠를 슬라이드 형태로 보여주는 캐러셀 컴포넌트

```tsx
import { Carousel } from './components/ui';

// Basic Carousel
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>

// Auto-play
<Carousel autoPlay autoPlayInterval={3000}>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>

// Custom options
<Carousel
  showDots={true}
  showArrows={true}
  infinite={true}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>
```

**Props:**

- `autoPlay`: boolean - 자동 슬라이드 전환
- `autoPlayInterval`: number - 슬라이드 전환 간격(ms) (기본값: 3000)
- `showDots`: boolean - 네비게이션 점 표시 (기본값: true)
- `showArrows`: boolean - 네비게이션 화살표 표시 (기본값: true)
- `infinite`: boolean - 무한 루프 활성화 (기본값: true)

### Badge

상태나 카테고리를 표시하는 배지 컴포넌트

```tsx
import { Badge } from './components/ui';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With dot
<Badge dot variant="success">Active</Badge>
```

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

### Hero
페이지 상단에 사용되는 히어로 섹션 컴포넌트

```tsx
import { Hero } from './components/ui';

// Center aligned
<Hero
  title="Welcome to Our Product"
  description="Build amazing things with our platform"
  alignment="center"
  actions={<Button>Get Started</Button>}
/>

// With image
<Hero
  title="Modern Design System"
  description="Build faster with pre-built components"
  alignment="left"
  image={<img src="hero.jpg" />}
  actions={
    <>
      <Button variant="primary">Start Building</Button>
      <Button variant="ghost">Learn More</Button>
    </>
  }
/>

// With background overlay
<Hero
  title="Create Something Amazing"
  background="url(bg.jpg)"
  overlay
  size="xl"
  actions={<Button>Get Started Free</Button>}
/>
```

**Props:**
- `title`: string (required)
- `subtitle`: string
- `description`: string
- `actions`: React.ReactNode
- `image`: React.ReactNode
- `alignment`: 'left' | 'center' (기본값: 'center')
- `size`: 'md' | 'lg' | 'xl' (기본값: 'lg')
- `background`: string - CSS background 값
- `overlay`: boolean - 배경에 어두운 오버레이 추가

### Navbar
반응형 네비게이션 바 컴포넌트

```tsx
import { Navbar } from './components/ui';

// Basic navbar
<Navbar
  logo={<span>Logo</span>}
  leftItems={
    <>
      <Button variant="ghost">Features</Button>
      <Button variant="ghost">Pricing</Button>
    </>
  }
  rightItems={
    <>
      <Button variant="ghost">Sign In</Button>
      <Button variant="primary">Sign Up</Button>
    </>
  }
/>

// Transparent navbar
<Navbar
  logo={<span>Logo</span>}
  leftItems={...}
  rightItems={...}
  transparent
  bordered={false}
/>
```

**Props:**
- `logo`: React.ReactNode
- `leftItems`: React.ReactNode
- `rightItems`: React.ReactNode
- `sticky`: boolean - 스크롤 시 상단 고정 (기본값: true)
- `transparent`: boolean - 투명 배경
- `bordered`: boolean - 하단 테두리 (기본값: true)

**특징:**
- 모바일 반응형 (768px 이하에서 햄버거 메뉴)
- Sticky 포지셔닝 지원
- Backdrop blur 효과

### Footer
페이지 하단에 사용되는 푸터 컴포넌트

```tsx
import { Footer } from './components/ui';

// Complete footer
<Footer
  logo={<span>Logo</span>}
  description="Building the future of design systems"
  columns={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
  ]}
  socialLinks={<div>Social icons...</div>}
  copyright="© 2025 Company Name"
  bottomLinks={
    <>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </>
  }
/>

// Simple footer
<Footer
  copyright="© 2025 Company"
  bottomLinks={<a href="#">Privacy</a>}
/>
```

**Props:**
- `logo`: React.ReactNode
- `description`: string
- `columns`: FooterColumn[] - 링크 컬럼 배열
- `socialLinks`: React.ReactNode
- `copyright`: string
- `bottomLinks`: React.ReactNode

**FooterColumn 타입:**
```tsx
interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
```

## 테마 사용하기

테마는 중앙화된 디자인 시스템으로 관리됩니다.

```tsx
import { theme } from './theme';

// 스타일 객체에서 사용
const customStyles = {
  color: theme.colors.text.primary,
  backgroundColor: theme.colors.background.secondary,
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.base,
};

// CSS 변수로도 사용 가능 (index.css)
const styles = {
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-bg-secondary)',
};
```

## 개발 서버 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

개발 서버가 시작되면 `http://localhost:5173/components`에서 모든 컴포넌트를 확인할 수 있습니다.

## 주요 특징

1. **일반화와 중앙화**: 모든 디자인 토큰이 `theme.ts`에 중앙화되어 있어 일관성 유지가 쉽습니다.
2. **타입 안정성**: TypeScript로 작성되어 모든 props에 대한 타입 체크가 가능합니다.
3. **재사용성**: 컴포넌트들이 독립적으로 설계되어 프로젝트 전반에서 재사용 가능합니다.
4. **접근성**: focus 상태, disabled 상태 등 접근성을 고려한 설계입니다.
5. **인터랙티브**: hover, active, focus 등 다양한 인터랙션 상태를 지원합니다.

## 컴포넌트 확장하기

새로운 컴포넌트를 추가하려면:

1. `src/components/ui/`에 새 컴포넌트 파일 생성
2. `theme.ts`의 디자인 토큰 사용
3. `src/components/ui/index.ts`에 export 추가
4. `src/pages/ComponentsDemo.tsx`에 데모 섹션 추가

## CSS 변수

전역 CSS 변수는 `index.css`에 정의되어 있으며, 테마와 동기화되어 있습니다. 이를 통해 CSS 파일에서도 디자인 시스템을 사용할 수 있습니다.
