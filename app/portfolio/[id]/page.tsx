import { notFound } from 'next/navigation'
import { portfolios } from '@/lib/wedding-data'
import {
  PortfolioDetailClient,
  type Review,
} from '@/components/portfolio-detail-client'

export function generateStaticParams() {
  return portfolios.map((p) => ({ id: p.id }))
}

const imagePool = [
  '/weddings/garden-1.png',
  '/weddings/hotel-1.png',
  '/weddings/outdoor-1.png',
  '/weddings/bride-1.png',
  '/weddings/table-1.png',
  '/weddings/flowers-1.png',
  '/weddings/small-1.png',
  '/weddings/chapel-1.png',
  '/weddings/house-1.png',
  '/weddings/jeju-1.png',
  '/weddings/couple-1.png',
  '/weddings/reception-1.png',
  '/weddings/hall-1.png',
]

function buildGallery(seedImage: string, count = 12) {
  const rest = imagePool.filter((src) => src !== seedImage)
  const gallery = [seedImage]
  let i = 0
  while (gallery.length < count) {
    gallery.push(rest[i % rest.length])
    i++
  }
  return gallery
}

const reviewSeed = [
  {
    name: '신부 김**',
    rating: 5,
    text: '처음부터 끝까지 너무 세심하게 챙겨주셔서 완벽한 하루를 보냈어요. 사진보다 실물이 훨씬 더 아름다웠습니다.',
    date: '2026.05',
    weddingDate: '2026.05.10',
    photos: ['/weddings/garden-1.png', '/weddings/table-1.png', '/weddings/flowers-1.png'],
  },
  {
    name: '신랑 이**',
    rating: 5,
    text: '예산 안에서 최고의 결과물을 만들어 주셨습니다. 응답도 정말 빠르고 믿음직스러웠어요.',
    date: '2026.04',
    weddingDate: '2026.04.18',
    photos: [],
  },
  {
    name: '신부 박**',
    rating: 4,
    text: '감각적인 플로럴 데코가 정말 인상적이었습니다. 하객분들 반응이 너무 좋았어요.',
    date: '2026.03',
    weddingDate: '2026.03.22',
    photos: ['/weddings/chapel-1.png', '/weddings/hall-1.png'],
  },
  {
    name: '신부 최**',
    rating: 5,
    text: '상담 때부터 신뢰가 갔어요. 모든 디테일을 꼼꼼하게 챙겨주셔서 마음 편히 결혼식을 즐겼습니다.',
    date: '2026.02',
    weddingDate: '2026.02.14',
    photos: ['/weddings/couple-1.png', '/weddings/reception-1.png', '/weddings/hotel-1.png', '/weddings/bride-1.png'],
  },
  {
    name: '신랑 정**',
    rating: 4,
    text: '바쁜 일정에도 항상 빠르게 답변 주셨고, 현장 진행도 매끄러웠습니다. 추천합니다.',
    date: '2026.01',
    weddingDate: '2026.01.27',
    photos: [],
  },
  {
    name: '신부 한**',
    rating: 5,
    text: '제가 꿈꾸던 분위기를 정확히 이해하고 구현해 주셨어요. 평생 기억에 남을 하루였습니다.',
    date: '2025.12',
    weddingDate: '2025.12.06',
    photos: ['/weddings/jeju-1.png', '/weddings/outdoor-1.png'],
  },
]

export default async function PortfolioDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = portfolios.find((p) => p.id === id)
  if (!item) notFound()

  const planner = item.planner
  const gallery = buildGallery(item.image, 12)
  const otherWorks = portfolios.filter(
    (p) => p.planner.id === planner.id && p.id !== item.id,
  )
  const related = portfolios
    .filter((p) => p.type === item.type && p.id !== item.id)
    .slice(0, 8)

  const reviews: Review[] = reviewSeed.map((r, i) => ({ ...r, id: `r-${i}` }))

  return (
    <PortfolioDetailClient
      item={item}
      gallery={gallery}
      otherWorks={otherWorks}
      related={related}
      reviews={reviews}
    />
  )
}
