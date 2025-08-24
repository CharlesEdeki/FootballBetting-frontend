"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Users, Calendar, Medal, Crown } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { DataService } from "@/lib/data-service"

export default function LeaderboardPage() {
  const leaderboard = DataService.getLeaderboard()
  const currentUser = DataService.getCurrentUser()

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>
    }
  }

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default"
      case 2:
        return "secondary"
      case 3:
        return "outline"
      default:
        return "outline"
    }
  }

  const userStats = DataService.getUserStats()
  const pointsToTop3 = leaderboard[2]?.total_points - (currentUser?.total_points || 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Leaderboard</h2>
          <p className="text-sm md:text-base text-muted-foreground">See how you rank against other predictors</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          {leaderboard.slice(0, 3).map((user, index) => (
            <Card
              key={user.user_id}
              className={`text-center ${
                index === 0 ? "sm:order-2 ring-2 ring-primary" : index === 1 ? "sm:order-1" : "sm:order-3"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">{getRankIcon(user.rank!)}</div>
                <Avatar className="mx-auto h-12 md:h-16 w-12 md:w-16 mb-2">
                  <AvatarFallback className="text-base md:text-lg font-bold">{user.avatar}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base md:text-lg">{user.username}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={getRankBadgeVariant(user.rank!)}
                  className="text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 mb-2"
                >
                  {user.total_points} pts
                </Badge>
                <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last: {user.created_at.split("T")[0]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Trophy className="h-5 w-5" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Rank</th>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Player</th>
                    <th className="text-right p-3 md:p-4 font-semibold text-sm md:text-base">Points</th>
                    <th className="text-right p-3 md:p-4 font-semibold text-sm md:text-base hidden sm:table-cell">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user) => (
                    <tr
                      key={user.user_id}
                      className={`border-b hover:bg-muted/30 transition-colors ${
                        user.username === currentUser?.username ? "bg-accent/10" : ""
                      }`}
                    >
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-2">{getRankIcon(user.rank!)}</div>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-8 md:h-10 w-8 md:w-10">
                            <AvatarFallback className="text-xs md:text-sm font-semibold">{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground text-sm md:text-base">
                              {user.username}
                              {user.username === currentUser?.username && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  You
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-right">
                        <Badge variant={getRankBadgeVariant(user.rank!)} className="font-bold text-xs md:text-sm">
                          {user.total_points}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4 text-right text-muted-foreground hidden sm:table-cell">
                        <div className="flex items-center justify-end gap-1 text-xs md:text-sm">
                          <Calendar className="h-3 w-3" />
                          {user.created_at.split("T")[0]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-8">
          <Card>
            <CardContent className="p-4 md:p-6 text-center">
              <Trophy className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-foreground">{userStats.rank}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Your Rank</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6 text-center">
              <Users className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-foreground">{leaderboard.length}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Total Players</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6 text-center">
              <Medal className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-foreground">{Math.max(0, pointsToTop3)}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Points to Top 3</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
