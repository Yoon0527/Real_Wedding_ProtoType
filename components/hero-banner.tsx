import Image from 'next/image'

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      <Image
        src="/weddings/hero.png"
        alt="플래너 라운지 히어로 배너"
        width={1200}
        height={420}
        priority
        className="h-56 w-full object-cover sm:h-72 md:h-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-6 sm:px-10 md:px-12">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          플래너 라운지
        </h1>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
          수천 개의 실제 웨딩 포트폴리오를 둘러보고
          <br className="hidden sm:block" />
          나와 가장 잘 맞는 웨딩 플래너를 발견하세요.
        </p>
      </div>
    </section>
  )
}
