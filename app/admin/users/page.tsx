'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import {
  AdminPageHeader,
  FilterTabs,
  StatCard,
  StatusBadge,
} from '@/components/admin/admin-ui'
import {
  memberRoles,
  memberStatuses,
  members,
  type Member,
  type MemberRole,
  type MemberStatus,
} from '@/lib/admin-data'

export default function AdminUsersPage() {
  const [list, setList] = useState<Member[]>(members)
  const [status, setStatus] = useState<MemberStatus | '전체'>('전체')
  const [role, setRole] = useState<MemberRole | '전체'>('전체')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      list.filter((m) => {
        if (status !== '전체' && m.status !== status) return false
        if (role !== '전체' && m.role !== role) return false
        if (query && !m.nickname.includes(query) && !m.email.includes(query))
          return false
        return true
      }),
    [list, status, role, query],
  )

  const setMemberStatus = (id: string, next: MemberStatus) =>
    setList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: next } : m)),
    )

  const count = (s: MemberStatus) => list.filter((m) => m.status === s).length

  return (
    <>
      <AdminPageHeader
        title="회원 관리"
        description={`전체 ${list.length}명 · 신고 누적 회원 ${list.filter((m) => m.reportCount > 0).length}명`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="정상" value={`${count('정상')}명`} />
        <StatCard label="휴면" value={`${count('휴면')}명`} />
        <StatCard label="정지" value={`${count('정지')}명`} />
        <StatCard label="탈퇴" value={`${count('탈퇴')}명`} />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="닉네임 또는 이메일 검색"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <FilterTabs
            options={memberStatuses}
            value={status}
            onChange={setStatus}
          />
          <div className="h-4 w-px bg-border" />
          <FilterTabs options={memberRoles} value={role} onChange={setRole} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">회원</th>
              <th className="px-5 py-3 font-medium">유형</th>
              <th className="px-5 py-3 font-medium">상태</th>
              <th className="px-5 py-3 text-right font-medium">글</th>
              <th className="px-5 py-3 text-right font-medium">인증</th>
              <th className="px-5 py-3 text-right font-medium">신고</th>
              <th className="px-5 py-3 font-medium">최근 활동</th>
              <th className="px-5 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr
                key={m.id}
                className="border-b border-border/60 last:border-0 hover:bg-accent/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">
                      {m.nickname}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {m.email}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{m.role}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-foreground">
                  {m.postCount}
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-foreground">
                  {m.verifiedReceipts}
                </td>
                <td
                  className={`px-5 py-3.5 text-right tabular-nums ${
                    m.reportCount > 0
                      ? 'font-semibold text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {m.reportCount}
                </td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">
                  {m.lastActiveAt}
                </td>
                <td className="px-5 py-3.5">
                  {m.status === '정지' ? (
                    <button
                      type="button"
                      onClick={() => setMemberStatus(m.id, '정상')}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
                    >
                      정지 해제
                    </button>
                  ) : m.status === '탈퇴' ? (
                    <span className="text-xs text-muted-foreground">-</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMemberStatus(m.id, '정지')}
                      className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs text-destructive transition-colors hover:bg-destructive/10"
                    >
                      계정 정지
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            조건에 맞는 회원이 없습니다.
          </p>
        )}
      </div>
    </>
  )
}
