# 💪 Gym Spring - Frontend

**헬스장 통합 관리 플랫폼**의 웹 프론트엔드 애플리케이션입니다.

운영자와 트레이너를 위한 관리 대시보드를 제공하며, 헬스장 운영에 필요한 모든 기능을 하나의 플랫폼에서 관리할 수 있습니다.

---

## 📋 주요 기능

### 🏢 운영자 (Admin)
- **대시보드** — 헬스장 운영 현황 한눈에 파악
- **회원 관리** — 회원 등록, 조회, 수정, 멤버십 관리
- **트레이너 관리** — 트레이너 등록 및 소속 관리
- **회원권(상품) 관리** — 이용권 등록, 카테고리 분류, 할인 설정
- **결제 / 주문 관리** — 결제 내역 조회 및 영수증 발행
- **PT 예약 관리** — PT 수업 예약 현황 관리
- **출석 관리** — QR 기반 출석 체크 및 출석 현황
- **공지사항 / 문의 관리** — 공지 등록 및 회원 문의 처리
- **운동 기록 관리** — 회원별 운동 로그 조회
- **설정 관리** — 헬스장 기본 정보 및 시스템 설정

### 🏋️ 트레이너 (Trainer)
- **트레이너 대시보드** — 담당 회원 및 일정 관리

### 👤 회원 (Member)
- **회원 대시보드** — 나의 운동 기록 및 회원권 정보
- **헬스장 검색** — 헬스장 목록 조회
- **결제 내역** — 나의 결제 이력 확인

---

## 🛠 기술 스택

| 구분 | 기술 |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Routing** | React Router v7 |
| **상태 관리** | Jotai (Atomic State) |
| **서버 상태** | TanStack React Query v5 |
| **HTTP Client** | Axios |
| **Styling** | TailwindCSS v4 |
| **배포** | Docker + Docker Compose |

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 22+
- **npm** 또는 **yarn**

### 설치

```bash
# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다:

```env
VITE_API_URL=http://localhost:8004/api
```

### 개발 서버 실행

```bash
npm run dev
```

> 개발 서버는 `http://localhost:9004` 에서 실행됩니다.  
> API 요청은 백엔드 서버로 자동 프록시됩니다.

### 빌드

```bash
npm run build
```

---

## 🐳 Docker

### Docker 이미지 빌드

```bash
# 로컬 빌드
make docker

# 특정 태그로 빌드
make docker tag=v1.0.0

# 빌드 & Push
make push tag=v1.0.0
```

### Docker Compose 실행

```bash
docker compose up -d
```

> 컨테이너는 `9004` 포트에서 실행됩니다.

---

## 📁 프로젝트 구조

```
src/
├── components/         # 공통 UI 컴포넌트
│   ├── ui/            # 기본 UI 요소 (Button, Input, Modal 등)
│   ├── common/        # 공통 레이아웃 컴포넌트
│   └── admin/         # 관리자 전용 컴포넌트
├── pages/             # 페이지 컴포넌트
│   ├── admin/         # 관리자 페이지 (대시보드, 회원/트레이너 관리 등)
│   ├── auth/          # 인증 페이지 (로그인, 회원가입)
│   ├── gym/           # 헬스장 관련 페이지
│   ├── member/        # 회원 페이지
│   └── trainer/       # 트레이너 페이지
├── models/            # 데이터 모델 정의
├── types/             # TypeScript 타입 정의
├── services/          # API 클라이언트 및 서비스 레이어
├── store/             # Jotai 상태 관리 (인증 등)
├── layouts/           # 레이아웃 컴포넌트
├── contexts/          # React Context
├── theme/             # 테마 설정
└── global/            # 전역 유틸리티
```

---

## 🔐 인증 & 권한

- **JWT 기반 인증** — 로그인 시 토큰 발급, 로컬 스토리지 저장
- **역할 기반 라우팅** — 사용자 역할(운영자/트레이너/회원)에 따른 접근 제어
- **자동 토큰 갱신** — 401 응답 시 자동 로그아웃 처리

---

## 🔗 관련 프로젝트

| 프로젝트 | 설명 |
| :--- | :--- |
| **back** | Go 백엔드 API 서버 |
| **app** | 회원용 모바일 앱 |

---

## 📜 스크립트 요약

| 스크립트 | 설명 |
| :--- | :--- |
| `npm run dev` | 개발 서버 실행 (port 9004) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 미리보기 |
| `npm run lint` | ESLint 코드 검사 |
