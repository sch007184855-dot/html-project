import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MapSection } from "@/components/map-section"
import { ActionButtons } from "@/components/action-buttons"
import { StatsCards } from "@/components/stats-cards"
import { Footer } from "@/components/footer"
import { Search, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      
      <main className="lg:ml-60">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 hidden border-b border-border bg-card/80 backdrop-blur-sm lg:block">
          <div className="flex h-14 items-center justify-between px-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="대여소 검색..." 
                className="h-9 bg-background pl-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                2024.01.15
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" />
                리포트
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 pt-18 lg:p-6 lg:pt-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page Title */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-foreground">지도뷰</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">서울시 공공자전거 실시간 현황을 확인하세요</p>
            </div>

            {/* Stats Cards */}
            <StatsCards />
            
            {/* Map Section */}
            <MapSection />
            
            {/* Action Buttons */}
            <ActionButtons />
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
