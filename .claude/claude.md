# Linear Design System - 프로젝트 컴포넌트 가이드

이 프로젝트는 **Linear Design System**을 기반으로 한 재사용 가능한 컴포넌트 라이브러리를 사용합니다.

## 🎨 디자인 시스템 원칙

모든 새로운 기능과 UI를 개발할 때는 **반드시** 아래 컴포넌트들을 사용해야 합니다.
- 일관된 디자인 유지
- 코드 재사용성 향상
- 유지보수 용이성
- 테마 중앙 관리

## 📦 사용 가능한 컴포넌트

### 1. Button
**위치**: `src/components/ui/Button.tsx`

다양한 스타일과 상태를 지원하는 버튼 컴포넌트입니다.

```tsx
import { Button } from '@/components/ui';

// 사용 예시
<Button variant="primary">Primary Button</Button>
<Button variant="secondary" size="lg">Large Secondary</Button>
<Button variant="danger" loading>Loading...</Button>
<Button variant="ghost" disabled>Disabled</Button>
<Button fullWidth>Full Width Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

---

### 2. Input
**위치**: `src/components/ui/Input.tsx`

폼 입력을 위한 컴포넌트로, 레이블, 에러 메시지, 헬퍼 텍스트를 지원합니다.

```tsx
import { Input } from '@/components/ui';

// 사용 예시
<Input
  label="이메일"
  placeholder="you@example.com"
  type="email"
/>

<Input
  label="비밀번호"
  type="password"
  error="비밀번호는 8자 이상이어야 합니다"
/>

<Input
  helperText="영문, 숫자 조합 8자 이상"
  inputSize="lg"
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `inputSize`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode
- 모든 HTML input 속성 지원

---

### 3. Card
**위치**: `src/components/ui/Card.tsx`

콘텐츠를 담는 카드 컨테이너 컴포넌트입니다.

```tsx
import { Card } from '@/components/ui';

// 사용 예시
<Card variant="default">
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</Card>

<Card variant="elevated" hoverable>
  호버 효과가 있는 카드
</Card>

// 이미지가 있는 카드
<Card padding="none" hoverable>
  <img src="image.jpg" alt="Card" />
  <div style={{ padding: '1.5rem' }}>
    <h3>제목</h3>
    <p>설명</p>
  </div>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'ghost'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `hoverable`: boolean
- `clickable`: boolean

---

### 4. Badge
**위치**: `src/components/ui/Badge.tsx`

상태나 카테고리를 표시하는 배지 컴포넌트입니다.

```tsx
import { Badge } from '@/components/ui';

// 사용 예시
<Badge variant="success">완료</Badge>
<Badge variant="warning">대기중</Badge>
<Badge variant="error">실패</Badge>
<Badge variant="info" dot>진행중</Badge>
```

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

---

### 5. Carousel
**위치**: `src/components/ui/Carousel.tsx`

이미지나 콘텐츠를 슬라이드 형태로 보여주는 캐러셀 컴포넌트입니다.

```tsx
import { Carousel } from '@/components/ui';

// 사용 예시
<Carousel autoPlay autoPlayInterval={3000}>
  <img src="slide1.jpg" />
  <img src="slide2.jpg" />
  <img src="slide3.jpg" />
</Carousel>

<Carousel showDots showArrows infinite>
  <div>Slide 1 Content</div>
  <div>Slide 2 Content</div>
</Carousel>
```

**Props:**
- `autoPlay`: boolean
- `autoPlayInterval`: number (기본값: 3000ms)
- `showDots`: boolean (기본값: true)
- `showArrows`: boolean (기본값: true)
- `infinite`: boolean (기본값: true)

---

### 6. Navbar
**위치**: `src/components/ui/Navbar.tsx`

반응형 네비게이션 바 컴포넌트입니다. 모바일에서는 햄버거 메뉴로 자동 전환됩니다.

```tsx
import { Navbar, Button } from '@/components/ui';

// 사용 예시
<Navbar
  logo={<span>MyApp</span>}
  leftItems={
    <>
      <Button variant="ghost" size="sm">기능</Button>
      <Button variant="ghost" size="sm">가격</Button>
    </>
  }
  rightItems={
    <>
      <Button variant="ghost" size="sm">로그인</Button>
      <Button variant="primary" size="sm">회원가입</Button>
    </>
  }
/>

// 투명 네비게이션
<Navbar
  logo={<span>Logo</span>}
  transparent
  bordered={false}
  sticky={false}
/>
```

**Props:**
- `logo`: React.ReactNode
- `leftItems`: React.ReactNode
- `rightItems`: React.ReactNode
- `sticky`: boolean (기본값: true)
- `transparent`: boolean
- `bordered`: boolean (기본값: true)

**특징:**
- 768px 이하에서 모바일 메뉴로 전환
- Sticky 포지셔닝 지원
- Backdrop blur 효과

---

### 7. Footer
**위치**: `src/components/ui/Footer.tsx`

페이지 하단 푸터 컴포넌트입니다.

```tsx
import { Footer } from '@/components/ui';

// 사용 예시
<Footer
  logo={<span>MyApp</span>}
  description="우리는 최고의 서비스를 제공합니다."
  columns={[
    {
      title: '제품',
      links: [
        { label: '기능', href: '/features' },
        { label: '가격', href: '/pricing' },
      ],
    },
    {
      title: '회사',
      links: [
        { label: '소개', href: '/about' },
        { label: '채용', href: '/careers' },
      ],
    },
  ]}
  copyright="© 2025 MyApp. All rights reserved."
  bottomLinks={
    <>
      <a href="/privacy">개인정보처리방침</a>
      <a href="/terms">이용약관</a>
    </>
  }
/>
```

**Props:**
- `logo`: React.ReactNode
- `description`: string
- `columns`: FooterColumn[]
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

---

### 8. Hero
**위치**: `src/components/ui/Hero.tsx`

랜딩 페이지나 주요 섹션의 히어로 영역 컴포넌트입니다.

```tsx
import { Hero, Button } from '@/components/ui';

// 사용 예시
<Hero
  title="우리 제품에 오신 것을 환영합니다"
  description="최고의 사용자 경험을 제공합니다"
  alignment="center"
  size="lg"
  actions={
    <>
      <Button variant="primary" size="lg">시작하기</Button>
      <Button variant="secondary" size="lg">더 알아보기</Button>
    </>
  }
/>

// 이미지가 있는 Hero
<Hero
  title="Modern Design System"
  description="빠르게 구축하세요"
  alignment="left"
  image={<img src="hero.jpg" />}
  actions={<Button>시작하기</Button>}
/>

// 배경과 오버레이
<Hero
  title="놀라운 것을 만드세요"
  background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  overlay
  size="xl"
  actions={<Button>무료로 시작하기</Button>}
/>
```

**Props:**
- `title`: string (필수)
- `subtitle`: string
- `description`: string
- `actions`: React.ReactNode
- `image`: React.ReactNode
- `alignment`: 'left' | 'center' (기본값: 'center')
- `size`: 'md' | 'lg' | 'xl' (기본값: 'lg')
- `background`: string
- `overlay`: boolean

---

## 🎨 테마 사용하기

모든 커스텀 스타일을 작성할 때는 테마 시스템을 사용하세요.

```tsx
import { theme } from '@/theme';

const customStyles = {
  color: theme.colors.text.primary,
  backgroundColor: theme.colors.background.secondary,
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.base,
  fontWeight: theme.typography.fontWeight.medium,
  boxShadow: theme.boxShadow.md,
  transition: `all ${theme.effects.transition.duration[200]} ${theme.effects.transition.timing.inOut}`,
};
```

### 테마 구조

```tsx
theme.colors.{category}.{variant}
theme.typography.{property}.{value}
theme.spacing[{size}]
theme.borderRadius.{size}
theme.boxShadow.{variant}
theme.effects.{type}.{value}
```

### 자주 사용하는 테마 값

**색상:**
- `theme.colors.brand.primary` - 주 브랜드 컬러
- `theme.colors.text.primary` - 주 텍스트 색상
- `theme.colors.background.primary` - 주 배경색
- `theme.colors.semantic.success` - 성공 색상
- `theme.colors.semantic.error` - 에러 색상

**간격:**
- `theme.spacing[2]` - 0.5rem (8px)
- `theme.spacing[4]` - 1rem (16px)
- `theme.spacing[6]` - 1.5rem (24px)
- `theme.spacing[8]` - 2rem (32px)

**타이포그래피:**
- `theme.typography.fontSize.sm` - 0.8125rem
- `theme.typography.fontSize.base` - 0.9375rem
- `theme.typography.fontSize.lg` - 1.125rem
- `theme.typography.fontWeight.medium` - 500
- `theme.typography.fontWeight.semibold` - 600

---

## 📋 개발 규칙

### ✅ DO (해야 할 것)

1. **항상 기존 컴포넌트를 먼저 확인하고 사용하세요**
   ```tsx
   // ✅ Good
   import { Button, Card } from '@/components/ui';

   <Card>
     <h3>제목</h3>
     <Button variant="primary">클릭</Button>
   </Card>
   ```

2. **테마 시스템을 사용하여 스타일을 정의하세요**
   ```tsx
   // ✅ Good
   import { theme } from '@/theme';

   const styles = {
     padding: theme.spacing[4],
     color: theme.colors.text.primary,
   };
   ```

3. **컴포넌트 조합을 활용하세요**
   ```tsx
   // ✅ Good
   <Card hoverable>
     <Badge variant="success">New</Badge>
     <h3>상품명</h3>
     <p>설명</p>
     <Button variant="primary">구매하기</Button>
   </Card>
   ```

### ❌ DON'T (하지 말아야 할 것)

1. **하드코딩된 색상/스타일 사용 금지**
   ```tsx
   // ❌ Bad
   <div style={{ color: '#5E6AD2', padding: '16px' }}>
     Content
   </div>

   // ✅ Good
   <div style={{
     color: theme.colors.brand.primary,
     padding: theme.spacing[4]
   }}>
     Content
   </div>
   ```

2. **중복 컴포넌트 생성 금지**
   ```tsx
   // ❌ Bad - 이미 Button 컴포넌트가 있음
   const MyButton = ({ children }) => (
     <button className="custom-button">{children}</button>
   );

   // ✅ Good
   import { Button } from '@/components/ui';
   <Button variant="primary">{children}</Button>
   ```

3. **인라인 스타일에 매직 넘버 사용 금지**
   ```tsx
   // ❌ Bad
   <div style={{ marginTop: '24px', fontSize: '14px' }}>
     Content
   </div>

   // ✅ Good
   <div style={{
     marginTop: theme.spacing[6],
     fontSize: theme.typography.fontSize.sm
   }}>
     Content
   </div>
   ```

---

## 🔧 컴포넌트 확장하기

기존 컴포넌트로 충분하지 않은 경우, 기존 컴포넌트를 **확장**하세요.

```tsx
// ✅ Good - 기존 Button을 확장
import { Button, ButtonProps } from '@/components/ui';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

const IconButton = ({ icon, children, ...props }: IconButtonProps) => {
  return (
    <Button leftIcon={icon} {...props}>
      {children}
    </Button>
  );
};

// 사용
<IconButton icon={<SearchIcon />} variant="primary">
  검색
</IconButton>
```

---

## 📚 추가 참고 자료

- **컴포넌트 데모**: `/components` 페이지에서 모든 컴포넌트 확인
- **테마 파일**: `src/theme/theme.ts`
- **컴포넌트 소스**: `src/components/ui/`
- **전역 스타일**: `src/index.css`

---

## 🎯 빠른 참조

### 버튼이 필요할 때
```tsx
import { Button } from '@/components/ui';
<Button variant="primary">클릭</Button>
```

### 입력 필드가 필요할 때
```tsx
import { Input } from '@/components/ui';
<Input label="이름" placeholder="홍길동" />
```

### 카드 레이아웃이 필요할 때
```tsx
import { Card } from '@/components/ui';
<Card>콘텐츠</Card>
```

### 상태 표시가 필요할 때
```tsx
import { Badge } from '@/components/ui';
<Badge variant="success">완료</Badge>
```

### 슬라이더가 필요할 때
```tsx
import { Carousel } from '@/components/ui';
<Carousel autoPlay>{slides}</Carousel>
```

### 네비게이션이 필요할 때
```tsx
import { Navbar } from '@/components/ui';
<Navbar logo={...} leftItems={...} rightItems={...} />
```

### 푸터가 필요할 때
```tsx
import { Footer } from '@/components/ui';
<Footer columns={...} copyright="..." />
```

### 히어로 섹션이 필요할 때
```tsx
import { Hero } from '@/components/ui';
<Hero title="..." description="..." actions={...} />
```

---

**중요**: 새로운 UI를 개발할 때는 항상 이 컴포넌트들을 먼저 검토하고 사용하세요.
일관된 디자인과 코드 품질을 유지하는 것이 프로젝트 성공의 핵심입니다.
