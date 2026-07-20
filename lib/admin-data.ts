/**
 * 관리자 백오피스 목업 데이터
 *
 * ⚠️ 현재 저장소에는 DB / API 라우트 / 클릭 추적이 존재하지 않습니다.
 * 아래 데이터는 전부 UI 검증용 목업이며, 실제 백엔드 연동 시
 * 각 export를 동일한 타입의 fetch 결과로 교체하는 것을 전제로 설계했습니다.
 * 타입 정의는 그대로 두고 데이터 소스만 바꾸면 화면은 수정이 필요 없습니다.
 */

/* ============================== 회원 관리 ============================== */

export type MemberRole = '예비부부' | '신혼부부' | '플래너'
export type MemberStatus = '정상' | '휴면' | '정지' | '탈퇴'

export type Member = {
  id: string
  nickname: string
  email: string
  role: MemberRole
  status: MemberStatus
  joinedAt: string
  lastActiveAt: string
  postCount: number
  verifiedReceipts: number
  reportCount: number
}

export const members: Member[] = [
  {
    id: 'u1',
    nickname: '행복한신부',
    email: 'happy****@gmail.com',
    role: '예비부부',
    status: '정상',
    joinedAt: '2026-03-14',
    lastActiveAt: '2026-07-18',
    postCount: 12,
    verifiedReceipts: 4,
    reportCount: 0,
  },
  {
    id: 'u2',
    nickname: '웨딩마스터',
    email: 'wedmas****@naver.com',
    role: '신혼부부',
    status: '정상',
    joinedAt: '2025-11-02',
    lastActiveAt: '2026-07-17',
    postCount: 38,
    verifiedReceipts: 9,
    reportCount: 1,
  },
  {
    id: 'u3',
    nickname: '김하나',
    email: 'hana.kim****@daum.net',
    role: '플래너',
    status: '정상',
    joinedAt: '2025-08-21',
    lastActiveAt: '2026-07-18',
    postCount: 64,
    verifiedReceipts: 0,
    reportCount: 0,
  },
  {
    id: 'u4',
    nickname: '5월의신부',
    email: 'maybr****@gmail.com',
    role: '예비부부',
    status: '정상',
    joinedAt: '2026-05-30',
    lastActiveAt: '2026-07-16',
    postCount: 3,
    verifiedReceipts: 1,
    reportCount: 0,
  },
  {
    id: 'u5',
    nickname: '광고봇123',
    email: 'promo****@outlook.com',
    role: '예비부부',
    status: '정지',
    joinedAt: '2026-07-09',
    lastActiveAt: '2026-07-12',
    postCount: 27,
    verifiedReceipts: 0,
    reportCount: 14,
  },
  {
    id: 'u6',
    nickname: '이서연',
    email: 'seoyeon****@gmail.com',
    role: '플래너',
    status: '정상',
    joinedAt: '2025-09-15',
    lastActiveAt: '2026-07-18',
    postCount: 51,
    verifiedReceipts: 0,
    reportCount: 0,
  },
  {
    id: 'u7',
    nickname: '제주로가자',
    email: 'jejugo****@naver.com',
    role: '예비부부',
    status: '휴면',
    joinedAt: '2025-06-11',
    lastActiveAt: '2026-01-08',
    postCount: 6,
    verifiedReceipts: 2,
    reportCount: 0,
  },
  {
    id: 'u8',
    nickname: '알뜰신랑',
    email: 'thrifty****@gmail.com',
    role: '신혼부부',
    status: '정상',
    joinedAt: '2026-01-27',
    lastActiveAt: '2026-07-15',
    postCount: 19,
    verifiedReceipts: 6,
    reportCount: 2,
  },
  {
    id: 'u9',
    nickname: '박준호',
    email: 'junho.park****@kakao.com',
    role: '플래너',
    status: '정상',
    joinedAt: '2025-07-04',
    lastActiveAt: '2026-07-17',
    postCount: 88,
    verifiedReceipts: 0,
    reportCount: 1,
  },
  {
    id: 'u10',
    nickname: '탈퇴한사용자',
    email: '-',
    role: '예비부부',
    status: '탈퇴',
    joinedAt: '2025-12-19',
    lastActiveAt: '2026-06-30',
    postCount: 2,
    verifiedReceipts: 0,
    reportCount: 0,
  },
  {
    id: 'u11',
    nickname: '성수동커플',
    email: 'seongsu****@gmail.com',
    role: '예비부부',
    status: '정상',
    joinedAt: '2026-04-08',
    lastActiveAt: '2026-07-18',
    postCount: 15,
    verifiedReceipts: 5,
    reportCount: 0,
  },
  {
    id: 'u12',
    nickname: '정유진',
    email: 'yujin.jung****@naver.com',
    role: '플래너',
    status: '휴면',
    joinedAt: '2025-10-23',
    lastActiveAt: '2026-03-02',
    postCount: 22,
    verifiedReceipts: 0,
    reportCount: 0,
  },
]

export const memberStatuses: (MemberStatus | '전체')[] = [
  '전체',
  '정상',
  '휴면',
  '정지',
  '탈퇴',
]

export const memberRoles: (MemberRole | '전체')[] = [
  '전체',
  '예비부부',
  '신혼부부',
  '플래너',
]

/* =========================== 영수증 인증 심사 =========================== */

export type ReceiptStatus = '검토대기' | '승인' | '반려'
export type ReceiptCategory =
  | '웨딩홀'
  | '스튜디오'
  | '드레스'
  | '메이크업'
  | '기타'

export type ReceiptReview = {
  id: string
  postTitle: string
  submitter: string
  category: ReceiptCategory
  vendor: string
  claimedAmount: number
  imageCount: number
  submittedAt: string
  status: ReceiptStatus
  /** 반려 시 관리자가 남긴 사유 */
  rejectReason?: string
}

export const receiptReviews: ReceiptReview[] = [
  {
    id: 'r1',
    postTitle: '강남 S컨벤션 웨딩홀 솔직 후기',
    submitter: '행복한신부',
    category: '웨딩홀',
    vendor: '강남 S컨벤션',
    claimedAmount: 32000000,
    imageCount: 3,
    submittedAt: '2026-07-18 09:14',
    status: '검토대기',
  },
  {
    id: 'r2',
    postTitle: '청담 A스튜디오 촬영 후기',
    submitter: '웨딩마스터',
    category: '스튜디오',
    vendor: '청담 A스튜디오',
    claimedAmount: 2500000,
    imageCount: 2,
    submittedAt: '2026-07-18 08:02',
    status: '검토대기',
  },
  {
    id: 'r3',
    postTitle: '압구정 드레스샵 3곳 비교 후기',
    submitter: '5월의신부',
    category: '드레스',
    vendor: '압구정 L드레스',
    claimedAmount: 4800000,
    imageCount: 5,
    submittedAt: '2026-07-17 21:40',
    status: '검토대기',
  },
  {
    id: 'r4',
    postTitle: '본식 헤어메이크업 실제 견적 공개',
    submitter: '성수동커플',
    category: '메이크업',
    vendor: '청담 M스튜디오',
    claimedAmount: 1200000,
    imageCount: 1,
    submittedAt: '2026-07-17 15:22',
    status: '승인',
  },
  {
    id: 'r5',
    postTitle: '해운대 호텔 웨딩 총 비용 정리',
    submitter: '알뜰신랑',
    category: '웨딩홀',
    vendor: '해운대 P호텔',
    claimedAmount: 41500000,
    imageCount: 4,
    submittedAt: '2026-07-16 19:05',
    status: '승인',
  },
  {
    id: 'r6',
    postTitle: '스드메 패키지 최저가 후기',
    submitter: '광고봇123',
    category: '기타',
    vendor: '(미확인 업체)',
    claimedAmount: 990000,
    imageCount: 1,
    submittedAt: '2026-07-16 11:33',
    status: '반려',
    rejectReason: '영수증 이미지가 판독 불가하며 업체명이 확인되지 않음',
  },
  {
    id: 'r7',
    postTitle: '제주 야외 웨딩 실비 후기',
    submitter: '제주로가자',
    category: '웨딩홀',
    vendor: '서귀포 O가든',
    claimedAmount: 18700000,
    imageCount: 3,
    submittedAt: '2026-07-15 14:48',
    status: '승인',
  },
  {
    id: 'r8',
    postTitle: '마포 소규모 웨딩홀 견적서',
    submitter: '알뜰신랑',
    category: '웨딩홀',
    vendor: '마포 K하우스',
    claimedAmount: 9800000,
    imageCount: 2,
    submittedAt: '2026-07-15 10:11',
    status: '반려',
    rejectReason: '견적서만 첨부됨 — 결제 완료 영수증 필요',
  },
]

/* ========================== 플래너 / 포트폴리오 ========================== */

export type PlannerApplicationStatus = '서류검토' | '승인' | '반려' | '보류'

export type PlannerApplication = {
  id: string
  name: string
  avatar: string
  agency: string
  career: string
  region: string
  specialties: string[]
  documents: { label: string; uploaded: boolean }[]
  appliedAt: string
  status: PlannerApplicationStatus
}

export const plannerApplications: PlannerApplication[] = [
  {
    id: 'pa1',
    name: '최민서',
    avatar: '/weddings/planner-1.png',
    agency: '프리랜서',
    career: '5년',
    region: '서울 강남',
    specialties: ['스몰웨딩', '하우스웨딩'],
    documents: [
      { label: '사업자등록증', uploaded: true },
      { label: '재직/경력 증명', uploaded: true },
      { label: '포트폴리오', uploaded: true },
    ],
    appliedAt: '2026-07-18',
    status: '서류검토',
  },
  {
    id: 'pa2',
    name: '한지우',
    avatar: '/weddings/planner-2.png',
    agency: 'W웨딩컴퍼니',
    career: '9년',
    region: '경기 성남',
    specialties: ['호텔웨딩', '럭셔리웨딩'],
    documents: [
      { label: '사업자등록증', uploaded: true },
      { label: '재직/경력 증명', uploaded: true },
      { label: '포트폴리오', uploaded: false },
    ],
    appliedAt: '2026-07-17',
    status: '보류',
  },
  {
    id: 'pa3',
    name: '오세훈',
    avatar: '/weddings/planner-3.png',
    agency: '제주드림웨딩',
    career: '3년',
    region: '제주 서귀포',
    specialties: ['제주웨딩', '야외웨딩'],
    documents: [
      { label: '사업자등록증', uploaded: true },
      { label: '재직/경력 증명', uploaded: false },
      { label: '포트폴리오', uploaded: true },
    ],
    appliedAt: '2026-07-16',
    status: '서류검토',
  },
  {
    id: 'pa4',
    name: '윤소라',
    avatar: '/weddings/planner-4.png',
    agency: '프리랜서',
    career: '12년',
    region: '부산 해운대',
    specialties: ['채플웨딩', '호텔웨딩'],
    documents: [
      { label: '사업자등록증', uploaded: true },
      { label: '재직/경력 증명', uploaded: true },
      { label: '포트폴리오', uploaded: true },
    ],
    appliedAt: '2026-07-14',
    status: '승인',
  },
  {
    id: 'pa5',
    name: '강태winner',
    avatar: '/weddings/planner-1.png',
    agency: '(미기재)',
    career: '-',
    region: '-',
    specialties: [],
    documents: [
      { label: '사업자등록증', uploaded: false },
      { label: '재직/경력 증명', uploaded: false },
      { label: '포트폴리오', uploaded: false },
    ],
    appliedAt: '2026-07-13',
    status: '반려',
  },
]

export type PortfolioReviewStatus = '검토대기' | '게시중' | '반려'

export type PortfolioReview = {
  id: string
  title: string
  planner: string
  type: string
  region: string
  imageCount: number
  submittedAt: string
  status: PortfolioReviewStatus
}

export const portfolioReviews: PortfolioReview[] = [
  {
    id: 'pf1',
    title: '초록이 가득한 가든 웨딩',
    planner: '김하나',
    type: '가든웨딩',
    region: '경기 양평',
    imageCount: 24,
    submittedAt: '2026-07-18',
    status: '검토대기',
  },
  {
    id: 'pf2',
    title: '시그니처 호텔 그랜드 볼룸',
    planner: '이서연',
    type: '호텔웨딩',
    region: '서울 중구',
    imageCount: 31,
    submittedAt: '2026-07-17',
    status: '검토대기',
  },
  {
    id: 'pf3',
    title: '제주 절벽 위 야외 예식',
    planner: '박준호',
    type: '제주웨딩',
    region: '제주 서귀포',
    imageCount: 18,
    submittedAt: '2026-07-16',
    status: '게시중',
  },
  {
    id: 'pf4',
    title: '클래식 채플 웨딩 아카이브',
    planner: '정유진',
    type: '채플웨딩',
    region: '서울 강남',
    imageCount: 12,
    submittedAt: '2026-07-15',
    status: '게시중',
  },
  {
    id: 'pf5',
    title: '역대급 최저가 스드메 패키지 문의주세요',
    planner: '강태winner',
    type: '기타',
    region: '-',
    imageCount: 2,
    submittedAt: '2026-07-13',
    status: '반려',
  },
]

/* ========================= 커뮤니티 모더레이션 ========================= */

export type ReportTargetType = '게시글' | '후기' | '댓글'
export type ReportReason =
  | '광고/스팸'
  | '허위정보'
  | '욕설/비방'
  | '개인정보 노출'
  | '기타'
export type ReportStatus = '처리대기' | '삭제됨' | '경고' | '반려'

export type ContentReport = {
  id: string
  targetType: ReportTargetType
  targetTitle: string
  excerpt: string
  author: string
  reason: ReportReason
  reportCount: number
  reportedAt: string
  status: ReportStatus
}

export const contentReports: ContentReport[] = [
  {
    id: 'rp1',
    targetType: '게시글',
    targetTitle: '스드메 패키지 최저가 후기',
    excerpt:
      '지금 문의하시면 특가로 진행 가능합니다. 카톡 ID로 연락주세요 →',
    author: '광고봇123',
    reason: '광고/스팸',
    reportCount: 14,
    reportedAt: '2026-07-18 10:22',
    status: '처리대기',
  },
  {
    id: 'rp2',
    targetType: '댓글',
    targetTitle: '강남 S컨벤션 웨딩홀 솔직 후기',
    excerpt: '이런 것도 후기라고 올리나요? 수준이 정말...',
    author: '알뜰신랑',
    reason: '욕설/비방',
    reportCount: 5,
    reportedAt: '2026-07-18 08:47',
    status: '처리대기',
  },
  {
    id: 'rp3',
    targetType: '후기',
    targetTitle: '청담 A스튜디오 촬영 후기',
    excerpt: '담당 실장님 성함이 김OO이고 연락처는 010-...',
    author: '웨딩마스터',
    reason: '개인정보 노출',
    reportCount: 3,
    reportedAt: '2026-07-17 22:15',
    status: '처리대기',
  },
  {
    id: 'rp4',
    targetType: '게시글',
    targetTitle: '여기 웨딩홀 절대 가지 마세요',
    excerpt: '식대가 12만원이라고 했는데 알고보니 20만원이었습니다...',
    author: '제주로가자',
    reason: '허위정보',
    reportCount: 8,
    reportedAt: '2026-07-17 13:30',
    status: '경고',
  },
  {
    id: 'rp5',
    targetType: '댓글',
    targetTitle: '본식 헤어메이크업 실제 견적 공개',
    excerpt: '정보 감사합니다! 저도 참고할게요',
    author: '5월의신부',
    reason: '기타',
    reportCount: 1,
    reportedAt: '2026-07-16 17:05',
    status: '반려',
  },
  {
    id: 'rp6',
    targetType: '게시글',
    targetTitle: '초특가 예식장 단체 공구합니다',
    excerpt: '선착순 10팀 한정! 링크 클릭하고 바로 신청하세요',
    author: '광고봇123',
    reason: '광고/스팸',
    reportCount: 21,
    reportedAt: '2026-07-15 09:58',
    status: '삭제됨',
  },
]

/* ============================ 대시보드 지표 ============================ */

/**
 * 일별 트래픽. 실제 연동 시 이벤트 로그 테이블의
 * 일자별 집계 쿼리 결과로 대체하세요.
 */
export type TrafficPoint = {
  date: string
  views: number
  clicks: number
  signups: number
}

export const trafficSeries: TrafficPoint[] = [
  { date: '07-05', views: 8420, clicks: 2180, signups: 34 },
  { date: '07-06', views: 9130, clicks: 2465, signups: 41 },
  { date: '07-07', views: 8760, clicks: 2290, signups: 29 },
  { date: '07-08', views: 10240, clicks: 2870, signups: 52 },
  { date: '07-09', views: 11080, clicks: 3120, signups: 61 },
  { date: '07-10', views: 12640, clicks: 3640, signups: 74 },
  { date: '07-11', views: 14210, clicks: 4180, signups: 88 },
  { date: '07-12', views: 13870, clicks: 3990, signups: 79 },
  { date: '07-13', views: 11520, clicks: 3210, signups: 55 },
  { date: '07-14', views: 12080, clicks: 3405, signups: 63 },
  { date: '07-15', views: 13340, clicks: 3810, signups: 71 },
  { date: '07-16', views: 14760, clicks: 4320, signups: 84 },
  { date: '07-17', views: 16120, clicks: 4890, signups: 97 },
  { date: '07-18', views: 15480, clicks: 4610, signups: 92 },
]

export type SummaryStat = {
  key: string
  label: string
  value: string
  /** 전주 대비 증감률(%). 음수면 감소 */
  delta: number
  hint: string
}

export const summaryStats: SummaryStat[] = [
  {
    key: 'dau',
    label: '일간 방문자',
    value: '15,480',
    delta: 12.4,
    hint: '전주 동일 대비',
  },
  {
    key: 'clicks',
    label: '콘텐츠 클릭',
    value: '4,610',
    delta: 8.9,
    hint: '포트폴리오 · 후기 합산',
  },
  {
    key: 'signups',
    label: '신규 가입',
    value: '92',
    delta: 17.9,
    hint: '전주 동일 대비',
  },
  {
    key: 'consult',
    label: '상담 신청',
    value: '38',
    delta: -4.2,
    hint: '전주 동일 대비',
  },
]

/** 클릭이 많이 발생한 콘텐츠 — 클릭 추적 도입 시 실데이터로 교체 */
export type TopContent = {
  id: string
  title: string
  kind: '포트폴리오' | '후기' | '플래너'
  views: number
  clicks: number
}

export const topContents: TopContent[] = [
  {
    id: 't1',
    title: '초록이 가득한 가든 웨딩',
    kind: '포트폴리오',
    views: 4820,
    clicks: 1640,
  },
  {
    id: 't2',
    title: '강남 S컨벤션 웨딩홀 솔직 후기',
    kind: '후기',
    views: 4210,
    clicks: 1390,
  },
  {
    id: 't3',
    title: '김하나 플래너',
    kind: '플래너',
    views: 3760,
    clicks: 1285,
  },
  {
    id: 't4',
    title: '시그니처 호텔 그랜드 볼룸',
    kind: '포트폴리오',
    views: 3540,
    clicks: 1102,
  },
  {
    id: 't5',
    title: '청담 A스튜디오 촬영 후기',
    kind: '후기',
    views: 2980,
    clicks: 964,
  },
  {
    id: 't6',
    title: '박준호 플래너',
    kind: '플래너',
    views: 2610,
    clicks: 878,
  },
]

/** 예비부부 전환 퍼널 */
export type FunnelStep = {
  label: string
  value: number
}

export const conversionFunnel: FunnelStep[] = [
  { label: '방문', value: 15480 },
  { label: '콘텐츠 조회', value: 8940 },
  { label: '플래너 상세', value: 3210 },
  { label: '찜/좋아요', value: 1180 },
  { label: '상담 신청', value: 38 },
]

/* ============================ 공통 헬퍼 ============================ */

/** 상태 → 배지 클래스. 성공 green / 대기 amber / 에러 destructive 규칙 준수 */
export const adminStatusStyles: Record<string, string> = {
  // 회원
  정상: 'bg-emerald-100 text-emerald-700',
  휴면: 'bg-muted text-muted-foreground',
  정지: 'bg-destructive/10 text-destructive',
  탈퇴: 'bg-muted text-muted-foreground',
  // 심사 공통
  검토대기: 'bg-amber-100 text-amber-700',
  서류검토: 'bg-amber-100 text-amber-700',
  처리대기: 'bg-amber-100 text-amber-700',
  보류: 'bg-secondary text-secondary-foreground',
  승인: 'bg-emerald-100 text-emerald-700',
  게시중: 'bg-emerald-100 text-emerald-700',
  반려: 'bg-destructive/10 text-destructive',
  삭제됨: 'bg-destructive/10 text-destructive',
  경고: 'bg-amber-100 text-amber-700',
}

export function formatWon(amount: number) {
  if (amount >= 100000000) return `${(amount / 100000000).toFixed(1)}억원`
  return `${Math.round(amount / 10000).toLocaleString()}만원`
}
