export type Planner = {
  id: string
  name: string
  avatar: string
  verified: boolean
  rating: number
  reviews: number
  consultations: number
  responseTime: string
  specialties: string[]
  intro: string
}

export type Portfolio = {
  id: string
  image: string
  height: number
  title: string
  type: string
  region: string
  badge?: 'BEST' | 'NEW' | '인기' | '응답빠름'
  likes: number
  views: number
  comments: number
  rating: number
  budget?: string
  planner: Planner
}

export const planners: Planner[] = [
  {
    id: 'p1',
    name: '김하나',
    avatar: '/weddings/planner-1.png',
    verified: true,
    rating: 4.9,
    reviews: 312,
    consultations: 1240,
    responseTime: '평균 12분',
    specialties: ['스몰웨딩', '하우스웨딩', '가든웨딩'],
    intro:
      '감성적인 스몰웨딩과 하우스웨딩을 전문으로 합니다. 신랑신부의 이야기를 담은 단 하나의 웨딩을 만들어 드립니다.',
  },
  {
    id: 'p2',
    name: '이서연',
    avatar: '/weddings/planner-2.png',
    verified: true,
    rating: 4.8,
    reviews: 268,
    consultations: 980,
    responseTime: '평균 18분',
    specialties: ['호텔웨딩', '럭셔리웨딩', '채플웨딩'],
    intro:
      '국내 최고급 호텔 웨딩과 럭셔리 채플 웨딩 전문 플래너입니다. 품격 있는 하루를 완성합니다.',
  },
  {
    id: 'p3',
    name: '박준호',
    avatar: '/weddings/planner-3.png',
    verified: true,
    rating: 4.9,
    reviews: 401,
    consultations: 1530,
    responseTime: '평균 9분',
    specialties: ['야외웨딩', '가든웨딩', '제주웨딩'],
    intro:
      '자연 속에서 빛나는 야외웨딩과 제주 웨딩을 전문으로 합니다. 계절의 아름다움을 담아냅니다.',
  },
  {
    id: 'p4',
    name: '정유진',
    avatar: '/weddings/planner-4.png',
    verified: true,
    rating: 4.7,
    reviews: 187,
    consultations: 720,
    responseTime: '평균 22분',
    specialties: ['채플웨딩', '호텔웨딩', '스몰웨딩'],
    intro:
      '클래식하고 우아한 채플 웨딩의 정석. 디테일 하나까지 섬세하게 챙기는 플래너입니다.',
  },
]

export const portfolios: Portfolio[] = [
  {
    id: 'w1',
    image: '/weddings/garden-1.png',
    height: 420,
    title: '초록이 가득한 가든 웨딩',
    type: '가든웨딩',
    region: '경기',
    badge: 'BEST',
    likes: 521,
    views: 12523,
    comments: 342,
    rating: 4.9,
    planner: planners[0],
  },
  {
    id: 'w2',
    image: '/weddings/hotel-1.png',
    height: 320,
    title: '샹들리에 아래 럭셔리 호텔 웨딩',
    type: '호텔웨딩',
    region: '서울',
    badge: '인기',
    likes: 1204,
    views: 28210,
    comments: 512,
    rating: 4.8,
    planner: planners[1],
  },
  {
    id: 'w3',
    image: '/weddings/outdoor-1.png',
    height: 480,
    title: '골든아워의 야외 예식',
    type: '야외웨딩',
    region: '제주',
    badge: 'NEW',
    likes: 832,
    views: 18900,
    comments: 277,
    rating: 4.9,
    planner: planners[2],
  },
  {
    id: 'w4',
    image: '/weddings/bride-1.png',
    height: 360,
    title: '레이스 드레스 브라이덜 스타일링',
    type: '스몰웨딩',
    region: '서울',
    likes: 645,
    views: 9800,
    comments: 188,
    rating: 4.7,
    planner: planners[3],
  },
  {
    id: 'w5',
    image: '/weddings/table-1.png',
    height: 300,
    title: '블러쉬 톤 리셉션 테이블 세팅',
    type: '하우스웨딩',
    region: '경기',
    badge: '응답빠름',
    likes: 423,
    views: 7200,
    comments: 96,
    rating: 4.9,
    planner: planners[0],
  },
  {
    id: 'w6',
    image: '/weddings/flowers-1.png',
    height: 440,
    title: '화이트 로즈 플로럴 인스톨레이션',
    type: '하우스웨딩',
    region: '서울',
    likes: 988,
    views: 21300,
    comments: 401,
    rating: 4.8,
    planner: planners[1],
  },
  {
    id: 'w7',
    image: '/weddings/small-1.png',
    height: 340,
    title: '캔들이 함께한 인티메이트 웨딩',
    type: '스몰웨딩',
    region: '인천',
    badge: 'BEST',
    likes: 712,
    views: 14400,
    comments: 233,
    rating: 4.9,
    planner: planners[3],
  },
  {
    id: 'w8',
    image: '/weddings/chapel-1.png',
    height: 500,
    title: '아치형 창의 클래식 채플 웨딩',
    type: '채플웨딩',
    region: '서울',
    likes: 1102,
    views: 25600,
    comments: 389,
    rating: 4.8,
    planner: planners[1],
  },
  {
    id: 'w9',
    image: '/weddings/house-1.png',
    height: 380,
    title: '프라이빗 빌라 테라스 웨딩',
    type: '하우스웨딩',
    region: '경기',
    badge: '인기',
    likes: 567,
    views: 11200,
    comments: 145,
    rating: 4.7,
    planner: planners[0],
  },
  {
    id: 'w10',
    image: '/weddings/jeju-1.png',
    height: 460,
    title: '제주 바다 절벽 위의 예식',
    type: '제주웨딩',
    region: '제주',
    badge: 'NEW',
    likes: 1340,
    views: 31000,
    comments: 567,
    rating: 4.9,
    planner: planners[2],
  },
  {
    id: 'w11',
    image: '/weddings/couple-1.png',
    height: 350,
    title: '석양 아래 커플 웨딩 촬영',
    type: '야외웨딩',
    region: '부산',
    likes: 876,
    views: 17800,
    comments: 298,
    rating: 4.9,
    planner: planners[2],
  },
  {
    id: 'w12',
    image: '/weddings/reception-1.png',
    height: 400,
    title: '플라워 시어링 밤의 리셉션',
    type: '호텔웨딩',
    region: '서울',
    badge: 'BEST',
    likes: 1455,
    views: 33400,
    comments: 612,
    rating: 4.8,
    planner: planners[1],
  },
  {
    id: 'w13',
    image: '/weddings/hall-1.png',
    height: 470,
    title: '플라워 아일을 따라 걷는 웨딩홀',
    type: '채플웨딩',
    region: '서울',
    likes: 934,
    views: 20100,
    comments: 312,
    rating: 4.8,
    planner: planners[3],
  },
  {
    id: 'w14',
    image: '/weddings/garden-1.png',
    height: 330,
    title: '봄 정원의 화이트 가든 파티',
    type: '가든웨딩',
    region: '경기',
    badge: '응답빠름',
    likes: 489,
    views: 8900,
    comments: 122,
    rating: 4.9,
    planner: planners[0],
  },
  {
    id: 'w15',
    image: '/weddings/outdoor-1.png',
    height: 420,
    title: '숲 속 자연 채광 세레모니',
    type: '야외웨딩',
    region: '경기',
    likes: 701,
    views: 13600,
    comments: 207,
    rating: 4.9,
    planner: planners[2],
  },
  {
    id: 'w16',
    image: '/weddings/hotel-1.png',
    height: 360,
    title: '시그니처 그랜드 볼룸 웨딩',
    type: '호텔웨딩',
    region: '부산',
    badge: '인기',
    likes: 1023,
    views: 23800,
    comments: 445,
    rating: 4.8,
    planner: planners[1],
  },
  {
    id: 'w17',
    image: '/weddings/table-1.png',
    height: 310,
    title: '미니멀 화이트 테이블 스케이프',
    type: '스몰웨딩',
    region: '서울',
    likes: 356,
    views: 6400,
    comments: 78,
    rating: 4.7,
    planner: planners[3],
  },
  {
    id: 'w18',
    image: '/weddings/flowers-1.png',
    height: 450,
    title: '캐스케이딩 부케 & 플로럴',
    type: '가든웨딩',
    region: '제주',
    badge: 'NEW',
    likes: 1187,
    views: 27500,
    comments: 478,
    rating: 4.9,
    planner: planners[2],
  },
  {
    id: 'w19',
    image: '/weddings/small-1.png',
    height: 370,
    title: '따뜻한 조명의 소규모 예식',
    type: '스몰웨딩',
    region: '인천',
    likes: 542,
    views: 10100,
    comments: 156,
    rating: 4.9,
    planner: planners[0],
  },
  {
    id: 'w20',
    image: '/weddings/chapel-1.png',
    height: 430,
    title: '스테인드글라스 채플의 빛',
    type: '채플웨딩',
    region: '서울',
    badge: 'BEST',
    likes: 1298,
    views: 29900,
    comments: 534,
    rating: 4.8,
    planner: planners[3],
  },
]

/**
 * Advertisement model — structured for a future ad management system.
 * Each field maps to a column an admin would edit when scheduling sponsored slots.
 */
export type Advertisement = {
  id: string
  slot: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  destinationUrl: string
  advertiserName: string
  startDate: string
  endDate: string
  /** Lower number = higher exposure priority */
  exposurePriority: number
}

export const advertisements: Advertisement[] = [
  {
    id: 'ad-01',
    slot: '광고 배너 슬롯 01',
    title: '2026 웨딩 박람회',
    subtitle: '무료 초대권 증정',
    description: '국내 최대 웨딩 박람회',
    image: '/ads/fair.png',
    ctaText: '신청하기',
    destinationUrl: '/ads/wedding-fair-2026',
    advertiserName: '코리아 웨딩 페어',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    exposurePriority: 1,
  },
  {
    id: 'ad-02',
    slot: '광고 배너 슬롯 02',
    title: '제휴 스튜디오 특별 할인',
    subtitle: '웨딩 촬영 최대 20% 할인',
    description: '프리미엄 제휴 스튜디오 한정 혜택',
    image: '/ads/studio.png',
    ctaText: '자세히 보기',
    destinationUrl: '/ads/studio-discount',
    advertiserName: '루미에르 스튜디오',
    startDate: '2026-02-01',
    endDate: '2026-05-31',
    exposurePriority: 2,
  },
  {
    id: 'ad-03',
    slot: '광고 배너 슬롯 03',
    title: '웨딩링 프로모션',
    subtitle: '최대 30% 할인',
    description: '전국 매장 이용 가능',
    image: '/ads/ring.png',
    ctaText: '바로가기',
    destinationUrl: '/ads/wedding-ring',
    advertiserName: '에떼르넬 주얼리',
    startDate: '2026-01-15',
    endDate: '2026-04-30',
    exposurePriority: 3,
  },
  {
    id: 'ad-04',
    slot: '광고 배너 슬롯 04',
    title: '몰디브 허니문 특가',
    subtitle: '5박 7일 패키지',
    description: '한정 프로모션 진행중',
    image: '/ads/honeymoon.png',
    ctaText: '예약하기',
    destinationUrl: '/ads/maldives-honeymoon',
    advertiserName: '오션뷰 허니문',
    startDate: '2026-03-01',
    endDate: '2026-07-31',
    exposurePriority: 4,
  },
  {
    id: 'ad-05',
    slot: '광고 배너 슬롯 05',
    title: '프리미엄 웨딩홀 추천',
    subtitle: '실시간 예약 가능',
    description: '전국 프리미엄 웨딩홀 한눈에',
    image: '/ads/hall.png',
    ctaText: '둘러보기',
    destinationUrl: '/ads/premium-halls',
    advertiserName: '더 그랜드 웨딩홀',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    exposurePriority: 5,
  },
]

/**
 * Shared budget tiers so the portfolio card display and the filter bar stay in sync.
 * Index order matters: 0 → lowest, 3 → luxury.
 */
export const budgetTierLabels = [
  '1,000~3,000만원',
  '3,000~5,000만원',
  '5,000만원 이상',
  '럭셔리 웨딩',
] as const

export function budgetTierIndex(item: Portfolio) {
  return item.id.charCodeAt(item.id.length - 1) % budgetTierLabels.length
}

export function budgetLabel(item: Portfolio) {
  return budgetTierLabels[budgetTierIndex(item)]
}

export const popularTags = [
  '#스몰웨딩',
  '#호텔웨딩',
  '#야외웨딩',
  '#하우스웨딩',
  '#제주웨딩',
  '#채플웨딩',
  '#가든웨딩',
  '#럭셔리웨딩',
]

export const searchExamples = ['야외웨딩', '호텔웨딩', '제주웨딩', '스몰웨딩', '가든웨딩']

export const filterGroups = {
  지역: ['서울', '경기', '인천', '부산', '제주'],
  예산: ['1000만원 이하', '1000~3000만원', '3000~5000만원', '5000만원 이상'],
  웨딩형태: ['스몰웨딩', '호텔웨딩', '야외웨딩', '하우스웨딩', '채플웨딩', '가든웨딩'],
  별점: ['4.0+', '4.5+', '4.8+'],
  추가필터: ['상담 가능', '응답 빠름', '인증 플래너', '인기 플래너', '신규 플래너'],
}

export const sortOptions = [
  '추천순',
  '인기순',
  '최신순',
  '별점순',
  '후기순',
  '상담 많은순',
  '응답 빠른순',
]
