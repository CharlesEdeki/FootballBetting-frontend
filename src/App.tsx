import { useState } from "react"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"
import { Clock, Trophy } from "lucide-react"
import { Navigation } from "./components/navigation"
import { DataService } from "./lib/data-service"

type PredictionType = "HOME_WIN" | "AWAY_WIN" | "DRAW" | "CORRECT_SCORE" | null

interface Prediction {
  matchId: number
  type: PredictionType
  score?: string
}

function App() {
  const upcomingMatches = DataService.getUpcomingMatches()
  const completedMatches = DataService.getCompletedMatches()
  const allMatches = [...upcomingMatches, ...completedMatches]
  const currentUser = DataService.getCurrentUser()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [scoreInputs, setScoreInputs] = useState<{ [key: number]: string }>({})

  const handlePrediction = (matchId: number, type: PredictionType, score?: string) => {
    setPredictions((prev) => {
      const existing = prev.find((p) => p.matchId === matchId)
      if (existing && existing.type === type) {
        return prev.filter((p) => p.matchId !== matchId)
      }
      if (existing) {
        return prev.map((p) => (p.matchId === matchId ? { ...p, type, score } : p))
      }
      return [...prev, { matchId, type, score }]
    })
  }

  const handleScoreInput = (matchId: number, value: string) => {
    setScoreInputs((prev) => ({ ...prev, [matchId]: value }))
  }

  const handleScorePrediction = (matchId: number) => {
    const score = scoreInputs[matchId]
    if (score) {
      handlePrediction(matchId, "CORRECT_SCORE", score)
    }
  }

  const getPredictionForMatch = (matchId: number) => {
    return predictions.find((p) => p.matchId === matchId)
  }

  const groupMatchesByDate = (matches: any[]) => {
    const grouped: { [key: string]: any[] } = {}
    matches.forEach((match) => {
      const date = new Date(match.match_date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(match)
    })
    return grouped
  }

  const groupedMatches = groupMatchesByDate(allMatches)

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} />

      <div className="bg-card border-b text-card-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Trophy className="h-6 w-6 md:h-8 md:w-8" />
              Football Betting Platform
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Make your predictions and compete with other users
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        <div className="bg-muted/30 rounded-t-lg px-4 py-3 border-b">
          <div className="grid grid-cols-12 gap-2 items-center text-xs font-medium text-muted-foreground">
            <div className="col-span-1 text-center">Info</div>
            <div className="col-span-2"></div>
            <div className="col-span-6 text-center">
              <div className="grid grid-cols-4 gap-1">
                <div>Win</div>
                <div>Draw</div>
                <div>Lose</div>
                <div>Score</div>
              </div>
            </div>
            <div className="col-span-3"></div>
          </div>
        </div>

        <div className="bg-card rounded-b-lg border border-t-0 overflow-hidden">
          {Object.entries(groupedMatches).map(([date, matches]) => (
            <div key={date}>
              {/* Date header */}
              <div className="bg-muted/50 px-4 py-2 border-b">
                <h3 className="text-sm font-semibold text-foreground">{date}</h3>
              </div>

              {/* Matches for this date */}
              {matches.map((match) => {
                const prediction = getPredictionForMatch(match.match_id)
                const isCompleted = match.status === "completed"

                return (
                  <div
                    key={match.match_id}
                    className="px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-2 items-center">
                      {/* Match Info */}
                      <div className="col-span-1 text-center">
                        <div className="text-xs text-muted-foreground">
                          <div className="font-mono">{match.match_id}</div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>{match.match_time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Teams */}
                      <div className="col-span-2">
                        <div className="text-xs">
                          <div className="font-medium truncate">{match.home_team}</div>
                          <div className="font-medium truncate">{match.away_team}</div>
                        </div>
                      </div>

                      {/* Betting Buttons */}
                      <div className="col-span-6">
                        {!isCompleted && isLoggedIn ? (
                          <div className="grid grid-cols-4 gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePrediction(match.match_id, "HOME_WIN")}
                              className={`h-8 text-xs px-2 transition-all duration-200 ${
                                prediction?.type === "HOME_WIN"
                                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-600 text-white shadow-lg"
                                  : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                              }`}
                            >
                              🏆 Win
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePrediction(match.match_id, "DRAW")}
                              className={`h-8 text-xs px-2 transition-all duration-200 ${
                                prediction?.type === "DRAW"
                                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-600 text-white shadow-lg"
                                  : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                              }`}
                            >
                              🤝 Draw
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePrediction(match.match_id, "AWAY_WIN")}
                              className={`h-8 text-xs px-2 transition-all duration-200 ${
                                prediction?.type === "AWAY_WIN"
                                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-600 text-white shadow-lg"
                                  : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                              }`}
                            >
                              💔 Lose
                            </Button>
                            <div className="flex gap-1">
                              <Input
                                placeholder="2-1"
                                value={scoreInputs[match.match_id] || ""}
                                onChange={(e) => handleScoreInput(match.match_id, e.target.value)}
                                className="h-8 w-12 text-xs text-center p-1"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleScorePrediction(match.match_id)}
                                className={`h-8 text-xs px-1 transition-all duration-200 ${
                                  prediction?.type === "CORRECT_SCORE"
                                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-600 text-white shadow-lg"
                                    : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                                }`}
                              >
                                ✓
                              </Button>
                            </div>
                          </div>
                        ) : !isCompleted && !isLoggedIn ? (
                          <div className="text-center text-xs text-muted-foreground">Login to make predictions</div>
                        ) : (
                          <div className="grid grid-cols-4 gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="h-8 bg-muted/50 rounded text-center flex items-center justify-center text-xs text-muted-foreground"
                              >
                                -
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Status/Score */}
                      <div className="col-span-3 text-right">
                        {isCompleted && match.actual_score ? (
                          <Badge variant="secondary" className="text-xs">
                            {match.actual_score}
                          </Badge>
                        ) : prediction ? (
                          <Badge variant="outline" className="text-xs">
                            Selected
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {predictions.length > 0 && (
          <div className="mt-6 text-center">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Submit All Predictions ({predictions.length})
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App