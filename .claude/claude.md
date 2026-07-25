# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev              # Start dev server (port 9004)
npm run build            # TypeScript check + Vite build
npm run lint             # ESLint check
npm run preview          # Preview production build
```

E2E 테스트는 없다. Playwright 설정과 테스트는 이전에 삭제됐고, 남아 있던
스크립트·의존성·빈 워크플로우 파일도 정리했다. 다시 도입하려면 설정부터
새로 만들어야 한다.

## Architecture Overview

Multi-tenant gym management platform (React 19 + TypeScript + Vite).

### Tech Stack
- **State**: Jotai atoms (`src/store/`) - `userAtom`, `selectedGymIdAtom`, etc.
- **API**: Axios with JWT interceptors (`src/services/api.ts`)
- **Styling**: Tailwind CSS + Linear Design System theme (`src/theme/`)
- **Routing**: React Router with role-based protection (`App.tsx`)

### Directory Structure
```
src/
├── models/       # API layer - CRUD operations for all entities
├── types/        # TypeScript interfaces (mirrors backend schema)
├── store/        # Jotai atoms (auth.ts, gym.ts)
├── services/     # api.ts (axios), auth.service.ts
├── components/ui/# Design system components (Button, Card, Input, etc.)
├── pages/        # Route pages by role (admin/, member/, auth/)
└── theme/        # Theme tokens and CSS variables
```

### Model Pattern
All models in `src/models/` follow this CRUD pattern:
```typescript
Model.insert(item)      // POST /endpoint
Model.update(id, item)  // PUT /endpoint/:id
Model.patch(id, item)   // PATCH /endpoint/:id
Model.remove(id)        // DELETE /endpoint/:id
Model.find(params)      // GET /endpoint (returns array)
Model.findall(params)   // GET /endpoint (page=0, pagesize=9999)
Model.findpage(params)  // GET /endpoint (returns paginated response)
Model.get(id)           // GET /endpoint/:id
```

### API Response Types
```typescript
interface ApiResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

interface ApiSingleResponse<T> {
  item: T;
}
```

### User Roles
```typescript
UserModel.role.MEMBER         // 1 - 회원
UserModel.role.TRAINER        // 2 - 트레이너
UserModel.role.STAFF          // 3 - 직원
UserModel.role.GYM_ADMIN      // 4 - 헬스장관리자
UserModel.role.PLATFORM_ADMIN // 5 - 플랫폼관리자
```

### LocalStorage Keys
- `gym_token` - JWT token
- `gym_user` - Serialized User object
- `theme-mode` - 'light' | 'dark'

---

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

---

# 🏢 Business Process & Platform Flow

이 프로젝트는 **다중 헬스장 플랫폼**으로, 여러 헬스장이 하나의 시스템에서 독립적으로 운영되며, 회원들은 하나의 통합 앱을 통해 모든 헬스장에 접근할 수 있습니다.

## 1. 플랫폼 관리자 (Platform Admin)

### 초기 설정:
```
플랫폼 구축 → 시스템 관리자 계정 생성 (user_tb, role: ADMIN)
→ 기본 설정 (할인 정책, 앱 버전 관리)
→ IP 보안 정책 설정 (ipblock_tb)
```

### 헬스장 온보딩:
```
헬스장 사업 문의 → 계약 체결
→ 헬스장 정보 등록 (gym_tb)
→ 헬스장 관리자 계정 생성 (user_tb, role: GYM_ADMIN)
→ 초기 데이터 설정 지원
```

### 운영 관리:
- 모든 헬스장 모니터링 (매출, 회원 수, 이용 현황)
- 정산 관리 (settlement_tb) - 헬스장별 수수료 계산
- 시스템 전체 공지 발송 (notice_tb, target: all)
- 앱 버전 관리 (appversion_tb) - 강제 업데이트 제어
- 로그 분석 (loginlog_tb) 및 보안 관리

## 2. 헬스장 운영자/관리자 (Gym Owner/Manager)

### 헬스장 등록 및 설정:
```
플랫폼 관리자로부터 계정 발급
→ 헬스장 기본 정보 입력 (gym_tb: 이름, 주소, 연락처)
→ 운영 시간/요일 설정 (daytype_tb: 평일/주말/공휴일)
→ 시간대별 가격 설정 (timeslot_tb)
```

### 상품 설정:
```
운동 카테고리 생성 (healthcategory_tb: 헬스/PT/요가/필라테스)
→ 카테고리별 상품 등록 (health_tb)
   - 기간 설정 (term_tb: 1/3/6/12개월)
   - 횟수권 설정 (예: 10/20회)
   - 가격 및 할인 설정 (discount_tb)
→ 락커 정보 등록 (rocker_tb: 번호, 위치, 타입)
```

### 직원 관리:
```
트레이너 계정 생성 (user_tb, role: TRAINER)
→ 직원 권한 설정 (role: STAFF)
→ PT 스케줄 가능 시간대 설정
```

### 일상 운영:
- 회원 관리: 신규 등록, 회원권 갱신, 환불 처리
- 출입 기록 확인 (attendance_tb)
- 락커 배정 및 관리 (rockerusage_tb)
- 문의 응답 (inquiry_tb)
- 공지사항 게시 (notice_tb, target: 자체 헬스장 회원)
- 매출 확인 (order_tb, payment_tb)
- 정산 내역 확인 (settlement_tb)

## 3. 일반 회원 (Regular Member)

### 회원가입:
```
앱 다운로드 → 회원가입 (user_tb, role: MEMBER)
→ 기본 정보 입력 (이름, 전화번호, 생년월일)
→ 로그인 (loginlog_tb 기록)
→ 푸시 알림 토큰 등록 (pushtoken_tb)
```

### 헬스장 찾기 및 회원권 구매:
```
위치/키워드로 헬스장 검색 (gym_tb)
→ 헬스장 상세 정보 확인 (운영 시간, 시설, 상품)
→ 운동 이용권 선택 (health_tb)
   - 카테고리 선택 (헬스/PT/요가)
   - 기간/횟수 선택
   - 할인 확인
→ 주문 생성 (order_tb)
→ 결제 (payment_tb)
→ 회원권 발급 (membership_tb)
→ QR 코드 자동 생성 (memberqr_tb)
```

### 출입 체크인 (핵심 기능):
```
헬스장 도착 → 앱 실행 → QR 코드 표시 (memberqr_tb)
→ 입구 단말기에서 QR 스캔
→ 회원 인증 및 회원권 유효성 검증
   ✓ 만료일 확인
   ✓ 잔여 횟수 확인 (횟수권인 경우)
   ✓ 이용 가능 시간대 확인 (timeslot_tb)
→ 출입 기록 저장 (attendance_tb)
→ 이용 내역 업데이트 (membershipusage_tb)
   - 횟수권: 잔여 횟수 -1
   - 기간권: 기록만
```

### PT 이용:
```
트레이너 배정 (trainermember_tb)
→ PT 예약 (ptreservation_tb: 날짜, 시간 선택)
→ 트레이너 승인
→ 예약 확정 알림 (alarm_tb, push)
→ PT 수업 진행
→ 수업 후 체성분 측정 (memberbody_tb)
   - 체중, 체지방률, 근육량 등
   - 변화 그래프 확인
```

### 락커 이용:
```
락커 신청 → 사용 가능한 락커 확인 (rocker_tb, status: AVAILABLE)
→ 락커 배정 (rockerusage_tb)
→ 보증금/월 사용료 결제
→ 이용 기간 관리 (시작일 ~ 종료일)
→ 만료 전 알림 (alarm_tb)
```

### 기타 서비스:
- 운동 기록 확인 (attendance_tb, membershipusage_tb)
- 결제 내역 확인 (order_tb, payment_tb)
- 체성분 변화 추적 (memberbody_tb)
- 공지사항 확인 (notice_tb)
- 문의하기 (inquiry_tb)
- QR 코드 재발급 (분실 시)

## 4. 트레이너 (Trainer)

### 계정 및 권한:
```
헬스장 관리자가 계정 생성 (user_tb, role: TRAINER)
→ 로그인 → 배정된 헬스장에 자동 매핑
```

### 회원 관리:
```
배정된 회원 확인 (trainermember_tb)
→ PT 스케줄 관리 (ptreservation_tb)
   - 가능한 시간대 설정
   - 회원 예약 요청 승인/거부
   - 스케줄 변경/취소
→ 회원 체성분 입력 (memberbody_tb)
→ 운동 프로그램 관리 및 피드백 제공
```

### 스케줄 관리:
- 일일 PT 스케줄 확인
- 노쇼 회원 처리 (pr_status: 3)
- 수업 완료 표시 (pr_status: 1)
- 회원별 진행 상황 확인

## 5. 결제 및 정산 프로세스

### 회원권 구매 결제:
```
회원이 상품 선택 → 주문 생성 (order_tb)
→ 결제 수단 선택 (카드/계좌이체/현금)
→ 결제 처리 (payment_tb)
   - 결제 상태: PENDING → SUCCESS/FAIL
→ 성공 시: 회원권 활성화 (membership_tb)
→ 실패 시: 알림 및 재시도 안내
```

### 월별/일별 정산:
```
매일 자정 배치 작업
→ 일일 매출 집계 (settlement_tb)
   - 헬스장별 매출
   - 결제 수단별 금액
   - 취소/환불 금액
→ 월말 정산
   - 플랫폼 수수료 계산
   - 헬스장별 정산 금액 확정
   - 정산 보고서 생성
```

## 6. 알림 시스템

### 푸시 알림:
```
이벤트 발생 (예: PT 예약 확정, 회원권 만료 임박)
→ 알림 생성 (alarm_tb)
→ 대상 회원의 푸시 토큰 조회 (pushtoken_tb)
→ FCM/APNS를 통해 푸시 발송
→ 발송 결과 기록
```

### 알림 유형:
- 회원권 만료 D-7, D-3, D-1
- PT 예약 확정/취소
- 락커 만료 임박
- 결제 성공/실패
- 공지사항 게시 (중요 공지)
- 신규 이벤트/프로모션

## 7. 보안 및 모니터링

### 로그인 보안:
```
로그인 시도 → IP 주소 확인 (ipblock_tb)
→ 차단된 IP인 경우 접근 거부
→ 정상 로그인 시 기록 (loginlog_tb)
   - IP, 시간, 디바이스 정보
→ 이상 접근 패턴 감지 시 알림
```

### 접근 제어:
- 플랫폼 관리자: 전체 데이터 접근
- 헬스장 관리자: 자체 헬스장 데이터만
- 트레이너: 배정된 회원 데이터만
- 회원: 본인 데이터만

## 8. 앱 버전 관리

```
신규 버전 출시 → 버전 정보 등록 (appversion_tb)
→ 강제 업데이트 플래그 설정
→ 앱 실행 시 버전 체크
→ 구버전인 경우:
   - 강제 업데이트: 스토어로 이동
   - 선택 업데이트: 알림 후 사용 허용
```

## 데이터 흐름 요약

```
회원 가입 (user_tb)
    ↓
헬스장 회원권 구매 (membership_tb, order_tb, payment_tb)
    ↓
QR 코드 발급 (memberqr_tb)
    ↓
입장 시 스캔 (attendance_tb, membershipusage_tb)
    ↓
서비스 이용 (PT, 락커 등)
    ↓
정산 (settlement_tb)
```

이 아키텍처는 **여러 헬스장이 하나의 플랫폼에서 독립적으로 운영**되면서, 회원들은 **하나의 앱으로 모든 헬스장에 접근**할 수 있도록 설계되었습니다!
