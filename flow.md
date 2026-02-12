1. SQL (DB 스키마) 보완 제안
현재 DB 구조에서 확장성과 유연성을 위해 추가하거나 수정해야 할 테이블들입니다.

① 다중 역할(Multi-Role) 처리를 위한 구조 명확화
현재 user_tb에 u_role 컬럼이 있고, role_tb가 따로 존재합니다.

문제점: user_tb에 u_role이 하나만 박혀있으면, "A 헬스장에서는 트레이너, B 헬스장에서는 회원"인 경우를 처리하기 모호해집니다.

제안:

user_tb의 u_role은 '대표 역할' 혹은 **'가입 초기 역할'**로만 두고, 실제 권한 체크는 관계 테이블을 통해야 합니다.

membership_tb가 있으면 -> 회원

gymtrainer_tb가 있으면 -> 트레이너

gym_tb의 g_user(소유자)이면 -> 운영자

결론: 로직에서 user_tb.u_role에 의존하기보다, 로그인 시 해당 유저가 가진 관계 테이블을 조회하여 **"접속 모드(Profile Switching)"**를 선택하게 하는 것이 좋습니다.

② 트레이너 근무 일정 관리 (trainer_schedule_tb 추가)
현재 ptreservation_tb(예약)는 있지만, 트레이너가 **언제 근무하는지(가능 시간)**에 대한 데이터가 없습니다.

추가: 트레이너별 근무 가능 시간(Shift)을 저장해야 회원이 예약할 때 가능한 시간만 필터링할 수 있습니다.

CREATE TABLE trainer_schedule_tb (
    ts_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ts_trainer BIGINT NOT NULL, -- user_tb
    ts_gym BIGINT NOT NULL, -- gym_tb
    ts_day_of_week INT NOT NULL, -- 0:일, 1:월 ... 6:토
    ts_start_time TIME NOT NULL, -- 출근 시간 (예: 14:00)
    ts_end_time TIME NOT NULL, -- 퇴근 시간 (예: 22:00)
    ts_break_start TIME, -- 휴게 시작
    ts_break_end TIME
);

③ 헬스장/트레이너 리뷰 및 평점 (review_tb 추가)
회원 앱에서 헬스장을 검색하고 선택하려면 리뷰와 별점이 필수입니다.

CREATE TABLE review_tb (
    rv_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rv_user BIGINT NOT NULL, -- 작성자
    rv_target_gym BIGINT, -- 대상 헬스장 (NULL이면 트레이너 리뷰)
    rv_target_trainer BIGINT, -- 대상 트레이너 (NULL이면 헬스장 리뷰)
    rv_score INT NOT NULL, -- 1~5점
    rv_content TEXT,
    rv_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

④ 위치 기반 검색을 위한 좌표 (gym_tb 수정)
앱에서 "내 주변 헬스장"을 찾으려면 주소 문자열만으로는 부족합니다.

수정: gym_tb에 위도, 경도 컬럼 추가.

ALTER TABLE gym_tb ADD COLUMN g_latitude DECIMAL(10, 8); -- 위도
ALTER TABLE gym_tb ADD COLUMN g_longitude DECIMAL(11, 8); -- 경도

(추후 MySQL 8.0 이상이면 ST_Distance_Sphere 함수 등을 이용해 반경 검색 가능)

⑤ 갤러리/미디어 관리 강화 (gym_image_tb, body_gallery_tb 추가)
gym_tb에는 사진이 하나뿐이고, 회원의 변화 과정(눈바디)을 기록할 곳이 부족합니다.

gym_image_tb: 헬스장 시설 사진 여러 장 저장 (메인, 샤워실, 기구 등).

body_gallery_tb: 회원이 자신의 몸 변화 사진을 날짜별로 저장하고 Before/After를 생성.

2. Service Flow (기능 및 로직) 보완 제안
말씀하신 "웹(관리자/트레이너)"과 "앱(회원)"의 흐름을 더 매끄럽게 만들기 위한 아이디어입니다.

① 트레이너 "초대 및 수락" 프로세스 디테일 (Recruitment Flow)
말씀하신 [웹 접속 -> 요청 확인 -> 수락] 과정을 DB 상태값으로 명확히 해야 합니다.

Logic:

헬스장 운영자가 트레이너의 ID나 코드로 검색하여 '초대' 발송.

gymtrainer_tb에 데이터 생성, gt_status = PENDING(대기).

트레이너가 웹 로그인 시 '초대 알림' 확인.

수락 시 gt_status = ACTIVE(활동중)으로 변경 -> 이때부터 해당 헬스장 소속으로 UI 변경.

거절 시 gt_status = REJECTED 혹은 row 삭제.

② "페르소나 스위칭" (User Identity Switching)
유저 한 명이 여러 역할을 가질 때 UI 처리가 중요합니다.

시나리오: '김철수'는 [A 헬스장 관장]이면서 [B 헬스장 회원]입니다.

웹(Web) 로직:

로그인 후 [관리자 모드] / [트레이너 모드] 선택 버튼 필요.

관리자 모드 선택 시: 본인이 소유한 헬스장 리스트(gym_tb)만 관리.

앱(App) 로직:

앱은 기본적으로 **[회원 모드]**입니다.

B 헬스장 입장 QR, 운동 기록 등이 메인.

만약 김철수가 A 헬스장 관리자라면, 앱 설정 메뉴에 "관리자 페이지(웹) 링크 보내기" 혹은 간단한 "실시간 입장 현황 보기" 정도의 관리자용 대시보드 뷰를 제공하면 아주 편리합니다.

③ 채팅/커뮤니케이션 기능 (1:1 Chat)
PT 회원과 트레이너 사이에 가장 필요한 기능입니다. (카카오톡으로 넘어가면 플랫폼 이탈 발생)

기능: 식단 사진 전송, 운동 질문, 일정 조율.

DB: chat_room_tb, chat_message_tb 필요.

구현: 웹소켓(WebSocket)을 사용하거나, 간단하게는 API 폴링으로 구현. 앱(회원) <-> 웹(트레이너) 간 소통 창구.

④ QR 출석 시스템의 보안성 강화
문제: QR 코드를 캡처해서 친구에게 공유하여 부정 입장할 수 있음.

해결: qrcode_tb의 QR 코드 값은 **동적(Dynamic)**이어야 합니다.

앱에서 QR 생성 시 30초마다 새로운 코드가 생성되도록 로직 구성 (TOTP 방식 유사).

입장 시 서버는 "지금 유효한 코드인지" + "가장 최근 생성된 코드인지" 확인.

3. "Cool"한 앱을 위한 추가 아이디어 (Gamification)
사용자가 앱을 계속 쓰게 만드는 요소들입니다.

운동 스트릭(Streak) & 잔디 심기:

개발자들에게 익숙한 GitHub 잔디처럼, attendance_tb나 workoutlog_tb를 기반으로 달력에 운동한 날을 색칠해줍니다. (예: "30일 연속 출석 도전!")

헬스장 랭킹 시스템:

해당 헬스장 내에서 [이번 달 출석왕], [3대 운동 중량왕] 등을 집계하여 익명 혹은 닉네임으로 랭킹 게시판 노출. (경쟁 심리 자극)

수업(PT) 일지 리포트:

트레이너가 웹에서 피드백을 작성하면, 회원은 앱에서 예쁜 "오늘의 수업 리포트" 카드로 받아봅니다. (담당 트레이너의 코멘트 + 오늘 한 운동 요약)

4. 정리 (DB 추가 권장 사항 요약)
기존 gym.sql에 아래 테이블들을 추가하거나 보완하는 것을 추천합니다.

gym_tb: 위도/경도 컬럼 추가.

trainer_schedule_tb: 트레이너 근무 시간표 (New).

chat_message_tb: 트레이너-회원 1:1 채팅 (New).

gym_image_tb: 헬스장 홍보용 이미지 다수 (New).

review_tb: 별점 및 리뷰 (New).






# Gym Spring - 플랫폼 고도화 및 DB 설계 제안서

본 문서는 `Gym Spring` 헬스장 통합 관리 플랫폼의 **All-in-One 유저 모델**과 **B2B2C 서비스 흐름**을 완벽하게 구현하기 위한 DB 스키마 수정안 및 비즈니스 로직 명세를 담고 있습니다.

---

## 1. 핵심 컨셉 (Core Concept)

### 1.1. All-in-One User Model
- **단일 계정, 다중 페르소나**: 한 명의 유저(`User`)가 상황에 따라 **회원**, **트레이너**, **헬스장 운영자**의 역할을 동시에 수행할 수 있습니다.
- **역할 전환 (Role Switching)**:
    - **Web**: 로그인 시 또는 대시보드에서 `[관리자 모드]`, `[트레이너 모드]` 전환 가능.
    - **App**: 기본적으로 `[회원 모드]`로 동작하며, 자신의 운동 기록 및 입장 권한에 집중.

### 1.2. 플랫폼 구조 (Web & App)
| 구분 | 사용자 | 주요 기능 |
| :--- | :--- | :--- |
| **Web** | 헬스장 운영자 | 지점 관리, 매출 정산, 직원(트레이너) 관리, 회원권 설정 |
| **Web** | 트레이너 | 담당 회원 관리, PT 일정 조율, 수업 일지 작성, 채팅 |
| **App** | 회원 | QR 입장, 헬스장 검색/결제, PT 예약, 운동 기록(오운완), 눈바디 |

---

## 2. DB 스키마 고도화 제안 (SQL)

기존 `gym.sql`에 유연성과 확장성을 더하기 위해 아래 테이블 및 컬럼 추가를 제안합니다.

### 2.1. 트레이너 근무 및 채용 관리
트레이너의 근무 시간을 관리하고, 헬스장-트레이너 간의 고용 상태를 명확히 합니다.

```sql
-- 1. 트레이너 근무 일정 테이블 (신규)
CREATE TABLE trainer_schedule_tb (
    ts_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ts_trainer BIGINT NOT NULL COMMENT '트레이너 ID (user_tb)',
    ts_gym BIGINT NOT NULL COMMENT '헬스장 ID (gym_tb)',
    ts_day_of_week INT NOT NULL COMMENT '요일 (0:일 ~ 6:토)',
    ts_start_time TIME NOT NULL COMMENT '출근 시간',
    ts_end_time TIME NOT NULL COMMENT '퇴근 시간',
    ts_break_start TIME COMMENT '휴게 시작 시간',
    ts_break_end TIME COMMENT '휴게 종료 시간'
);

-- 2. 헬스장-트레이너 매칭 상태 상세화 (기존 테이블 보완)
-- gymtrainer_tb에 상태값 추가 정의
-- gt_status: PENDING(초대대기), ACTIVE(활동중), REJECTED(거절), TERMINATED(계약종료)
2.2. 위치 기반 서비스 및 갤러리
앱에서 "내 주변 헬스장" 찾기와 시설 미리보기를 지원합니다.

SQL
-- 3. 헬스장 좌표 및 시설 이미지 (gym_tb 수정 및 신규 테이블)
ALTER TABLE gym_tb ADD COLUMN g_latitude DECIMAL(10, 8) COMMENT '위도';
ALTER TABLE gym_tb ADD COLUMN g_longitude DECIMAL(11, 8) COMMENT '경도';

CREATE TABLE gym_image_tb (
    gi_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    gi_gym BIGINT NOT NULL,
    gi_url VARCHAR(500) NOT NULL COMMENT '이미지 경로',
    gi_type VARCHAR(50) DEFAULT 'GENERAL' COMMENT '타입 (MAIN, FACILITY, SHOWER 등)',
    gi_order INT DEFAULT 0 COMMENT '노출 순서'
);
2.3. 커뮤니케이션 및 리뷰
트레이너와 회원의 1:1 소통, 그리고 헬스장 평가 시스템입니다.

SQL
-- 4. 리뷰 및 평점 테이블 (신규)
CREATE TABLE review_tb (
    rv_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rv_user BIGINT NOT NULL COMMENT '작성자',
    rv_gym BIGINT COMMENT '대상 헬스장 (NULL 가능)',
    rv_trainer BIGINT COMMENT '대상 트레이너 (NULL 가능)',
    rv_score INT NOT NULL COMMENT '별점 (1~5)',
    rv_content TEXT COMMENT '리뷰 내용',
    rv_images TEXT COMMENT '리뷰 이미지 JSON',
    rv_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. 1:1 채팅 테이블 (신규 - PT 회원 관리용)
CREATE TABLE chat_room_tb (
    cr_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cr_gym BIGINT NOT NULL,
    cr_trainer BIGINT NOT NULL,
    cr_member BIGINT NOT NULL,
    cr_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '최근 메시지 시간'
);

CREATE TABLE chat_message_tb (
    cm_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cm_room BIGINT NOT NULL,
    cm_sender BIGINT NOT NULL COMMENT '보낸 사람 ID',
    cm_message TEXT NOT NULL,
    cm_type VARCHAR(20) DEFAULT 'TEXT' COMMENT 'TEXT, IMAGE, SYSTEM',
    cm_is_read BOOLEAN DEFAULT FALSE,
    cm_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
2.4. 회원 경험 (Gamification)
회원의 앱 사용 지속성을 높이기 위한 기록용 테이블입니다.

SQL
-- 6. 눈바디(Body Gallery) 테이블 (신규)
CREATE TABLE body_gallery_tb (
    bg_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bg_user BIGINT NOT NULL,
    bg_photo_url VARCHAR(500) NOT NULL,
    bg_weight DECIMAL(5,2) COMMENT '당시 체중',
    bg_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '촬영일'
);
3. 핵심 비즈니스 로직 (Service Flow)
3.1. 트레이너 채용 프로세스 (Web)
초대 (Invite): 헬스장 운영자가 User ID 또는 이메일로 트레이너를 검색하여 초대장을 발송합니다.

DB Action: gymtrainer_tb 생성 (gt_status = PENDING).

수락 (Accept): 트레이너가 웹 로그인 시 알림을 확인하고 수락합니다.

DB Action: gt_status를 ACTIVE로 변경.

Effect: 트레이너의 웹 대시보드에 해당 헬스장의 회원 관리 메뉴가 활성화됩니다.

3.2. QR 출석 및 보안 (App)
동적 QR 생성: 앱에서 QR 코드를 생성할 때, 서버 시간과 사용자 ID를 조합하여 30초마다 변하는 Dynamic QR을 생성합니다. (캡처 방지)

입장 체크: 키오스크/태블릿에서 QR 스캔 시 유효성 검증(시간, 회원권 만료 여부) 후 attendance_tb에 기록합니다.

3.3. PT 예약 및 수업 (Web & App)
일정 확인: 회원은 앱에서 담당 트레이너의 trainer_schedule_tb와 기존 예약(ptreservation_tb)을 기반으로 **빈 시간(Available Slots)**만 확인합니다.

예약 요청: 회원이 시간을 선택하여 예약을 요청합니다.

확정: 트레이너(Web) 혹은 자동 승인 설정에 따라 예약이 확정됩니다.

수업 후: 트레이너는 Web에서 "수업 일지"를 작성하고, 회원은 App에서 "오늘의 운동 리포트"를 푸시 알림으로 받습니다.

4. 앱(App) 차별화 기능 아이디어
회원 전용 앱의 사용성을 높이기 위한 기능입니다.

운동 잔디 심기 (Streak):

개발자의 GitHub 잔디처럼, 운동(출석)한 날짜를 달력에 진한 색으로 표시하여 연속 운동 욕구를 자극합니다.

실시간 혼잡도 확인:

현재 attendance_tb의 입장 상태 인원수를 카운트하여 "여유", "보통", "혼잡" 상태를 앱 홈 화면에 표시합니다.

나만의 운동 루틴 공유:

회원이 자신의 운동 루틴(세트/횟수)을 프리셋으로 저장하고, QR만 찍으면 기구 세팅이 기록되도록 연동(추후 IoT 확장 가능성).

5. 결론
위의 설계를 통해 Gym Spring은 단순한 관리를 넘어, 운영자에게는 효율을, 트레이너에게는 편리함을, 회원에게는 운동의 재미를 주는 통합 플랫폼으로 거듭날 수 있습니다.