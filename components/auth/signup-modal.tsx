"use client"

import { useState, useEffect, useRef } from "react"
import {
  X, ChevronLeft, ChevronRight, Check, Upload,
  Smartphone, FileText, MapPin, Wallet, Sparkles, User, Briefcase
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SignupModalProps {
  onClose: () => void
  onOpenLogin: () => void
}

type Role = "예비 신랑" | "예비 신부" | "남편" | "아내" | "플래너" | null

// ── Step definitions ──────────────────────────────────────────────────────
// Common: phone(0) → terms(1) → role(2)
// User (non-married): nickname(3) → date(4) → region(5) → budget(6) → style(7) → done
// User (married 남편/아내): nickname(3) → date(4) → done
// Planner: info(3) → region(4) → upload(5) → done

const WEDDING_STYLES = [
  "로맨틱", "모던", "내추럴", "클래식", "럭셔리", "미니멀",
  "빈티지", "보헤미안", "화이트", "가든 웨딩",
]

const PROVINCES = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]

const BUDGET_OPTIONS = [
  { label: "3천만원 미만", value: "under_30" },
  { label: "3천 ~ 5천만원", value: "30_50" },
  { label: "5천 ~ 7천만원", value: "50_70" },
  { label: "7천만원 ~ 1억", value: "70_100" },
  { label: "1억 이상", value: "over_100" },
]

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="px-6 pt-5 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-medium">{current} / {total} 단계</span>
        <span className="text-xs font-semibold text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Step Components ───────────────────────────────────────────────────────

function StepPhone({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [sent, setSent] = useState(false)
  const [verified, setVerified] = useState(false)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const sendCode = () => {
    setSent(true)
    setTimer(180)
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(intervalRef.current!); return 0 }
        return t - 1
      })
    }, 1000)
  }

  const verifyCode = () => {
    if (code === "123456" || code.length === 6) setVerified(true)
  }

  const formatTimer = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">본인 인증</h2>
        <p className="text-sm text-gray-500 mt-1">PASS 인증으로 본인 확인을 진행해 주세요.</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">휴대폰 번호</label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="01012345678"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              onClick={sendCode}
              disabled={phone.length < 10}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap",
                phone.length >= 10
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {sent ? "재전송" : "인증번호 전송"}
            </button>
          </div>
        </div>
        {sent && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">인증번호 6자리</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  className={cn(
                    "w-full px-4 py-3 pr-16 rounded-xl border bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-primary transition-colors",
                    verified ? "border-green-300 focus:ring-green-200" : "border-gray-200 focus:ring-primary/30"
                  )}
                />
                {timer > 0 && !verified && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 tabular-nums font-medium">
                    {formatTimer(timer)}
                  </span>
                )}
                {verified && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
              </div>
              {!verified && (
                <button
                  onClick={verifyCode}
                  disabled={code.length !== 6}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                    code.length === 6 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  확인
                </button>
              )}
            </div>
            {verified && (
              <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                <Check className="h-3 w-3" /> 인증이 완료되었습니다.
              </p>
            )}
          </div>
        )}
      </div>
      <button
        onClick={onNext}
        disabled={!verified}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          verified ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
    </div>
  )
}

function StepTerms({ onNext }: { onNext: () => void }) {
  const [all, setAll] = useState(false)
  const [required1, setRequired1] = useState(false)
  const [required2, setRequired2] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const toggleAll = (v: boolean) => {
    setAll(v); setRequired1(v); setRequired2(v); setMarketing(v)
  }
  const canProceed = required1 && required2

  const CheckRow = ({
    label, optional, checked, onChange
  }: { label: string; optional?: boolean; checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 py-2.5 text-left"
    >
      <span className={cn(
        "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
        checked ? "bg-primary border-primary" : "border-gray-300"
      )}>
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span className="flex-1 text-sm text-gray-700">{label}</span>
      {optional && <span className="text-xs text-gray-400 flex-shrink-0">(선택)</span>}
      {!optional && <span className="text-xs text-red-400 flex-shrink-0">(필수)</span>}
    </button>
  )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">약관 동의</h2>
        <p className="text-sm text-gray-500 mt-1">서비스 이용을 위해 약관에 동의해 주세요.</p>
      </div>
      <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200 px-4">
        <button
          onClick={() => toggleAll(!all)}
          className="w-full flex items-center gap-3 py-3.5"
        >
          <span className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            all ? "bg-primary border-primary" : "border-gray-300"
          )}>
            {all && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </span>
          <span className="flex-1 text-sm font-semibold text-gray-900">전체 동의</span>
        </button>
        <div className="py-1 space-y-0.5">
          <CheckRow label="서비스 이용약관" checked={required1} onChange={setRequired1} />
          <CheckRow label="개인정보 처리방침" checked={required2} onChange={setRequired2} />
          <CheckRow label="마케팅 정보 수신 동의" optional checked={marketing} onChange={setMarketing} />
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!canProceed}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          canProceed ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        동의하고 계속
      </button>
    </div>
  )
}

function StepRole({ onNext }: { onNext: (role: Role) => void }) {
  const [selected, setSelected] = useState<Role>(null)
  const roles: { value: Role; icon: string; desc: string }[] = [
    { value: "예비 신랑", icon: "👔", desc: "결혼을 준비 중인 예비 신랑" },
    { value: "예비 신부", icon: "👗", desc: "결혼을 준비 중인 예비 신부" },
    { value: "남편", icon: "💍", desc: "이미 결혼한 남편" },
    { value: "아내", icon: "💒", desc: "이미 결혼한 아내" },
    { value: "플래너", icon: "📋", desc: "웨딩 플래너 전문가" },
  ]
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">어떤 분이신가요?</h2>
        <p className="text-sm text-gray-500 mt-1">역할을 선택하면 맞춤 기능을 제공해 드립니다.</p>
      </div>
      <div className="space-y-2">
        {roles.map((r) => (
          <button
            key={r.value}
            onClick={() => setSelected(r.value)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all text-left",
              selected === r.value
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <span className="text-2xl">{r.icon}</span>
            <div className="flex-1">
              <p className={cn("text-sm font-semibold", selected === r.value ? "text-primary" : "text-gray-900")}>{r.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
            </div>
            <span className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
              selected === r.value ? "border-primary bg-primary" : "border-gray-300"
            )}>
              {selected === r.value && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          selected ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
    </div>
  )
}

function StepNickname({ onNext }: { onNext: (nickname: string) => void }) {
  const [value, setValue] = useState("")
  const isValid = value.length >= 2 && value.length <= 10
  const isDuplicate = value === "test" // mock

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">닉네임을 입력해 주세요</h2>
        <p className="text-sm text-gray-500 mt-1">2~10자 이내로 설정해 주세요.</p>
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 10))}
            placeholder="닉네임 입력"
            className={cn(
              "w-full px-4 py-3 pr-16 rounded-xl border bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors",
              isValid && !isDuplicate
                ? "border-green-300 focus:ring-green-200"
                : value.length > 0
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:ring-primary/30 focus:border-primary"
            )}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 tabular-nums">
            {value.length}/10
          </span>
        </div>
        {value.length > 0 && (
          <p className={cn("text-xs mt-1.5 flex items-center gap-1", isValid && !isDuplicate ? "text-green-600" : "text-red-500")}>
            {isValid && !isDuplicate ? (
              <><Check className="h-3 w-3" /> 사용 가능한 닉네임입니다.</>
            ) : isDuplicate ? (
              "이미 사용 중인 닉네임입니다."
            ) : (
              "2자 이상 입력해 주세요."
            )}
          </p>
        )}
      </div>
      <button
        onClick={() => isValid && !isDuplicate && onNext(value)}
        disabled={!isValid || isDuplicate}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          isValid && !isDuplicate ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
    </div>
  )
}

function StepWeddingDate({ onNext, onSkip }: { onNext: (date: string) => void; onSkip?: () => void }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(1)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">결혼 예정일</h2>
        <p className="text-sm text-gray-500 mt-1">예정된 웨딩 날짜를 알려주세요.</p>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">년도</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {years.map((y) => <option key={y} value={y}>{y}년</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">월</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {months.map((m) => <option key={m} value={m}>{m}월</option>)}
          </select>
        </div>
      </div>
      <button
        onClick={() => onNext(`${year}.${String(month).padStart(2, "0")}`)}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
      >
        다음
      </button>
      {onSkip && (
        <button onClick={onSkip} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          나중에 설정
        </button>
      )}
    </div>
  )
}

function StepRegion({ onNext, onSkip }: { onNext: (regions: string[]) => void; onSkip: () => void }) {
  const [regions, setRegions] = useState<string[]>([])
  const toggle = (r: string) => {
    if (regions.includes(r)) setRegions(regions.filter((x) => x !== r))
    else if (regions.length < 2) setRegions([...regions, r])
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">웨딩 지역 선택</h2>
        <p className="text-sm text-gray-500 mt-1">관심 지역을 최대 2곳까지 선택해 주세요.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PROVINCES.map((p) => (
          <button
            key={p}
            onClick={() => toggle(p)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all",
              regions.includes(p)
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-200 text-gray-600 hover:border-gray-300",
              !regions.includes(p) && regions.length >= 2 && "opacity-40 cursor-not-allowed"
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => onNext(regions)}
        disabled={regions.length === 0}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          regions.length > 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
      <button onClick={onSkip} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
        건너뛰기
      </button>
    </div>
  )
}

function StepBudget({ onNext, onSkip }: { onNext: (b: string) => void; onSkip: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">총 웨딩 예산</h2>
        <p className="text-sm text-gray-500 mt-1">대략적인 총 예산을 선택해 주세요.</p>
      </div>
      <div className="space-y-2">
        {BUDGET_OPTIONS.map((b) => (
          <button
            key={b.value}
            onClick={() => setSelected(b.value)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left",
              selected === b.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
            )}
          >
            <span className={cn("flex-1 text-sm font-medium", selected === b.value ? "text-primary" : "text-gray-700")}>
              {b.label}
            </span>
            <span className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
              selected === b.value ? "border-primary bg-primary" : "border-gray-300"
            )}>
              {selected === b.value && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          selected ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
      <button onClick={onSkip} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
        건너뛰기
      </button>
    </div>
  )
}

function StepStyle({ onNext, onSkip }: { onNext: (styles: string[]) => void; onSkip: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (s: string) => {
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">웨딩 스타일</h2>
        <p className="text-sm text-gray-500 mt-1">원하는 웨딩 분위기를 모두 선택해 주세요.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {WEDDING_STYLES.map((s) => (
          <button
            key={s}
            onClick={() => toggle(s)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
              selected.includes(s)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            #{s}
          </button>
        ))}
      </div>
      <button
        onClick={() => onNext(selected)}
        disabled={selected.length === 0}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          selected.length > 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
      <button onClick={onSkip} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
        건너뛰기
      </button>
    </div>
  )
}

// ── Planner Steps ─────────────────────────────────────────────────────────

function StepPlannerInfo({ onNext }: { onNext: (data: { company: string; position: string }) => void }) {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const canProceed = company.trim().length > 0 && position.trim().length > 0

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">플래너 정보</h2>
        <p className="text-sm text-gray-500 mt-1">업체명과 직함을 입력해 주세요.</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">실명 (인증 정보)</label>
          <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 select-none">
            홍길동 (PASS 인증 완료)
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">업체명</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="예: 로맨틱 웨딩 플래너"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">직함</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="예: 수석 웨딩 플래너"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>
      <button
        onClick={() => canProceed && onNext({ company, position })}
        disabled={!canProceed}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          canProceed ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
    </div>
  )
}

function StepPlannerRegion({ onNext }: { onNext: (regions: string[]) => void }) {
  const [regions, setRegions] = useState<string[]>([])
  const toggle = (r: string) => {
    if (regions.includes(r)) setRegions(regions.filter((x) => x !== r))
    else if (regions.length < 2) setRegions([...regions, r])
  }
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">서비스 지역</h2>
        <p className="text-sm text-gray-500 mt-1">주로 활동하는 지역을 최대 2곳 선택해 주세요.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PROVINCES.map((p) => (
          <button
            key={p}
            onClick={() => toggle(p)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all",
              regions.includes(p)
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-200 text-gray-600 hover:border-gray-300",
              !regions.includes(p) && regions.length >= 2 && "opacity-40 cursor-not-allowed"
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => regions.length > 0 && onNext(regions)}
        disabled={regions.length === 0}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          regions.length > 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        다음
      </button>
    </div>
  )
}

function StepPlannerUpload({ onNext }: { onNext: () => void }) {
  const [cardUploaded, setCardUploaded] = useState(false)
  const [licenseUploaded, setLicenseUploaded] = useState(false)

  const UploadZone = ({ label, uploaded, onUpload }: { label: string; uploaded: boolean; onUpload: () => void }) => (
    <button
      onClick={onUpload}
      className={cn(
        "w-full flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border-2 border-dashed transition-all",
        uploaded ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
      )}
    >
      {uploaded ? (
        <>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-sm font-medium text-green-700">업로드 완료</span>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="h-5 w-5 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <span className="text-xs text-gray-400">JPG, PNG, PDF 지원</span>
        </>
      )}
    </button>
  )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">서류 업로드</h2>
        <p className="text-sm text-gray-500 mt-1">플래너 인증을 위한 서류를 첨부해 주세요.</p>
      </div>
      <div className="space-y-3">
        <UploadZone
          label="명함 업로드"
          uploaded={cardUploaded}
          onUpload={() => setCardUploaded(true)}
        />
        <UploadZone
          label="자격증 / 재직증명서"
          uploaded={licenseUploaded}
          onUpload={() => setLicenseUploaded(true)}
        />
      </div>
      <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
        <span className="text-xs text-amber-700 leading-relaxed">
          서류 검토에 1~3 영업일이 소요됩니다. 승인 후 플래너 기능이 활성화됩니다.
        </span>
      </div>
      <button
        onClick={onNext}
        disabled={!cardUploaded || !licenseUploaded}
        className={cn(
          "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
          cardUploaded && licenseUploaded
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        가입 신청 완료
      </button>
    </div>
  )
}

function StepDone({ isPlanner, onClose }: { isPlanner: boolean; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        {isPlanner
          ? <Briefcase className="h-9 w-9 text-primary" />
          : <Check className="h-9 w-9 text-primary" />
        }
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          {isPlanner ? "신청이 완료되었습니다!" : "회원가입 완료!"}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          {isPlanner
            ? "서류 검토 후 플래너 기능이 활성화됩니다.\n결과는 등록하신 연락처로 안내드립니다."
            : "리얼웨딩에 오신 것을 환영합니다.\n팩트 인증된 결혼 정보를 마음껏 활용하세요!"}
        </p>
      </div>
      <button
        onClick={onClose}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
      >
        시작하기
      </button>
    </div>
  )
}

// ── Main SignupModal ──────────────────────────────────────────────────────

export function SignupModal({ onClose, onOpenLogin }: SignupModalProps) {
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<Role>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const isPlanner = role === "플래너"
  const isMarried = role === "남편" || role === "아내"

  // Build step sequence dynamically based on role
  const getSteps = (): string[] => {
    const base = ["phone", "terms", "role"]
    if (!role) return base
    if (isPlanner) return [...base, "planner-info", "planner-region", "planner-upload", "done"]
    if (isMarried) return [...base, "nickname", "date", "done"]
    return [...base, "nickname", "date", "region", "budget", "style", "done"]
  }

  const steps = getSteps()
  const totalSteps = steps.length - 1 // "done" not counted
  const currentStepName = steps[step]
  const isDone = currentStepName === "done"

  const goNext = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }
  const goBack = () => {
    if (step === 0) return
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const handleRoleSelect = (r: Role) => {
    setRole(r)
    goNext()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        style={{ maxHeight: "90dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <button
            onClick={step === 0 ? onClose : goBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="뒤로"
          >
            {step === 0 ? <X className="h-5 w-5 text-gray-400" /> : <ChevronLeft className="h-5 w-5 text-gray-500" />}
          </button>
          <span className="text-xs font-medium text-gray-400">회원가입</span>
          <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Progress bar (hidden on done screen) */}
        {!isDone && (
          <ProgressBar current={Math.min(step + 1, totalSteps)} total={totalSteps} />
        )}

        {/* Scrollable step content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-4">
          {currentStepName === "phone" && <StepPhone onNext={goNext} />}
          {currentStepName === "terms" && <StepTerms onNext={goNext} />}
          {currentStepName === "role" && <StepRole onNext={handleRoleSelect} />}
          {currentStepName === "nickname" && <StepNickname onNext={goNext} />}
          {currentStepName === "date" && (
            <StepWeddingDate
              onNext={goNext}
              onSkip={isMarried ? undefined : goNext}
            />
          )}
          {currentStepName === "region" && <StepRegion onNext={goNext} onSkip={goNext} />}
          {currentStepName === "budget" && <StepBudget onNext={goNext} onSkip={goNext} />}
          {currentStepName === "style" && <StepStyle onNext={goNext} onSkip={goNext} />}
          {currentStepName === "planner-info" && <StepPlannerInfo onNext={goNext} />}
          {currentStepName === "planner-region" && <StepPlannerRegion onNext={goNext} />}
          {currentStepName === "planner-upload" && <StepPlannerUpload onNext={goNext} />}
          {currentStepName === "done" && <StepDone isPlanner={isPlanner} onClose={onClose} />}
        </div>

        {/* Footer link (hide on done) */}
        {!isDone && (
          <div className="px-6 pb-5 pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-sm">
            <span className="text-gray-500">이미 계정이 있으신가요?</span>
            <button
              onClick={() => { onClose(); onOpenLogin() }}
              className="font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
