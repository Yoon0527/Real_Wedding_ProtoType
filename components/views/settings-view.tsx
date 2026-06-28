"use client"

import { useState } from "react"
import { User, Shield, Bell, HelpCircle, Lock, ChevronDown, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type SettingsTab = "profile" | "privacy" | "notifications" | "support"

const settingsTabs = [
  { id: "profile" as const, label: "내 프로필", icon: User },
  { id: "privacy" as const, label: "프라이버시 관리", icon: Shield },
  { id: "notifications" as const, label: "알림 설정", icon: Bell },
  { id: "support" as const, label: "고객 지원", icon: HelpCircle },
]

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("privacy")

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">설정</h2>
        <p className="text-sm text-muted-foreground mt-1">
          계정 및 프라이버시 설정을 관리하세요
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Settings sidebar */}
          <nav className="md:w-56 border-b md:border-b-0 md:border-r border-border flex-shrink-0">
            <ul className="flex md:flex-col overflow-x-auto md:overflow-x-visible p-2 md:p-3 gap-1">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-left min-w-0">{tab.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Settings content */}
          <div className="flex-1 p-5 md:p-6">
            {activeTab === "profile" && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">내 프로필</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-medium text-muted-foreground">예</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">예비신부123</p>
                      <p className="text-sm text-muted-foreground">💍 예비부부</p>
                    </div>
                    <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex-shrink-0">
                      수정
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">프라이버시 관리</h3>
                <div className="space-y-6">
                  {/* Receipt visibility setting */}
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      영수증 공개 설정
                    </label>
                    <div className="relative">
                      <select
                        disabled
                        className="w-full appearance-none px-4 py-2.5 pr-10 bg-muted border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed"
                        defaultValue="private"
                      >
                        <option value="private">🔒 관리자만 확인 (비공개)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none hidden" />
                    </div>
                    
                    {/* Helper text */}
                    <div className="mt-3 flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                      <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        등록된 파일은 인증 용도로만 사용되며, 다른 사용자에게 절대 노출되지 않습니다.
                      </p>
                    </div>
                  </div>

                  {/* Other privacy settings */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">프로필 공개</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          다른 사용자에게 프로필 노출 허용
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-primary rounded-full relative flex-shrink-0">
                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">활동 내역 공개</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          작성한 리뷰 목록 공개
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-muted rounded-full relative flex-shrink-0">
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">알림 설정</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">이메일 알림</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        중요한 업데이트를 이메일로 받기
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-primary rounded-full relative flex-shrink-0">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">푸시 알림</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        브라우저 푸시 알림 받기
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-primary rounded-full relative flex-shrink-0">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">마케팅 알림</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        이벤트 및 프로모션 소식 받기
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-muted rounded-full relative flex-shrink-0">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">고객 지원</h3>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-card border border-border rounded-lg text-left hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground">자주 묻는 질문 (FAQ)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      궁금한 점에 대한 답변을 확인하세요
                    </p>
                  </button>
                  <button className="w-full p-4 bg-card border border-border rounded-lg text-left hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground">1:1 문의하기</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      고객센터에 직접 문의하세요
                    </p>
                  </button>
                  <button className="w-full p-4 bg-card border border-border rounded-lg text-left hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground">이용약관</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      서비스 이용약관을 확인하세요
                    </p>
                  </button>
                  <button className="w-full p-4 bg-card border border-border rounded-lg text-left hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground">개인정보 처리방침</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      개인정보 처리방침을 확인하세요
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
