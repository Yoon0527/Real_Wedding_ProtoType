# 리얼웨딩 (RealWedding) — 프로젝트 개요 및 인수인계 문서

> 최종 업데이트: 2026-07-18 · 최신 커밋 `b9d616b`
> 이 문서는 새 세션에서 작업을 이어가기 위한 컨텍스트 문서입니다.
>
> ⚠️ **관리자 백오피스(`/admin`)는 아직 커밋되지 않은 작업 트리 변경입니다.**
> 커밋 히스토리에는 없으며, 로컬에만 존재합니다.

---

## 1. 프로젝트 개요

**리얼웨딩**은 영수증 인증 기반의 신뢰할 수 있는 웨딩 정보 플랫폼입니다.
예비부부는 검증된 실제 웨딩 후기를 보고, 웨딩 플래너의 포트폴리오를 탐색하며 상담을 신청할 수 있습니다.

### 브랜드 정체성 (중요 — 모든 디자인 결정의 기준)

- ✅ **따뜻하고 신뢰할 수 있는 커뮤니티 기반 웨딩 서비스**
- ❌ **소개팅/매칭 앱이 아님**

**톤앤매너 규칙:**
| 항목 | 지침 |
|------|------|
| 색상 | 따뜻하고 우아하게. 강렬한 red / hot pink / purple 지양 (매칭앱 느낌) |
| 방향성 | warm ivory 배경 + muted rose-gold 액센트 + deep charcoal 텍스트 |
| 타이포 | 모던하고 신뢰감 있게. 장식적/유희적 서체 지양 |
| 라운딩 | 중간 정도 (데이팅앱식 pill 과다 ❌, B2B SaaS식 각짐 ❌) |
| 아이콘 | 커뮤니티/서비스 은유 (사람 그룹, 별, 캘린더, 위치). 단독 하트/화살표 지양 |

---

## 2. 저장소 / 브랜치

- **GitHub**: https://github.com/Yoon0527/Real_Wedding_ProtoType
- **로컬 경로**: `C:\Projects\RealWedding\realwedding-unified`
- **브랜치**: `main` 과 `Real_Wedding_CommunityPart` — 현재 **둘 다 `b9d616b`로 동일**
  - v0는 default 브랜치(`main`)만 import하므로 v0에서 보려면 main에 반영 필요

### 커밋 히스토리
```
b9d616b  fix: restore post-compose from mypage and wire up settings page
3a9002a  fix: render auth modals outside header so they center on the viewport
d4a3ba4  style: align login/signup modals with unified theme tokens
650dd36  feat: apply v0 theme (rosy brown + dim gray, Pretendard) + restore signup/login
8a27485  init: unified realwedding platform
```

---

## 3. 이 프로젝트의 유래 (통합 배경)

원래 **두 개의 별도 v0 프로젝트**였고, 이를 하나로 병합한 것이 현재 저장소입니다.

| 원본 | 경로 | 역할 |
|------|------|------|
| `real-wedding-platform` | `C:\Projects\RealWedding\real-wedding-platform` | 커뮤니티/마이페이지/스튜디오/인증 모달. shadcn 풀세트 보유 |
| `wedding-planner-inspiration` | `C:\Projects\RealWedding\wedding-planner-inspiration` | 플래너 라운지/포트폴리오/찜·상담. 파일기반 라우팅, 따뜻한 팔레트 |

**통합 전략:**
- **Base** = `wedding-planner-inspiration` (파일 기반 라우팅 구조가 더 적합)
- **이식** = `real-wedding-platform`의 views / auth 모달 / shadcn UI 전체 / hooks
- 두 원본은 **읽기 전용 참고용**으로 남아있음 (수정 금지)

---

## 4. 기술 스택

- **Next.js 16.2.6** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (`@theme inline` 방식, `tailwind.config` 파일 **없음** — 모든 토큰은 `app/globals.css`에 정의)
- **shadcn/ui** — style: `new-york`, baseColor: `neutral`, cssVariables: true
- **Radix UI** 기반 컴포넌트 (`components/ui/` 약 50개)
- **lucide-react** 아이콘
- **next-themes** (ThemeProvider, 현재 light 고정)

---

## 5. 라우트 구조

| 경로 | 컴포넌트 | 출처 | 비고 |
|------|----------|------|------|
| `/` | LoungeFeed + HeroBanner | inspiration | 플래너 라운지 (메인) |
| `/community` | CommunityView | platform | 팩트 커뮤니티. 내부 서브뷰: post-form, review-detail |
| `/wedding` | WeddingView | platform | 마이 웨딩 |
| `/mypage` | MyPageView | platform | 마이페이지. 글쓰기 → PostFormView 인라인 |
| `/studio` | PlannerStudioView | platform | 플래너 스튜디오 (플래너 모드) |
| `/settings` | SettingsView | platform | 설정 (프로필/프라이버시/알림/고객지원 4탭) |
| `/my-wedding/likes` | — | inspiration | 좋아요 |
| `/my-wedding/bookmarks` | — | inspiration | 찜목록 (비교 기능 포함) |
| `/my-wedding/recent` | — | inspiration | 최근 본 게시물 |
| `/my-wedding/consultations` | — | inspiration | 상담내역 |
| `/portfolio/[id]` | PortfolioDetailClient | inspiration | 포트폴리오 상세 (SSG 20개) |
| `/planner/[id]/portfolio` | — | inspiration | 플래너 포트폴리오 (SSG 4개) |

### 관리자 백오피스 (신규 · 미커밋)

| 경로 | 컴포넌트 | 비고 |
|------|----------|------|
| `/admin` | `app/admin/page.tsx` | 대시보드 — 요약 지표, 조회/클릭 차트, 클릭 상위 콘텐츠, 전환 퍼널 |
| `/admin/users` | `app/admin/users/page.tsx` | 회원 관리 — 상태/유형 필터, 검색, 계정 정지·해제 |
| `/admin/receipts` | `app/admin/receipts/page.tsx` | 영수증 인증 심사 — 승인/반려 |
| `/admin/planners` | `app/admin/planners/page.tsx` | 플래너 가입 심사 + 포트폴리오 게시 승인 (2탭) |
| `/admin/reports` | `app/admin/reports/page.tsx` | 콘텐츠 모더레이션 — 신고 처리(삭제/경고/반려) |

> `npm run build` 기준 **총 41 페이지** 생성 (SSG 파라미터 포함, 관리자 5개 포함)

### 공통 레이아웃
소비자용 페이지는 `components/app-shell.tsx`의 `<AppShell>`로 감쌉니다.
```
AppShell = LeftSidebar + TopHeader + main(children) + [RightSidebar 옵션]
```

**관리자 페이지는 `AppShell`을 의도적으로 사용하지 않습니다.**
소비자용 사이드바/헤더에는 관리자 개념이 없어 별도 셸로 분리했습니다.
```
app/admin/layout.tsx = AdminSidebar + main(children)
```
- `components/admin/admin-sidebar.tsx` — 관리자 전용 내비게이션
- `components/admin/admin-ui.tsx` — `AdminPageHeader` / `StatCard` / `StatusBadge` / `AdminCard` / `FilterTabs` / `MockDataNotice`
- `components/admin/traffic-chart.tsx` — 대시보드 차트 (8-(5) 참조)

> 소비자 사이드바에 `/admin` 링크는 **넣지 않았습니다.** URL을 직접 입력해야 접근됩니다.

---

## 6. 디자인 시스템

모든 토큰은 **`app/globals.css`** 한 곳에 정의됩니다. (tailwind.config 없음)

### 색상 (light 모드, oklch)
```css
--background:  oklch(0.987 0.006 62);   /* warm ivory */
--foreground:  oklch(0.385 0.025 248);  /* dim gray  #4a5568 */
--card:        oklch(1 0 0);
--primary:     oklch(0.635 0.072 22);   /* rosy brown #c9847a */
--primary-foreground: oklch(0.985 0.004 60);
--secondary:   oklch(0.955 0.010 55);   /* warm cream */
--accent:      oklch(0.93 0.022 42);    /* dusty blush */
--muted:       oklch(0.955 0.010 55);
--muted-foreground: oklch(0.52 0.016 38);
--border:      oklch(0.91 0.010 55);
--destructive: oklch(0.577 0.245 27.325);
--radius:      0.75rem;                 /* 12px 기준 */
```

### 타이포그래피
- **본문/제목 공통**: `Pretendard Variable` (globals.css 상단 CDN `@import`)
- **Mono**: Geist Mono (next/font)
- Heading: `font-weight 700`, `letter-spacing -0.02em`, `line-height 1.15`
- Body: `line-height 1.6`, `letter-spacing -0.01em`

> ⚠️ Pretendard는 **CDN import**입니다 (`cdn.jsdelivr.net`). 오프라인/CSP 환경에서는 폰트가 안 뜰 수 있음.

### Radius / Shadow
```css
--radius-sm: calc(var(--radius) * 0.33)   /* ~4px */
--radius-md: calc(var(--radius) * 0.67)   /* ~8px */
--radius-lg: var(--radius)                /* 12px */
--radius-xl / 2xl / 3xl / 4xl ...
--shadow-sm/md/lg: 부드럽고 넓게 퍼지는 형태 (낮은 opacity)
```

### 색상 사용 원칙
- **중립 색은 반드시 토큰 사용** — `text-gray-*`, `bg-gray-*` 같은 하드코딩 금지
  → `text-foreground`, `text-muted-foreground`, `bg-muted`, `bg-card`, `border-border`
- **예외적으로 하드코딩 허용되는 것:**
  - 소셜 로그인 브랜드 색 (카카오 `#FEE500`, 네이버 `#03C75A`, 구글 멀티컬러, 애플 블랙)
  - 성공 상태 green (인증 완료, 업로드 완료)
  - 대기 상태 amber (서류 검토 중)
  - 에러는 green/amber와 달리 **`destructive` 토큰 사용**

---

## 7. 지금까지 수행한 작업

1. **Step 1 — 디자인 감사**: 두 원본 프로젝트의 색상/타이포/컴포넌트/shadcn 설정 비교
   - 발견: platform은 teal primary(테크 느낌), inspiration은 warm rose-gold(브랜드에 적합)
2. **Step 2 — 통합 디자인 시스템 정의**: warm ivory + dusty rose-gold + 0.75rem radius
3. **Step 3 — 통합 실행**: 신규 경로에 두 프로젝트 병합, 라우트 재구성
4. **v0 테마 적용**: rosy brown(#c9847a) + dim gray(#4a5568) + Pretendard + 모던 타입스케일
5. **누락 기능 복구** (아래 8번 참조)
6. **관리자 백오피스 신설** (미커밋) — `/admin` 5개 화면, 목업 데이터 기반
   - 데이터/타입은 `lib/admin-data.ts` 한 곳에 집중
   - **실제 연동 시 타입은 그대로 두고 각 export를 fetch 결과로 교체**하면 화면 수정 불필요
   - 정의된 타입: `Member` / `ReceiptReview` / `PlannerApplication` / `PortfolioReview` /
     `ContentReport` / `TrafficPoint` / `TopContent` / `FunnelStep` / `SummaryStat`

---

## 8. 통합 중 발생했던 버그 & 해결 (재발 방지용)

### ⚠️ (1) 회원가입/로그인 모달이 연결되지 않았던 문제
병합 시 base로 쓴 inspiration의 `top-header.tsx`는 로그인/회원가입 버튼이 데모 토글
(`setIsLoggedIn(true)`)만 있었고, platform의 모달 연결 로직이 누락됨.
→ `authModal` state + `LoginModal`/`SignupModal` 렌더링으로 복구.

### ⚠️ (2) 모달이 화면 상단에 갇히던 문제 (CSS containing block)
`<header>`에 `backdrop-blur-md`가 걸려 있으면 **`backdrop-filter`가 containing block을 생성**하여,
그 안의 `position: fixed`가 뷰포트가 아니라 header 박스(~64px) 기준이 됨.

> 🔴 **중요**: `top-header.tsx`에서 모달은 반드시 `<header>` **바깥**(fragment 형제)에 렌더링해야 함.
> 이 구조를 되돌리면 모달이 다시 상단에 갇힙니다.

### ⚠️ (3) 마이페이지 글쓰기 버튼 무반응
`/mypage`에서 `onNavigate`를 빈 함수로 넘겨 `MyPageView`의 글쓰기가 동작 안 함.
→ `composing` state로 `PostFormView` 인라인 렌더링하도록 수정.

### ⚠️ (4) 설정 페이지 미연결
`SettingsView`는 완성돼 있었으나 라우트/링크 없음 (원본에서도 dormant).
→ `/settings` 라우트 + 사이드바 "설정" 메뉴 추가.

### ⚠️ (5) recharts `<ResponsiveContainer>`가 React 19에서 렌더링되지 않음
관리자 대시보드 차트 작업 중 발견. **recharts 2.15.0 + React 19 조합**에서
`<ResponsiveContainer>`가 부모 크기를 측정하지 못해 **빈 div만 남기고 차트가 사라집니다.**

- 부모 컨테이너는 정상(934×288)인데도 `.recharts-wrapper svg` 개수가 0
- 콘솔 에러 없음 → 원인 파악이 어려우므로 주의
- `width`/`height`에 **고정 픽셀 값**을 주면 즉시 정상 렌더링됨 (원인 확정)

→ `components/admin/traffic-chart.tsx`에서 `ResizeObserver`로 폭을 직접 측정해
픽셀 값으로 넘기는 방식으로 우회. 반응형은 유지됩니다.

> 🔴 **중요**: 이 문제는 `components/ui/chart.tsx`(shadcn)를 쓰는 **모든 차트에 동일하게 발생**합니다.
> 현재 다른 곳에서 차트를 쓰지 않아 드러나지 않았을 뿐입니다.
> 새 차트를 추가할 때 `<ResponsiveContainer>`를 그대로 쓰지 말고 위 패턴을 재사용하세요.
> recharts 3.x로 업그레이드하면 우회 코드 제거 가능.

---

## 9. 알려진 이슈 / TODO

| 우선순위 | 항목 | 설명 |
|---------|------|------|
| **높음** | **`/admin` 접근 제어 전무** | 로그인 없이 URL만 알면 **누구나 접근 가능**. 배포 전 미들웨어/세션 기반 권한 체크 **필수**. `app/admin/layout.tsx`에 경고 주석 있음 |
| 중간 | 관리자 액션이 전부 화면 상태만 변경 | 승인·반려·정지·삭제 버튼이 `useState`만 갱신. 새로고침 시 초기화. 각 페이지에 `MockDataNotice` 배너로 명시함 |
| 중간 | 클릭 추적 미구현 → 대시보드 수치 목업 | 이벤트 로그 수집 자체가 없어 실제 클릭 데이터가 존재하지 않음. `@vercel/analytics`는 페이지뷰 텔레메트리일 뿐 조회 불가 |
| 중간 | recharts `ResponsiveContainer` 사용 금지 | 8-(5) 참조. 새 차트 추가 시 `traffic-chart.tsx` 패턴 재사용 |
| 낮음 | `@base-ui/react` 미사용 의존성 | package.json에 있으나 코드에서 전혀 사용 안 함 (button.tsx는 Radix 기반). 제거 가능 |
| 낮음 | `components/views/planner-view.tsx` 고아 파일 | 구버전 플래너 목록. `/` 라운지 피드가 상위 호환이라 미연결. 삭제 검토 |
| 중간 | 인증/데이터가 모두 목업 | 로그인·회원가입·상담신청 전부 mock. 실제 API 연동 필요 |
| 중간 | 다크모드 미검증 | `.dark` 토큰은 정의돼 있으나 UI 검증 안 됨. 현재 light 고정 |
| 낮음 | Pretendard CDN 의존 | self-host 또는 next/font/local 전환 검토 |
| 낮음 | 프로필 드롭다운 메뉴 미동작 | `top-header.tsx`의 profileMenu 항목들이 링크 없음 |

---

## 10. 개발 / 배포

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev          # http://localhost:3000

# 프로덕션 빌드 (변경 후 반드시 검증)
npm run build
```

### v0에서 보기
1. v0.dev → Import from GitHub → `Yoon0527/Real_Wedding_ProtoType`
2. **default 브랜치(main)** 그대로 열면 최신 상태
3. 이미 열어둔 프로젝트면 Sync/Pull 필요 (자동 반영 안 됨)

### Vercel 배포
vercel.com/new → repo 선택 → Deploy

---

## 11. 작업 시 지켜야 할 규칙

1. **두 원본 프로젝트(`real-wedding-platform`, `wedding-planner-inspiration`)는 수정 금지** — 참고용
2. **중립 색상은 반드시 테마 토큰 사용** (6번 섹션 참조)
3. **모달은 `<header>` 바깥에 렌더링** (8-(2) 참조)
4. **변경 후 `npm run build`로 검증** 후 커밋
5. `main`과 `Real_Wedding_CommunityPart` 브랜치는 **동일하게 유지** (v0가 main만 보므로)
6. 브랜드 톤 규칙 준수 — 데이팅앱 느낌 지양 (1번 섹션 참조)
7. **차트 추가 시 `<ResponsiveContainer>` 사용 금지** (8-(5) 참조)
8. **`/admin`을 배포 대상에 포함하기 전 반드시 접근 제어 구현** (9번 섹션 참조)
