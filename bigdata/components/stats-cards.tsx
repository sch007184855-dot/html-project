"use client"

import { Bike, Users, TrendingUp, MapPin, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

const stats = [
  {
    title: "오늘 대여 건수",
    value: "15,234",
    change: 12.5,
    icon: Bike,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "실시간 이용자",
    value: "2,847",
    change: 5.2,
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "운영 대여소",
    value: "2,154",
    change: 0,
    subValue: "98.5%",
    subLabel: "가동률",
    icon: MapPin,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "평균 이용시간",
    value: "32분",
    change: -2.3,
    icon: TrendingUp,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
]

export function StatsCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className={`rounded-lg p-2.5 ${stat.iconBg}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            {stat.change !== 0 ? (
              <div className={`flex items-center gap-0.5 text-xs font-medium ${
                stat.change > 0 ? "text-emerald-600" : "text-rose-600"
              }`}>
                {stat.change > 0 ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {Math.abs(stat.change)}%
              </div>
            ) : stat.subValue ? (
              <div className="text-right">
                <p className="text-sm font-semibold text-card-foreground">{stat.subValue}</p>
                <p className="text-[10px] text-muted-foreground">{stat.subLabel}</p>
              </div>
            ) : (
              <Minus className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold tracking-tight text-card-foreground">{stat.value}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
