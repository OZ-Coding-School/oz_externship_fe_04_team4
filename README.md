# StudyHub Admin

## 1. 프로젝트 개요
혼자 공부하기 어려운 사람들이 함께 스터디를 만들고 운영할 수 있는 **StudyHub 서비스의 운영 정보를 관리하는 내부 관리자(Admin) 페이지**

- 서비스 URL: [StudyHub_Admin_바로가기](https://admin.ozcoding.site)
- API Base URL: `https://api.ozcoding.site`
- 대상 사용자: 내부 관리자 전용(외부 공개 목적 아님)

### 목적 / 기대효과
- 운영자가 반복 작업(조회/필터/정렬/검수)을 빠르게 처리
- 권한(Role) 기반으로 접근/기능 제한을 명확히 분리
- 인증/토큰 흐름 표준화로 운영 안정성 확보(401 자동 처리 포함)

---

## 2. 프로젝트 구동 방법
### 설치
```bash
npm install
```

### 환경변수
루트에 `.env` 생성:
```env
VITE_API_BASE_URL=https://api.ozcoding.site
```

### 실행
```bash
npm run dev
```

---

## 테스트 계정
- Admin
  - Email: `admin@ozcoding.site`
  - Password: `Ozcoding1234@`
- Staff (조회 전용)
  - Email: `testuser2@ozcoding.site`
  - Password: `password1234@`

 ---
## 3. REPOSITORY 구조

```txt
src/
  api/                # axios 인스턴스, API 호출 유틸
  app/                # 라우팅/전역 설정(App, Providers)
  components/         # 공용 UI 컴포넌트
  config/             # routes, query keys, env, 상수
  features/           # 도메인 기능 단위(필터/폼/삭제 등)
  hooks/              # react-query 래퍼 훅, 공용 훅
  lib/                # 공용 유틸/헬퍼
  mocks/              # MSW 핸들러, mock 데이터(필요 시)
  pages/              # 라우트 단위 페이지
  store/              # 상태관리(zustand 등)
  types/              # request/response/common 타입
  utils/              # 범용 유틸
```

---

## 4. 주요 스택

- **React + Vite**: CSR 기반 관리자 페이지
- **React Router**: 라우팅(BrowserRouter)
- **Axios**: API 통신 레이어 통일
- **TanStack Query(React Query)**: 서버 상태/캐싱/재시도/무효화
- **Zustand**: 인증 토큰/사용자 상태 관리(경량 store)
- **TailwindCSS**: UI 스타일링
- **ESLint / Prettier / Husky**: 코드 품질 및 커밋 전 검사

- **React + Vite**: CSR 기반 관리자 페이지 구성(빠른 개발 서버/번들링)
- **React Router / React Router DOM**: 라우팅 및 페이지 전환(BrowserRouter 기반)
- **Axios**: API 통신 레이어 표준화(인스턴스/인터셉터로 인증 흐름 통합)
- **TanStack Query (React Query)**: 서버 상태 관리(캐싱/재시도/무효화/쿼리키 기반 데이터 동기화)
- **Zustand**: 클라이언트 상태 관리(인증 토큰/권한/세션 상태 등 경량 store)
- **TailwindCSS**: 유틸리티 기반 스타일링(빠른 UI 작업)
- **Zod**: 런타임 스키마 검증 및 안전한 타입 추론(요청/응답 데이터 검증)
- **Day.js**: 날짜/시간 포맷 및 계산 유틸
- **Recharts**: 대시보드 차트 시각화
- **Radix UI Themes**: 접근성 기반 UI 컴포넌트/테마
- **Lucide / Lucide-React**: 아이콘 라이브러리
- **clsx / tailwind-merge**: 조건부 className 구성 및 Tailwind 클래스 충돌 정리

### 품질/협업 도구
- **ESLint**: 코드 품질/규칙 검사
- **Prettier (+ prettier-plugin-tailwindcss)**: 코드 포맷팅 및 Tailwind 클래스 정렬
- **Husky + lint-staged**: 커밋 전 자동 lint/format 수행
- **Commitlint**: 커밋 메시지 컨벤션 강제

### 테스트/목데이터
- **MSW**: Mock API(개발 단계에서 목데이터/실API 전환 지원)
- **Vitest + Testing Library + JSDOM**: 단위/컴포넌트 테스트 환경

---

## 5. 주요 Feature
### 인증/권한
- Access Token: `sessionStorage`의 `admin-auth`에 저장
- Refresh Token: `Set-Cookie`로 내려오는 HttpOnly Cookie(`refresh-token`)
- 401 응답 시 자동 refresh 후 원 요청 재시도
- Role 기반 접근 제어
  - `admin`, `staff`만 접근 가능
  - `staff`는 조회만 가능(수정/삭제 불가)

### 공통 UI/데이터 처리
- 테이블: 정렬/페이지네이션/검색/필터
- 모달: 상세보기/셀렉트박스 등

---

## 6. 팀개발 컨벤션 >> 협업 전략
### 런타임 & 패키지 매니저
- Node.js: **22.x**
- Package manager: `npm`

### 브랜치 전략
- `main`: 배포용
- `develop`: 개발 통합

작업 브랜치 네이밍:
```bash
feat/{issue-number}-{short-kebab}
fix/{issue-number}-{short-kebab}
chore/{issue-number}-{short-kebab}
refactor/{issue-number}-{short-kebab}
```

### 커밋 메시지 규칙
- `{type}: {subject}`
- subject: 한국어, 명령문 스타일, 대문자 시작 금지, 마침표 금지

type:
`feat | fix | chore | refactor | style | docs | ci | build | perf | revert`

---

 
  ## Tech Stack

- Runtime: Node.js 22.x, npm
- Core: React 19, TypeScript (~5.8), Vite (^6)
- Routing: React Router (v7)
- Data: Axios, TanStack Query (v5), Zustand (v5)
- UI: TailwindCSS (v4), Radix UI Themes, Recharts
- Quality: ESLint (v9), Prettier (v3), Husky, lint-staged
- Test/Mock: Vitest (v4), Testing Library, MSW (v2)

 ---
 
## :clipboard: Documents
> [📜 API 명세서](https://docs.google.com/spreadsheets/d/1RKP4G_0D0t6lCOSNpTvLLIbR20gQ3fzdsR2WKAaJxvU/edit?gid=0#gid=0)
> 
> [📜 요구사항 정의서](https://docs.google.com/spreadsheets/d/1hpIdDAuJNH8njU_ZTsBNrsGCN5S7XPzdYUqKEG2Npp0/edit?gid=0#gid=0)
> 
> [📜 ERD](https://dbdiagram.io/d/%EC%9D%B5%EC%8A%A4%ED%84%B4%EC%8B%AD-4%EA%B8%B0-%ED%95%A9%EB%8F%99ver-691c280a6735e11170535c42)
> 
> [📜 테이블 명세서](https://docs.google.com/spreadsheets/d/1c6Vk5MJ4NXOKH-EJHO4ayAlN3qWNbXuY3aamHttwc9s/edit?gid=684962824#gid=684962824)
>
> [📜 화면 정의서](https://www.figma.com/design/9HBZkJw1EWZkYtuZUiNSCu/%EC%9D%B5%EC%8A%A4%ED%84%B4%EC%8B%AD-4%EA%B8%B0-fe-%EA%B8%B0%ED%9A%8D%EB%AC%B8%EC%84%9C?node-id=4-1357&t=RdeXqrkoSrN0Uwoq-1)
