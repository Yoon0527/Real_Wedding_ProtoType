import { portfolios, type Portfolio, type Planner } from '@/lib/wedding-data'

const byId = (id: string) => portfolios.find((p) => p.id === id) as Portfolio

/* ----------------------------- 좋아요 ----------------------------- */
export const likedPortfolios: Portfolio[] = [
  'w1',
  'w3',
  'w6',
  'w8',
  'w10',
  'w12',
  'w15',
  'w18',
  'w20',
].map(byId)

/* ----------------------------- 찜목록 ----------------------------- */
export const bookmarkedPortfolios: Portfolio[] = [
  'w2',
  'w5',
  'w8',
  'w11',
  'w13',
  'w16',
].map(byId)

/* -------------------------- 최근 본 게시물 -------------------------- */
export type RecentItem = {
  portfolio: Portfolio
  viewedAt: string
}

export type RecentGroup = {
  key: 'today' | 'yesterday' | 'week' | 'month'
  label: string
  items: RecentItem[]
}

export const recentGroups: RecentGroup[] = [
  {
    key: 'today',
    label: '오늘',
    items: [
      { portfolio: byId('w10'), viewedAt: '방금 전' },
      { portfolio: byId('w2'), viewedAt: '1시간 전' },
      { portfolio: byId('w18'), viewedAt: '3시간 전' },
    ],
  },
  {
    key: 'yesterday',
    label: '어제',
    items: [
      { portfolio: byId('w6'), viewedAt: '어제 오후 9:24' },
      { portfolio: byId('w13'), viewedAt: '어제 오후 2:10' },
    ],
  },
  {
    key: 'week',
    label: '이번 주',
    items: [
      { portfolio: byId('w1'), viewedAt: '3일 전' },
      { portfolio: byId('w16'), viewedAt: '4일 전' },
      { portfolio: byId('w8'), viewedAt: '5일 전' },
    ],
  },
  {
    key: 'month',
    label: '이번 달',
    items: [
      { portfolio: byId('w12'), viewedAt: '2주 전' },
      { portfolio: byId('w20'), viewedAt: '3주 전' },
    ],
  },
]

/* --------------------------- 플래너 상담내역 --------------------------- */
export type ConsultationStatus =
  | '대기중'
  | '상담중'
  | '예약확정'
  | '상담완료'
  | '취소'

export type TimelineStep = {
  label: string
  date: string
  done: boolean
}

export type Consultation = {
  id: string
  planner: Planner
  status: ConsultationStatus
  weddingType: string
  region: string
  requestedDate: string
  scheduleDate?: string
  budget: string
  message: string
  timeline: TimelineStep[]
  unreadMessages: number
}

const p = (id: string) => {
  const found = portfolios.find((x) => x.planner.id === id)?.planner
  return found as Planner
}

export const consultations: Consultation[] = [
  {
    id: 'c1',
    planner: p('p1'),
    status: '상담중',
    weddingType: '하우스웨딩',
    region: '서울 성수',
    requestedDate: '2026-01-12',
    scheduleDate: '2026-01-20 14:00',
    budget: '3,000 ~ 4,000만원',
    message:
      '5월 가든 하우스웨딩을 준비 중입니다. 하객 80명 규모로 따뜻한 분위기를 원해요.',
    unreadMessages: 2,
    timeline: [
      { label: '상담 요청', date: '01.12', done: true },
      { label: '플래너 응답', date: '01.12', done: true },
      { label: '상담 진행', date: '01.20', done: true },
      { label: '예약 확정', date: '-', done: false },
    ],
  },
  {
    id: 'c2',
    planner: p('p2'),
    status: '예약확정',
    weddingType: '호텔웨딩',
    region: '서울 중구',
    requestedDate: '2026-01-05',
    scheduleDate: '2026-01-15 11:00',
    budget: '6,000만원 이상',
    message:
      '시그니처 호텔 그랜드 볼룸 예식을 희망합니다. 럭셔리한 연출을 원합니다.',
    unreadMessages: 0,
    timeline: [
      { label: '상담 요청', date: '01.05', done: true },
      { label: '플래너 응답', date: '01.05', done: true },
      { label: '상담 진행', date: '01.10', done: true },
      { label: '예약 확정', date: '01.15', done: true },
    ],
  },
  {
    id: 'c3',
    planner: p('p3'),
    status: '대기중',
    weddingType: '제주웨딩',
    region: '제주 서귀포',
    requestedDate: '2026-01-18',
    budget: '4,000 ~ 5,000만원',
    message:
      '제주 바다 절벽 위 야외 예식을 알아보고 있습니다. 9월 일정 가능할까요?',
    unreadMessages: 0,
    timeline: [
      { label: '상담 요청', date: '01.18', done: true },
      { label: '플래너 응답', date: '-', done: false },
      { label: '상담 진행', date: '-', done: false },
      { label: '예약 확정', date: '-', done: false },
    ],
  },
  {
    id: 'c4',
    planner: p('p4'),
    status: '상담완료',
    weddingType: '채플웨딩',
    region: '서울 강남',
    requestedDate: '2025-12-20',
    scheduleDate: '2025-12-28 15:30',
    budget: '2,000 ~ 3,000만원',
    message: '클래식한 채플 웨딩을 원합니다. 12월 상담 완료했습니다.',
    unreadMessages: 1,
    timeline: [
      { label: '상담 요청', date: '12.20', done: true },
      { label: '플래너 응답', date: '12.20', done: true },
      { label: '상담 진행', date: '12.28', done: true },
      { label: '상담 완료', date: '12.29', done: true },
    ],
  },
  {
    id: 'c5',
    planner: p('p1'),
    status: '대기중',
    weddingType: '스몰웨딩',
    region: '경기 양평',
    requestedDate: '2026-01-19',
    budget: '1,000 ~ 2,000만원',
    message: '40명 규모의 감성 스몰웨딩을 계획 중입니다.',
    unreadMessages: 0,
    timeline: [
      { label: '상담 요청', date: '01.19', done: true },
      { label: '플래너 응답', date: '-', done: false },
      { label: '상담 진행', date: '-', done: false },
      { label: '예약 확정', date: '-', done: false },
    ],
  },
  {
    id: 'c6',
    planner: p('p2'),
    status: '취소',
    weddingType: '럭셔리웨딩',
    region: '부산 해운대',
    requestedDate: '2025-12-10',
    budget: '5,000만원 이상',
    message: '일정이 변경되어 상담을 취소했습니다.',
    unreadMessages: 0,
    timeline: [
      { label: '상담 요청', date: '12.10', done: true },
      { label: '플래너 응답', date: '12.11', done: true },
      { label: '상담 취소', date: '12.12', done: true },
    ],
  },
]

export const consultationStatuses: (ConsultationStatus | '전체')[] = [
  '전체',
  '대기중',
  '상담중',
  '예약확정',
  '상담완료',
  '취소',
]

export const statusStyles: Record<ConsultationStatus, string> = {
  대기중: 'bg-secondary text-secondary-foreground',
  상담중: 'bg-primary/15 text-primary',
  예약확정: 'bg-emerald-100 text-emerald-700',
  상담완료: 'bg-accent text-accent-foreground',
  취소: 'bg-muted text-muted-foreground',
}
