"use client"

import { useState } from "react"
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const stations = [
  { id: 1, name: "서울역 1번출구", bikes: 12, empty: 8, x: 30, y: 60, district: "중구" },
  { id: 2, name: "광화문역 2번출구", bikes: 5, empty: 15, x: 45, y: 35, district: "종로구" },
  { id: 3, name: "종각역 3번출구", bikes: 18, empty: 2, x: 55, y: 45, district: "종로구" },
  { id: 4, name: "시청역 4번출구", bikes: 8, empty: 12, x: 35, y: 45, district: "중구" },
  { id: 5, name: "을지로입구역", bikes: 3, empty: 17, x: 50, y: 50, district: "중구" },
  { id: 6, name: "명동역 1번출구", bikes: 15, empty: 5, x: 48, y: 58, district: "중구" },
  { id: 7, name: "충무로역", bikes: 9, empty: 11, x: 55, y: 62, district: "중구" },
  { id: 8, name: "동대문역", bikes: 7, empty: 13, x: 70, y: 48, district: "동대문구" },
]

export function MapSection() {
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null)

  const getStatusColor = (bikes: number) => {
    if (bikes > 10) return "bg-emerald-500"
    if (bikes > 5) return "bg-amber-500"
    return "bg-rose-500"
  }

  const getStatusText = (bikes: number) => {
    if (bikes > 10) return "여유"
    if (bikes > 5) return "보통"
    return "부족"
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-card-foreground">실시간 대여소 현황</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">서울시 공공자전거 대여소 위치 및 현황</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            새로고침
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Navigation className="h-3.5 w-3.5" />
            현재 위치
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative aspect-[2/1] w-full bg-secondary/30">
        {/* Map Grid Background */}
        <div className="absolute inset-0">
          <svg className="h-full w-full opacity-40">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Stylized Roads */}
        <svg className="absolute inset-0 h-full w-full">
          <line x1="15%" y1="50%" x2="85%" y2="50%" className="stroke-border" strokeWidth="4" strokeLinecap="round" />
          <line x1="50%" y1="15%" x2="50%" y2="85%" className="stroke-border" strokeWidth="4" strokeLinecap="round" />
          <line x1="25%" y1="25%" x2="75%" y2="75%" className="stroke-border" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 4" />
          <line x1="75%" y1="25%" x2="25%" y2="75%" className="stroke-border" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 4" />
        </svg>

        {/* Station Markers */}
        {stations.map((station) => (
          <button
            key={station.id}
            onClick={() => setSelectedStation(station)}
            className={cn(
              "absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
              selectedStation?.id === station.id ? "scale-125 z-20" : "hover:scale-110"
            )}
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
          >
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md",
              getStatusColor(station.bikes)
            )}>
              <span className="text-[10px] font-bold text-white">{station.bikes}</span>
            </div>
          </button>
        ))}

        {/* Map Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1">
          <Button variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Station Panel */}
        {selectedStation && (
          <div className="absolute bottom-3 left-3 right-3 max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex h-5 items-center rounded-full px-2 text-[10px] font-medium text-white",
                    getStatusColor(selectedStation.bikes)
                  )}>
                    {getStatusText(selectedStation.bikes)}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedStation.district}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-card-foreground">{selectedStation.name}</h3>
                <div className="mt-2 flex gap-4">
                  <div>
                    <p className="text-xl font-bold text-primary">{selectedStation.bikes}</p>
                    <p className="text-xs text-muted-foreground">대여 가능</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-card-foreground">{selectedStation.empty}</p>
                    <p className="text-xs text-muted-foreground">반납 가능</p>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setSelectedStation(null)} className="h-7 px-2 text-xs">
                닫기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">여유 (10+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-xs text-muted-foreground">보통 (5-10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="text-xs text-muted-foreground">부족 (5-)</span>
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          마지막 업데이트: 방금 전
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
