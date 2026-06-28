"use client"

import { useState, useRef, useEffect } from "react"
import {
  CheckCircle, ImageIcon, ChevronRight, ChevronLeft, ChevronDown,
  Camera, Pencil, Sparkles, MapPin, Calendar,
  Grid3X3, MessageSquare, Bookmark, Settings, X,
  Phone, HelpCircle, FileText, Shield, User, Lock, Bell, PenLine,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Constants ──────────────────────────────────────────────────────────────
const WEDDING_STYLES = [
  "#호텔웨딩", "#스몰웨딩", "#야외웨딩", "#하우스웨딩",
  "#가든웨딩", "#성당웨딩", "#한옥웨딩", "#해외웨딩",
]

const MY_POSTS = [
  { id: 1, title: "S컨벤션 웨딩홀 실제 비용 공개", category: "웨딩홀",   verified: true,  color: "from-primary/20 to-primary/5" },
  { id: 2, title: "강남 스튜디오 3곳 비교 솔직 후기", category: "스튜디오", verified: true,  color: "from-amber-100 to-amber-50" },
  { id: 3, title: "드레스 샵 예약 팁",               category: "드레스",   verified: false, color: "from-rose-100 to-rose-50" },
  { id: 4, title: "부케 업체 가격 비교",              category: "플라워",   verified: true,  color: "from-green-100 to-green-50" },
  { id: 5, title: "메이크업 샵 3곳 테스트",           category: "메이크업", verified: false, color: "from-purple-100 to-purple-50" },
  { id: 6, title: "본식 스냅 가격표 공개",             category: "스냅",    verified: true,  color: "from-sky-100 to-sky-50" },
]

const MY_COMMENTS = [
  { id: 1, postTitle: "서울숲 웨딩홀 후기",      comment: "저도 여기 알아보고 있었는데 정말 도움이 됐어요!", date: "2025.04.18" },
  { id: 2, postTitle: "메이크업 샵 추천 부탁",    comment: "청담동 OO샵 추천해요. 가격대비 퀄리티가 정말 좋았어요.", date: "2025.04.12" },
  { id: 3, postTitle: "본식 스냅 vs 영상 고민",  comment: "둘 다 하시는 게 좋아요. 영상만 했다가 후회했어요.", date: "2025.03.30" },
]

const MY_SAVED = [
  { id: 1, color: "from-pink-100 to-pink-50" },
  { id: 2, color: "from-amber-100 to-amber-50" },
  { id: 3, color: "from-sky-100 to-sky-50" },
  { id: 4, color: "from-violet-100 to-violet-50" },
  { id: 5, color: "from-green-100 to-green-50" },
  { id: 6, color: "from-orange-100 to-orange-50" },
]

// ── D-Day Ring ─────────────────────────────────────────────────────────────
// Mode A (pre-married): progress = elapsed / total, badge = D-N
// Mode B (married):     progress = 1 (always full), badge = D+N
function DayRing({ size = 128, progress }: { size?: number; progress: number }) {
  const stroke = 5
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * Math.min(1, Math.max(0, progress))
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 -rotate-90"
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="currentColor" strokeWidth={stroke} className="text-border" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        className="text-primary transition-all duration-1000" />
    </svg>
  )
}

// ── Toggle ─────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "w-11 h-6 rounded-full transition-colors relative flex-shrink-0",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <div className={cn(
        "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all",
        checked ? "left-6" : "left-1"
      )} />
    </button>
  )
}

// ── Wedding Style Modal ────────────────────────────────────────────────────
function WeddingStyleModal({
  open, onClose, selected, onChange,
}: {
  open: boolean; onClose: () => void; selected: string[]; onChange: (s: string[]) => void
}) {
  const [local, setLocal] = useState(selected)
  useEffect(() => { if (open) setLocal(selected) }, [open, selected])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-90 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">웨딩 스타일 선택</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs text-muted-foreground mb-4">관심 있는 웨딩 스타일을 선택해 주세요. (복수 선택 가능)</p>
          <div className="flex flex-wrap gap-2">
            {WEDDING_STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setLocal((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  local.includes(s)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            취소
          </button>
          <button
            onClick={() => { onChange(local); onClose() }}
            className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Settings Sub-Panels ────────────────────────────────────────────────────

// Shared sub-view header with back button
function SubViewHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-muted transition-colors" aria-label="뒤로">
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
    </div>
  )
}

// Email change — 3 steps
function EmailChangeView({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [password, setPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [error, setError] = useState("")

  const back = () => { setError(""); if (step === 1) onDone(); else setStep((s) => (s - 1) as 1 | 2 | 3) }

  return (
    <div>
      <SubViewHeader title="이메일 변경" onBack={back} />
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">본인 확인을 위해 현재 비밀번호를 입력해주세요.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError("") }}
            placeholder="현재 비밀번호"
            className={cn(
              "w-full px-3 py-2.5 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
              error ? "border-red-400" : "border-border"
            )}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={() => { if (!password.trim()) { setError("비밀번호를 입력해주세요"); return } setStep(2) }}
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            다음
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">새로 사용할 이메일 주소를 입력해주세요.</p>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => { setNewEmail(e.target.value); setError("") }}
            placeholder="새 이메일 주소"
            className={cn(
              "w-full px-3 py-2.5 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
              error ? "border-red-400" : "border-border"
            )}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={() => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) { setError("올바른 이메일 형식을 입력해주세요"); return }
              setStep(3)
            }}
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            인증 메일 발송
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center text-center gap-3 py-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">입력하신 이메일로 인증 메일을 발송했습니다.</p>
          <p className="text-xs text-muted-foreground">메일함을 확인하고 인증을 완료해주세요.</p>
          <button onClick={onDone} className="mt-2 w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            확인
          </button>
        </div>
      )}
    </div>
  )
}

// Password change — 3 steps
function PasswordChangeView({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const back = () => { setError(""); if (step === 1) onDone(); else setStep((s) => (s - 1) as 1 | 2 | 3) }

  return (
    <div>
      <SubViewHeader title="비밀번호 변경" onBack={back} />
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">현재 비밀번호를 입력해주세요.</p>
          <input
            type="password"
            value={current}
            onChange={(e) => { setCurrent(e.target.value); setError("") }}
            placeholder="현재 비밀번호"
            className={cn(
              "w-full px-3 py-2.5 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
              error ? "border-red-400" : "border-border"
            )}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={() => { if (!current.trim()) { setError("비밀번호를 입력해주세요"); return } setStep(2) }}
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            다음
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">새 비밀번호를 입력해주세요. (최소 8자)</p>
          <input
            type="password"
            value={next}
            onChange={(e) => { setNext(e.target.value); setError("") }}
            placeholder="새 비밀번호"
            className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setError("") }}
            placeholder="새 비밀번호 확인"
            className={cn(
              "w-full px-3 py-2.5 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
              error ? "border-red-400" : "border-border"
            )}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={() => {
              if (next.length < 8) { setError("비밀번호는 최소 8자 이상이어야 합니다"); return }
              if (next !== confirm) { setError("비밀번호가 일치하지 않습니다"); return }
              setStep(3)
            }}
            className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            변경 완료
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center text-center gap-3 py-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">비밀번호가 변경되었습니다.</p>
          <button onClick={onDone} className="mt-2 w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            확인
          </button>
        </div>
      )}
    </div>
  )
}

// Withdrawal — 2 steps
const WITHDRAW_REASONS = ["서비스 불만족", "정보가 부족함", "개인정보 보호", "재가입 예정", "기타"]
function WithdrawView({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [reason, setReason] = useState("")

  const back = () => { if (step === 1) onDone(); else setStep(1) }

  return (
    <div>
      <SubViewHeader title="회원 탈퇴" onBack={back} />
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">탈퇴 사유를 선택해주세요.</p>
          <div className="space-y-2">
            {WITHDRAW_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors",
                  reason === r ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
                )}
              >
                <span className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  reason === r ? "border-primary" : "border-muted-foreground/40"
                )}>
                  {reason === r && <span className="w-2 h-2 rounded-full bg-primary" />}
                </span>
                <span className="text-sm text-foreground">{r}</span>
              </button>
            ))}
          </div>
          <button
            disabled={!reason}
            onClick={() => setStep(2)}
            className={cn(
              "w-full py-2.5 text-sm font-bold rounded-xl transition-opacity",
              reason ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            다음
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl leading-relaxed">
            탈퇴 후 게시글·댓글은 삭제되지 않으며,<br />닉네임만 &apos;탈퇴한 사용자&apos;로 변경됩니다.
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-2.5 text-sm font-medium border border-border rounded-xl text-muted-foreground hover:bg-muted/40 transition-colors">
              취소
            </button>
            <button
              onClick={() => { alert("탈퇴 처리되었습니다."); onDone() }}
              className="flex-1 py-2.5 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

type AccountSubView = null | "email" | "password" | "withdraw"

function AccountPanel() {
  const [subView, setSubView] = useState<AccountSubView>(null)
  const [editingNickname, setEditingNickname] = useState(false)
  const [nickname, setNickname] = useState("예비신부123")
  const [nicknameInput, setNicknameInput] = useState(nickname)
  const [nicknameError, setNicknameError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasVerifiedReceipt = true

  const handleSave = () => {
    const t = nicknameInput.trim()
    if (t.length < 2 || t.length > 10) { setNicknameError("닉네임은 2~10자로 입력해주세요"); return }
    setNickname(t); setNicknameError(""); setEditingNickname(false)
  }

  if (subView === "email")    return <EmailChangeView    onDone={() => setSubView(null)} />
  if (subView === "password") return <PasswordChangeView onDone={() => setSubView(null)} />
  if (subView === "withdraw") return <WithdrawView       onDone={() => setSubView(null)} />

  return (
    <div className="space-y-4">
      {/* Profile picture */}
      <div className="p-4 bg-muted/40 rounded-2xl space-y-3 border border-border">
        <p className="text-sm font-semibold text-foreground">프로필 사진 편집</p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
              <span className="text-2xl font-bold text-primary">{nickname[0]}</span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
              aria-label="사진 변경"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            JPG, PNG 형식만 업로드 가능합니다.<br />최대 5MB까지 지원합니다.
          </p>
        </div>
      </div>

      {/* Nickname */}
      <div className="p-4 bg-muted/40 rounded-2xl space-y-3 border border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">닉네임 편집</p>
          {!editingNickname && (
            <button
              onClick={() => { setNicknameInput(nickname); setNicknameError(""); setEditingNickname(true) }}
              className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            >
              <Pencil className="h-3 w-3" />
              수정
            </button>
          )}
        </div>
        {editingNickname ? (
          <div className="space-y-2">
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => { setNicknameInput(e.target.value); setNicknameError("") }}
              placeholder="닉네임 입력"
              className={cn(
                "w-full px-3 py-2.5 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                nicknameError ? "border-red-400" : "border-border"
              )}
              maxLength={10}
            />
            <div className="flex items-center justify-between">
              <p className={cn("text-xs", nicknameError ? "text-red-500" : "text-muted-foreground")}>
                {nicknameError || `${nicknameInput.length}/10자 (최소 2자)`}
              </p>
              <div className="flex gap-2">
                <button onClick={() => { setEditingNickname(false); setNicknameError("") }} className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  취소
                </button>
                <button onClick={handleSave} className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  저장
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground">{nickname}</p>
        )}
      </div>

      {/* Wedding info */}
      <div className="p-4 bg-muted/40 rounded-2xl space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">웨딩 정보</p>
          {hasVerifiedReceipt && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full font-medium">
              <CheckCircle className="h-3 w-3" />
              인증 완료
            </span>
          )}
        </div>
        {hasVerifiedReceipt && (
          <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg space-y-0.5">
            <p>영수증 인증이 완료되어 웨딩 날짜와 장소�� 수정할 수 없습니다.</p>
            <p className="font-medium">영수증 인증이 완료된 항목은 수정할 수 없습니다.</p>
          </div>
        )}
        <div className="space-y-3">
          {[
            { icon: Calendar, label: "웨딩 날짜", value: "2025.10.12" },
            { icon: MapPin,   label: "웨딩 장소", value: "서울 강남구" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <div className="relative">
                  {hasVerifiedReceipt && (
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  )}
                  <input
                    type="text"
                    defaultValue={value}
                    disabled={hasVerifiedReceipt}
                    className={cn(
                      "w-full py-2 text-sm border rounded-lg",
                      hasVerifiedReceipt
                        ? "pl-8 pr-3 bg-muted text-muted-foreground border-border cursor-not-allowed"
                        : "px-3 bg-card border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account options */}
      <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
        {[
          { label: "이메일 변경",     sub: "kim***@email.com",      action: () => setSubView("email") },
          { label: "비밀번호 변경",   sub: "마지막 변경: 90일 전",  action: () => setSubView("password") },
          { label: "연결된 소셜 계정", sub: "카카오 연결됨",          action: undefined },
          { label: "회원 탈퇴",       sub: "",                      action: () => setSubView("withdraw"), danger: true },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3.5 transition-colors",
              item.danger ? "text-red-500 hover:bg-red-50" : "text-foreground hover:bg-muted/40"
            )}
          >
            <div className="text-left">
              <p className="text-sm font-medium">{item.label}</p>
              {item.sub && <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

function PrivacyPanel() {
  const [receiptMasking, setReceiptMasking]       = useState(true)
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [activityHistory, setActivityHistory]     = useState(false)
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, nickname: "웨딩마스터" },
    { id: 2, nickname: "플라워러버" },
  ])
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
        {[
          { label: "영수증 마스킹",   sub: "영수증 이미지의 개인정보를 자동으로 가립니다", checked: receiptMasking,    onChange: setReceiptMasking },
          { label: "프로필 공개",     sub: "다른 사용자가 내 프로필을 볼 수 있습니다",      checked: profileVisibility, onChange: setProfileVisibility },
          { label: "활동 내역 공개",  sub: "내 게시글과 댓글 활동이 공개됩니다",            checked: activityHistory,   onChange: setActivityHistory },
        ].map(({ label, sub, checked, onChange }) => (
          <div key={label} className="flex items-center justify-between px-4 py-4">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
            <Toggle checked={checked} onChange={onChange} />
          </div>
        ))}
      </div>

      {/* Blocked users */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground px-1">차단 목록 관리</p>
        <div className="rounded-2xl border border-border overflow-hidden">
          {blockedUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">차단한 사용자가 없습니다.</p>
          ) : (
            <div className="divide-y divide-border">
              {blockedUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-muted-foreground">{u.nickname[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{u.nickname}</span>
                  </div>
                  <button
                    onClick={() => setBlockedUsers((prev) => prev.filter((x) => x.id !== u.id))}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    차단 해제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="w-full py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
        모든 활동 기록 삭제
      </button>
    </div>
  )
}

function NotificationsPanel() {
  const [chatAlert,    setChatAlert]    = useState(true)
  const [consultAlert, setConsultAlert] = useState(true)  // planner-only; shown for all in prototype
  const [commentAlert, setCommentAlert] = useState(true)
  const [likeAlert,    setLikeAlert]    = useState(false)
  const [mentionAlert, setMentionAlert] = useState(true)
  // systemAlert is always ON and cannot be toggled

  const messageToggles = [
    { label: "채팅 알림",  sub: "1:1 채팅방에 새 메시지가 수신된 경우",          checked: chatAlert,    onChange: setChatAlert },
    { label: "상담 알림",  sub: "새 상담 신청이 수신된 경우 (플래너 전용)",       checked: consultAlert, onChange: setConsultAlert },
  ]

  const generalToggles = [
    { label: "댓글 알림",  sub: "내 게시글에 댓글 또는 대댓글이 달린 경우",      checked: commentAlert, onChange: setCommentAlert },
    { label: "좋아요 알림",sub: "내 게시글에 좋아요가 눌린 경우",                checked: likeAlert,    onChange: setLikeAlert },
    { label: "@멘션 알림", sub: "댓글에서 내가 언급된 경우",                     checked: mentionAlert, onChange: setMentionAlert },
  ]

  return (
    <div className="space-y-5">

      {/* 💬 Message section */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-2">
          💬 메시지
        </p>
        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {messageToggles.map(({ label, sub, checked, onChange }) => (
            <div key={label} className="flex items-center justify-between px-4 py-4">
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
              <Toggle checked={checked} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* 🔔 General section */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-2">
          🔔 일반
        </p>
        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {generalToggles.map(({ label, sub, checked, onChange }) => (
            <div key={label} className="flex items-center justify-between px-4 py-4">
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
              <Toggle checked={checked} onChange={onChange} />
            </div>
          ))}

          {/* System alerts — locked, always ON */}
          <div className="flex items-center justify-between px-4 py-4 opacity-60">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-foreground">시스템 알림</p>
                <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">필수</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                영수증 인증 결과, 서류 심사 결과 등 필수 알림. 해제 불가.
              </p>
            </div>
            {/* Locked toggle — visually ON but non-interactive */}
            <div className="pointer-events-none">
              <Toggle checked={true} onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// ── Support Sub-Views ──────────────────────────────────────────────────────
const FAQ_CATEGORIES = ["전체", "영수증 인증", "계정 관리", "서비스 이용", "플래너 관련"] as const
const FAQ_ITEMS = [
  { category: "영수증 인증", q: "영수증 인증은 어떻게 하나요?", a: "게시글 작성 시 영수증 또는 계약서 이미지를 첨부하면 관리자가 검토 후 인증 배지를 부여합니다." },
  { category: "영수증 인증", q: "인증까지 얼마나 걸리나요?", a: "평균 24시간 이내 처리됩니다. 주말 및 공휴일은 다소 지연될 수 있습니다." },
  { category: "계정 관리", q: "닉네임은 몇 번까지 변경할 수 있나요?", a: "닉네임 변경 횟수에 제한은 없습니다. 단, 2~10자 이내로 설정해야 합니다." },
  { category: "계정 관리", q: "소셜 로그인 계정을 이메일로 전환할 수 있나요?", a: "현재는 소셜 로그인 계정의 이메일 전환 기능을 준비 중입니다." },
  { category: "서비스 이용", q: "작성한 게시글을 수정할 수 있나요?", a: "영수증 인증 전에는 수정 가능합니다. 인증 완료 후에는 핵심 정보(날짜, 업체명, 금액)는 수정이 제한됩니다." },
  { category: "서비스 이용", q: "게시글을 삭제하면 어떻게 되나요?", a: "삭제된 게시글은 복구할 수 없습니다. 인증된 게시글도 삭제 가능합니다." },
  { category: "플래너 관련", q: "플래너로 전환하려면 어떻게 하나요?", a: "회원가입 시 플래너로 가입하거나, 고객센터를 통해 전환 신청이 가능합니다." },
]

function FAQView({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState<string>("전체")
  const [expanded, setExpanded] = useState<number | null>(null)
  const items = category === "전체" ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === category)
  return (
    <div>
      <SubViewHeader title="자주 묻는 질문" onBack={onBack} />
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {FAQ_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setExpanded(null) }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors",
              category === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {/* Accordion */}
      <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
        {items.map((item, i) => (
          <div key={`${item.q}-${i}`}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/40 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{item.q}</span>
              <ChevronDown className={cn("h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform", expanded === i && "rotate-180")} />
            </button>
            {expanded === i && (
              <div className="px-4 pb-4 -mt-1">
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/40 rounded-lg p-3">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const INQUIRY_TYPES = ["계정 문의", "서비스 이용", "영수증 인증", "기타"]
function InquiryView({ onBack }: { onBack: () => void }) {
  const [type, setType] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div>
        <SubViewHeader title="1:1 문의" onBack={onBack} />
        <div className="flex flex-col items-center text-center gap-3 py-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">문의가 접수되었습니다.</p>
          <p className="text-xs text-muted-foreground leading-relaxed">평균 24시간 이내에 답변 드립니다.<br />답변은 알림으로 전달됩니다.</p>
          <button onClick={onBack} className="mt-2 w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            확인
          </button>
        </div>
      </div>
    )
  }

  const valid = type && title.trim() && content.trim()
  return (
    <div>
      <SubViewHeader title="1:1 문의" onBack={onBack} />
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">문의 유형</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">유형을 선택해주세요</option>
            {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="문의 제목을 입력해주세요"
            className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">내용</label>
          <textarea
            rows={5}
            value={content}
            maxLength={500}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문의 내용을 자세히 입력해주세요"
            className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">{content.length}/500</p>
        </div>
        <button
          disabled={!valid}
          onClick={() => setSubmitted(true)}
          className={cn(
            "w-full py-2.5 text-sm font-bold rounded-xl transition-opacity",
            valid ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          문의 접수
        </button>
      </div>
    </div>
  )
}

function PhoneSupportView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <SubViewHeader title="전화 상담" onBack={onBack} />
      <div className="rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Phone className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">고객센터</p>
        <a href="tel:15880000" className="text-2xl font-bold text-foreground tracking-tight hover:text-primary transition-colors">
          1588-0000
        </a>
        <div className="w-full text-xs text-muted-foreground bg-muted/40 rounded-xl p-4 space-y-1 text-left mt-2">
          <p>평일: 09:00 – 18:00</p>
          <p>점심: 12:00 – 13:00 (휴게)</p>
          <p>주말 및 공휴일: 휴무</p>
        </div>
        <a
          href="tel:15880000"
          className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
        >
          전화 연결
        </a>
      </div>
    </div>
  )
}

function DocView({ title, onBack, sections }: { title: string; onBack: () => void; sections: { heading: string; body: string }[] }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-muted transition-colors" aria-label="뒤로">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
        </div>
        <span className="text-[11px] text-muted-foreground">최종 개정: 2026.01.01</span>
      </div>
      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.heading}>
            <p className="text-sm font-semibold text-foreground mb-1.5">{s.heading}</p>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const TERMS_SECTIONS = [
  { heading: "제1조 (목적)", body: "본 약관은 리얼웨딩(이하 \"서비스\")의 이용 조건과 절차, 회사와 회원 간의 권리·의무를 규정함을 목적으로 합니다." },
  { heading: "제2조 (정의)", body: "\"회원\"이란 서비스에 가입하여 이용 계약을 체결한 자를 의미합니다." },
  { heading: "제3조 (약관의 효력 및 변경)", body: "본 약관은 서비스 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력이 발생합니다." },
  { heading: "제4조 (회원의 의무)", body: "회원은 서비스 이용 시 관련 법령과 본 약관을 준수해야 하며, 타인의 권리를 침해하는 행위를 해서는 안 됩니다." },
  { heading: "제5조 (서비스의 제공 및 변경)", body: "회사는 안정적인 서비스 제공을 위해 노력하며, 운영상·기술상 필요에 따라 서비스 내용을 변경할 수 있습니다." },
]
const PRIVACY_POLICY_SECTIONS = [
  { heading: "제1조 (수집하는 개인정보)", body: "리얼웨딩은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.\n- 필수: 이메일 주소, 닉네임, 예식일, 예식 장소\n- 선택: 프로필 사진, 웨딩 스타일" },
  { heading: "제2조 (개인정보의 이용 목적)", body: "수집된 개인정보는 서비스 제공 및 개선, 본인 인증, 공지사항 전달 목적으로만 사용됩니다." },
  { heading: "제3조 (개인정보의 보유 및 이용 기간)", body: "회원 탈퇴 시 즉시 파기합니다. 단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다." },
  { heading: "제4조 (개인정보의 제3자 제공)", body: "회사는 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 법령에 의거한 경우는 예외로 합니다." },
]

type SupportSubView = null | "faq" | "inquiry" | "phone" | "terms" | "privacy-policy"

function SupportPanel() {
  const [supportView, setSupportView] = useState<SupportSubView>(null)

  if (supportView === "faq")            return <FAQView onBack={() => setSupportView(null)} />
  if (supportView === "inquiry")        return <InquiryView onBack={() => setSupportView(null)} />
  if (supportView === "phone")          return <PhoneSupportView onBack={() => setSupportView(null)} />
  if (supportView === "terms")          return <DocView title="이용약관" onBack={() => setSupportView(null)} sections={TERMS_SECTIONS} />
  if (supportView === "privacy-policy") return <DocView title="개인정보처리방침" onBack={() => setSupportView(null)} sections={PRIVACY_POLICY_SECTIONS} />

  const items: { icon: React.ElementType; label: string; sub: string; view: Exclude<SupportSubView, null> }[] = [
    { icon: HelpCircle,    label: "자주 묻는 질문 (FAQ)", sub: "궁금한 점을 확인해보세요",     view: "faq" },
    { icon: MessageSquare, label: "1:1 문의",             sub: "평균 응답 시간: 24시간 이내",  view: "inquiry" },
    { icon: Phone,         label: "전화 상담",             sub: "평일 09:00 – 18:00",         view: "phone" },
    { icon: FileText,      label: "이용약관",              sub: "",                            view: "terms" },
    { icon: Shield,        label: "개인정보 처리방침",     sub: "",                            view: "privacy-policy" },
  ]

  return (
    <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
      {items.map(({ icon: Icon, label, sub, view }) => (
        <button
          key={label}
          onClick={() => setSupportView(view)}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-muted/40 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</p>
              {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  )
}

// ── Settings Slide-In Panel ────────────────────────────────────────────────
type SettingsSection = "account" | "privacy" | "notifications" | "support" | null

const SETTINGS_MENU: { id: Exclude<SettingsSection, null>; label: string; sub: string; icon: React.ElementType }[] = [
  { id: "account",       label: "계정 관리",  sub: "프로필, 닉네임, 비밀번호",  icon: User },
  { id: "privacy",       label: "프라이버시", sub: "공개 범위, 마스킹 설정",    icon: Lock },
  { id: "notifications", label: "알림 설정",  sub: "메시지, 댓글, 좋아요, 멘션 알림",  icon: Bell },
  { id: "support",       label: "고객 지원",  sub: "FAQ, 1:1 문의, 약관",      icon: HelpCircle },
]

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<SettingsSection>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { if (section) setSection(null); else onClose() } }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [section, onClose])

  const sectionTitle = SETTINGS_MENU.find((m) => m.id === section)?.label ?? ""

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="relative w-full max-w-sm max-h-[85dvh] bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-shrink-0">
          {section ? (
            <button onClick={() => setSection(null)} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="뒤로">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <h2 className="flex-1 text-base font-bold text-foreground text-center">
            {section ? sectionTitle : "설정"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="닫기">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!section && (
            <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
              {SETTINGS_MENU.map(({ id, label, sub, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/40 transition-colors group text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
          {section === "account"       && <AccountPanel />}
          {section === "privacy"       && <PrivacyPanel />}
          {section === "notifications" && <NotificationsPanel />}
          {section === "support"       && <SupportPanel />}
        </div>
      </div>
    </div>
  )
}


// ── Content Grids / Lists ──────────────────────────────────────────────────
type ContentTab = "grid" | "comments" | "saved"

function PostGrid({ onNavigate }: { onNavigate?: (v: string) => void }) {
  if (MY_POSTS.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-8 text-center">
        <PenLine className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">아직 작성한 리뷰가 없어요!</p>
        <button
          onClick={() => onNavigate?.("post-form")}
          className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          후기 작성하기
        </button>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-px">
      {MY_POSTS.map((post) => (
        <div key={post.id} className="relative aspect-square cursor-pointer group overflow-hidden">
          <div className={cn(
            "w-full h-full bg-gradient-to-br flex items-center justify-center transition-transform group-hover:scale-105 duration-300",
            post.color
          )}>
            <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
          </div>
          {post.verified && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
            <p className="text-white text-[10px] font-medium px-2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-tight">
              {post.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CommentList() {
  if (MY_COMMENTS.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-16">아직 남긴 댓글이 없어요!</p>
    )
  }
  return (
    <div className="divide-y divide-border px-4">
      {MY_COMMENTS.map((item) => (
        <div key={item.id} className="py-4 cursor-pointer group">
          <p className="text-xs text-muted-foreground mb-1 line-clamp-1 flex items-center gap-1">
            <span className="text-primary font-semibold shrink-0">원글:</span>
            {item.postTitle}
          </p>
          <p className="text-sm text-foreground leading-relaxed group-hover:text-primary transition-colors">
            {item.comment}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">{item.date}</p>
        </div>
      ))}
    </div>
  )
}

function SavedGrid() {
  if (MY_SAVED.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-16">저장한 글이 없어요!</p>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-px">
      {MY_SAVED.map((item) => (
        <div key={item.id} className="relative aspect-square cursor-pointer group overflow-hidden">
          <div className={cn(
            "w-full h-full bg-gradient-to-br flex items-center justify-center transition-transform group-hover:scale-105 duration-300",
            item.color
          )}>
            <Bookmark className="h-7 w-7 text-muted-foreground/50" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
type UserRole = "예비신부" | "아내"

export function MyPageView({ onNavigate }: { onNavigate?: (v: string) => void }) {
  const [weddingStyles, setWeddingStyles] = useState(["#호텔웨딩", "#스몰웨딩", "#야외웨딩"])
  const [showStyleModal, setShowStyleModal] = useState(false)
  const [showSettings, setShowSettings]   = useState(false)
  const [activeTab, setActiveTab]         = useState<ContentTab>("grid")

  // Role-based D-Day logic
  const [userRole, setUserRole] = useState<UserRole>("예비신부") // toggle to "아내" to test Mode B
  const WEDDING_DATE = new Date("2025-10-12")
  const SIGNUP_DATE  = new Date("2024-10-12")
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const msPerDay = 1000 * 60 * 60 * 24
  const daysLeft    = Math.max(0, Math.round((WEDDING_DATE.getTime() - today.getTime()) / msPerDay))
  const totalDays   = Math.max(1, Math.round((WEDDING_DATE.getTime() - SIGNUP_DATE.getTime()) / msPerDay))
  const elapsedDays = Math.max(0, Math.round((today.getTime() - WEDDING_DATE.getTime()) / msPerDay))

  const ringProgress = userRole === "아내" ? 1 : (totalDays - daysLeft) / totalDays
  const badgeLabel   = userRole === "아내" ? `D+${elapsedDays}` : `D-${daysLeft}`

  const styleLabel = weddingStyles.length > 1
    ? `${weddingStyles[0]} 외 ${weddingStyles.length - 1}`
    : weddingStyles[0] ?? "예식 스타일 선택"

  const CONTENT_TABS: { id: ContentTab; icon: React.ElementType; label: string }[] = [
    { id: "grid",     icon: Grid3X3,      label: "게시글" },
    { id: "comments", icon: MessageSquare, label: "댓글"   },
    { id: "saved",    icon: Bookmark,      label: "저장됨" },
  ]

  return (
    <>
      <div className="w-full flex flex-col">

        {/* ── Top bar ──────────────���─────────────────────────────────────── */}
        <div className="flex items-center justify-end px-4 pt-4 pb-2">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="설정"
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* ── Zone 1: Centered Profile Hub ──────────────────────────────── */}
        <div className="flex flex-col items-center pt-4 pb-8 px-4 text-center">

          {/* D-Day ring + avatar */}
          <div className="relative w-28 h-28 mb-5">
            <DayRing size={112} progress={ringProgress} />
            <div className="absolute inset-[6px] rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-card shadow-md">
              <span className="text-3xl font-bold text-primary select-none">예</span>
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-[11px] font-bold rounded-full whitespace-nowrap shadow-md ring-2 ring-background">
              {badgeLabel}
            </div>
          </div>

          {/* Nickname */}
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            예비신부123
          </h2>

          {/* Role badge */}
          <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20">
            <span aria-hidden="true">&#128141;</span>
            예비 신부
          </span>

          {/* Wedding style chip */}
          <button
            onClick={() => setShowStyleModal(true)}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-muted hover:bg-muted/70 rounded-full text-sm font-medium text-foreground transition-colors border border-border"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <span className="text-primary font-semibold">{styleLabel}</span>
          </button>
        </div>

        {/* ── Zone 2: Instagram-style 3-Icon Tab Bar ─────────────────────── */}
        <div className="sticky top-14 z-10 bg-background/95 backdrop-blur-sm border-t border-b border-border">
          <div className="flex">
            {CONTENT_TABS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-label={label}
                className={cn(
                  "flex flex-1 items-center justify-center py-3 border-b-2 -mb-px transition-colors",
                  activeTab === id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-[22px] w-[22px]" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Zone 3: Content ─────────────────────────────────────────────── */}
        <div className="pb-16">
          {activeTab === "grid"     && <PostGrid onNavigate={onNavigate} />}
          {activeTab === "comments" && <CommentList />}
          {activeTab === "saved"    && <SavedGrid />}
        </div>
      </div>

      {/* Wedding style chip picker modal */}
      <WeddingStyleModal
        open={showStyleModal}
        onClose={() => setShowStyleModal(false)}
        selected={weddingStyles}
        onChange={setWeddingStyles}
      />

      {/* Settings slide-in panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  )
}
