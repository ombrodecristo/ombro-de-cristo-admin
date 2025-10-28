import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SidebarNav } from '../SidebarNav'
import { ShieldHalf } from 'lucide-react'

export default function AdminLayout() {
  const [isDesktopClosed, setIsDesktopClosed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleDesktopSidebar = () => {
    setIsDesktopClosed(!isDesktopClosed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      <Sidebar
        isDesktopClosed={isDesktopClosed}
        onToggleDesktop={toggleDesktopSidebar}
      />
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent
          side="left"
          className="flex w-64 flex-col bg-primary p-0 text-primary-foreground border-r-0"
        >
          <SheetHeader className="mb-4 space-y-0 text-left">
            <SheetTitle>
              <div className="flex h-14 items-center p-4 md:h-16 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <ShieldHalf className="h-5 w-5" />
                  <span className="font-semibold">Administração</span>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Menu de navegação principal
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav
              isDesktopClosed={false}
              onLinkClick={() => setIsMobileOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full flex-col overflow-hidden">
        <Header onToggleMobile={toggleMobileSidebar} />
        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </>
  )
}