"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, User, ArrowLeft, LogIn, UserPlus, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"

interface NavigationProps {
  currentUser?: {
    username: string
    points: number
  }
  showBackButton?: boolean
}

export function Navigation({ currentUser, showBackButton = false }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    // TODO: Replace with actual logout API call
    localStorage.removeItem("authToken")
    window.location.href = "/login"
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {showBackButton && (
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
            )}
            <div className="flex items-center gap-2">
              <Trophy className="h-6 md:h-8 w-6 md:w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">PredictWin</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {currentUser ? (
              <>
                <Link href="/">
                  <Button variant="ghost" className={isActive("/") ? "text-primary font-medium" : ""}>
                    Predictions
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" className={isActive("/leaderboard") ? "text-primary font-medium" : ""}>
                    <Users className="h-4 w-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className={isActive("/profile") ? "text-primary font-medium" : ""}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className={isActive("/login") ? "text-primary font-medium" : ""}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="ghost" className={isActive("/register") ? "text-primary font-medium" : ""}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {currentUser ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-xs md:text-sm text-muted-foreground">Welcome back</p>
                  <p className="font-semibold text-foreground text-sm md:text-base">{currentUser.username}</p>
                </div>
                <Badge variant="secondary" className="text-sm md:text-lg px-2 md:px-3 py-1">
                  {currentUser.points} pts
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex md:hidden gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="ghost" size="sm">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            <MobileNav currentUser={currentUser} />
          </div>
        </div>
      </div>
    </header>
  )
}
