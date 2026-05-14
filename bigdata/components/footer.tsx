"use client"

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface CityEvent {
  title: string
  date: string
  location: string
}

// 샘플 이벤트 데이터 (실제 API 연동 시 교체)
const sampleEvents: CityEvent[] = [
  { title: "서울 자전거 축제", date: "2026-05-20", location: "여의도 한강공원" },
  { title: "한강 야간 라이딩", date: "2026-05-25", location: "반포 한강공원" },
  { title: "따릉이 이용자 대회", date: "2026-06-01", location: "상암 월드컵공원" },
  { title: "자전거 안전교육", date: "2026-05-15", location: "서울시청 광장" },
  { title: "야간 한강 투어", date: "2026-05-28", location: "뚝섬 한강공원" },
]

export function Footer() {
  const [events, setEvents] = useState<CityEvent[]>(sampleEvents)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 14)) // 2026년 5월
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  // API 연동 시 사용할 useEffect
  useEffect(() => {
    // 실제 API 연동 예시:
    // const fetchEvents = async () => {
    //   try {
    //     const res = await fetch('/api/city-events')
    //     const data = await res.json()
    //     setEvents(data)
    //   } catch (error) {
    //     console.error('Failed to fetch events:', error)
    //   }
    // }
    // fetchEvents()
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((e) => e.date === dateStr)
  }

  const hasEvent = (day: number) => getEventsForDate(day).length > 0

  const days = ["일", "월", "화", "수", "목", "금", "토"]
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <footer className="rounded-xl border border-border bg-card shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* 캘린더 */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">도시 행사 캘린더</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[100px] text-center text-sm font-medium text-foreground">
                  {year}년 {monthNames[month]}
                </span>
                <button
                  onClick={nextMonth}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 요일 헤더 */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {days.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    "py-2 text-center text-xs font-medium",
                    i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-muted-foreground"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-1">
              {/* 빈 칸 */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10" />
              ))}
              {/* 날짜 */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayOfWeek = (firstDayOfMonth + i) % 7
                const isSelected = selectedDate === day
                const eventExists = hasEvent(day)

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : day)}
                    className={cn(
                      "relative flex h-10 items-center justify-center rounded-lg text-sm transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : eventExists
                          ? "bg-primary/10 font-medium text-primary hover:bg-primary/20"
                          : "text-foreground hover:bg-accent",
                      dayOfWeek === 0 && !isSelected && "text-red-500",
                      dayOfWeek === 6 && !isSelected && "text-blue-500"
                    )}
                  >
                    {day}
                    {eventExists && !isSelected && (
                      <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 선택된 날짜의 행사 목록 */}
          <div className="w-full border-t border-border pt-4 lg:w-72 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {selectedDate ? `${month + 1}월 ${selectedDate}일 행사` : "날짜를 선택하세요"}
            </h4>
            {selectedDate ? (
              selectedEvents.length > 0 ? (
                <ul className="space-y-2">
                  {selectedEvents.map((event, idx) => (
                    <li
                      key={idx}
                      className="rounded-lg border border-border bg-background p-3 transition-colors hover:bg-accent"
                    >
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">이 날짜에 예정된 행사가 없습니다.</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">캘린더에서 날짜를 클릭하면 해당 날짜의 행사를 확인할 수 있습니다.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
