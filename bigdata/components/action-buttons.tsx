"use client"

import { Map, MessageCircle, History, Search, ArrowRight } from "lucide-react"

const actions = [
  {
    icon: Map,
    label: "대여소 지도 전체보기",
    description: "서울시 전체 대여소 현황",
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
  },
  {
    icon: MessageCircle,
    label: "챗봇",
    description: "AI 상담 서비스",
    color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  },
  {
    icon: History,
    label: "이용내역",
    description: "대여/반납 기록 조회",
    color: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
  },
  {
    icon: Search,
    label: "대여소 찾기",
    description: "주변 대여소 검색",
    color: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  },
]

export function ActionButtons() {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
        >
          <div className={`rounded-lg p-2.5 transition-colors ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground">{action.label}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{action.description}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      ))}
    </section>
  )
}
