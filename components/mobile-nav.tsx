"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Trophy, Users, User, Menu, LogIn, UserPlus, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileNavProps {
  currentUser?: {
    username: string
    points: number
  }
}

export function MobileNav({ currentUser }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setOpen(false)
    window.location.href = "/login"
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">PredictWin</span>
        </div>

        <nav className="flex flex-col gap-4">
          {currentUser ? (
            <>
              <Link href="/" onClick={handleLinkClick}>
                <Button variant={isActive("/") ? "default" : "ghost"} className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  Predictions
                </Button>
              </Link>

              <Link href="/leaderboard" onClick={handleLinkClick}>
                <Button variant={isActive("/leaderboard") ? "default" : "ghost"} className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </Link>

              <Link href="/profile" onClick={handleLinkClick}>
                <Button variant={isActive("/profile") ? "default" : "ghost"} className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>

              <div className="border-t pt-4 mt-4">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" onClick={handleLinkClick}>
                <Button variant={isActive("/login") ? "default" : "ghost"} className="w-full justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>

              <Link href="/register" onClick={handleLinkClick}>
                <Button variant={isActive("/register") ? "default" : "ghost"} className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
