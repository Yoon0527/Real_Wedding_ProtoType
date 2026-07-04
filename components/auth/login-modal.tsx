"use client"

import { useState, useEffect } from "react"
import { X, Eye, EyeOff, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginModalProps {
  onClose: () => void
  onOpenSignup: () => void
}

type AccountStatus = "idle" | "loading" | "ok" | "pending" | "suspended"

// Mock social login icons as inline SVGs
function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#3A1D1D">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.74 1.636 5.144 4.08 6.566l-1.04 3.88 4.523-2.987A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3Z" />
    </svg>
  )
}

function NaverIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#03C75A">
      <path d="M16.273 12.845 7.376 3H3v18h4.727V8.155L16.624 21H21V3h-4.727v9.845Z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83ZM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
    </svg>
  )
}

export function LoginModal({ onClose, onOpenSignup }: LoginModalProps) {
  const [tab, setTab] = useState<"social" | "email">("social")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [status, setStatus] = useState<AccountStatus>("idle")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleEmailLogin = () => {
    setStatus("loading")
    // Mock: simulate different statuses based on input for demo
    setTimeout(() => {
      if (email.includes("pending")) setStatus("pending")
      else if (email.includes("suspended")) setStatus("suspended")
      else setStatus("ok")
    }, 900)
  }

  if (status === "suspended") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
        <div className="bg-card rounded-2xl shadow-lg w-full max-w-sm p-8 flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-lg font-bold text-foreground">계정 이용 정지</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              서비스 이용이 정지된 계정입니다.<br />
              자세한 내용은 고객센터에 문의해 주세요.
            </p>
          </div>
          <button className="w-full py-3 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-accent transition-colors" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">로그인</h1>
            <p className="text-xs text-muted-foreground mt-0.5">리얼웨딩에 오신 것을 환영합니다</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Pending planner banner */}
        {status === "pending" && (
          <div className="mx-6 mb-4 flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              현재 관리자가 서류를 검토 중입니다. 승인 완료 후 이용 가능합니다.
            </p>
          </div>
        )}

        {/* Tab toggle */}
        <div className="px-6">
          <div className="flex gap-1 p-1 bg-muted rounded-xl">
            {(["social", "email"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                  tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "social" ? "소셜 로그인" : "이메일 로그인"}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 space-y-3">
          {tab === "social" ? (
            <>
              {/* Kakao */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FEE500] hover:bg-[#f5dc00] transition-colors">
                <KakaoIcon />
                <span className="flex-1 text-center text-sm font-semibold text-[#3A1D1D]">카카오로 계속하기</span>
              </button>
              {/* Naver */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#03C75A] hover:bg-[#02b050] transition-colors">
                <NaverIcon />
                <span className="flex-1 text-center text-sm font-semibold text-white">네이버로 계속하기</span>
              </button>
              {/* Apple */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111111] hover:bg-black transition-colors text-white">
                <AppleIcon />
                <span className="flex-1 text-center text-sm font-semibold">Apple로 계속하기</span>
              </button>
              {/* Google */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
                <GoogleIcon />
                <span className="flex-1 text-center text-sm font-semibold text-foreground">Google로 계속하기</span>
              </button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">이메일</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소 입력"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">힌트: "pending@" 또는 "suspended@" 입력시 상태 테스트</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">비밀번호</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호 입력"
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEmailLogin}
                disabled={!email || !password || status === "loading"}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-bold transition-all",
                  email && password
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {status === "loading" ? "로그인 중..." : "로그인"}
              </button>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors">아이디 찾기</button>
                <span>|</span>
                <button className="hover:text-foreground transition-colors">비밀번호 찾기</button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 border-t border-border flex items-center justify-center gap-1.5 text-sm">
          <span className="text-muted-foreground">아직 회원이 아니신가요?</span>
          <button
            onClick={() => { onClose(); onOpenSignup() }}
            className="font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}
