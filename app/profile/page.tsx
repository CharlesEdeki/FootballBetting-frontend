"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Calendar, Target, TrendingUp, Award, CheckCircle, XCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { DataService } from "@/lib/data-service"

export default function ProfilePage() {
  const userStats = DataService.getUserStats()
  const predictionHistory = DataService.getPredictionHistory()
  const currentUser = userStats.user

  if (!currentUser) {
    return <div>User not found</div>
  }

  const getPredictionIcon = (pointsEarned: number) => {
    if (pointsEarned > 0) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation showBackButton />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Your Profile</h2>
          <p className="text-sm md:text-base text-muted-foreground">Track your prediction performance and history</p>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-16 md:h-20 w-16 md:w-20 mb-4">
                <AvatarFallback className="text-xl md:text-2xl font-bold">{currentUser.avatar}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg md:text-xl">{currentUser.username}</CardTitle>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1 mt-2">
                <Calendar className="h-3 w-3" />
                Joined {currentUser.created_at.split("T")[0]}
              </p>
            </CardHeader>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <Trophy className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
                <p className="text-lg md:text-2xl font-bold text-foreground">{currentUser.total_points}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total Points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <Award className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
                <p className="text-lg md:text-2xl font-bold text-foreground">#{userStats.rank}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Current Rank</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <Target className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
                <p className="text-lg md:text-2xl font-bold text-foreground">{userStats.totalPredictions}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Predictions Made</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <TrendingUp className="h-6 md:h-8 w-6 md:w-8 text-primary mx-auto mb-2" />
                <p className="text-lg md:text-2xl font-bold text-foreground">{userStats.accuracy}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Accuracy Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prediction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Calendar className="h-5 w-5" />
              Prediction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Match</th>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Your Prediction</th>
                    <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base hidden md:table-cell">
                      Actual Result
                    </th>
                    <th className="text-right p-3 md:p-4 font-semibold text-sm md:text-base">Points</th>
                    <th className="text-center p-3 md:p-4 font-semibold text-sm md:text-base">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {predictionHistory.map((prediction) => (
                    <tr key={prediction!.prediction_id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 md:p-4">
                        <div>
                          <p className="font-medium text-foreground text-sm md:text-base">
                            {prediction!.homeTeam} vs {prediction!.awayTeam}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">Final: {prediction!.actualScore}</p>
                          <p className="text-xs text-muted-foreground sm:hidden flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {prediction!.date}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {prediction!.date}
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <Badge variant="outline" className="font-medium text-xs md:text-sm">
                          {DataService.formatPredictionText(prediction!.prediction_type, prediction!.predicted_score)}
                        </Badge>
                        <div className="md:hidden mt-1">
                          <Badge variant="secondary" className="font-medium text-xs">
                            {DataService.formatResultText(prediction!.actualResult!)}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 hidden md:table-cell">
                        <Badge variant="secondary" className="font-medium">
                          {DataService.formatResultText(prediction!.actualResult!)}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4 text-right">
                        <Badge
                          variant={prediction!.points_earned > 0 ? "default" : "destructive"}
                          className="font-bold text-xs md:text-sm"
                        >
                          {prediction!.points_earned > 0 ? `+${prediction!.points_earned}` : prediction!.points_earned}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4 text-center">{getPredictionIcon(prediction!.points_earned)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Recent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Last 5 Predictions</span>
                  <div className="flex gap-1">
                    {userStats.recentPerformance.map((isCorrect, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Correct Predictions</span>
                  <span className="font-semibold text-sm md:text-base">
                    {userStats.correctPredictions}/{userStats.totalPredictions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Best Streak</span>
                  <span className="font-semibold text-sm md:text-base">3 in a row</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Prediction Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Home Wins</span>
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {userStats.predictionBreakdown.HOME_WIN || 0} predictions
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Away Wins</span>
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {userStats.predictionBreakdown.AWAY_WIN || 0} predictions
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Draws</span>
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {userStats.predictionBreakdown.DRAW || 0} predictions
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm md:text-base">Correct Scores</span>
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {userStats.predictionBreakdown.CORRECT_SCORE || 0} predictions
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
