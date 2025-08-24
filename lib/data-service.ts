import {
  mockUsers,
  mockMatches,
  mockPredictions,
  type User,
  type Match,
  type Prediction,
  POINT_VALUES,
} from "./mock-data"

// Current user ID (in a real app, this would come from authentication)
const CURRENT_USER_ID = 8

export class DataService {
  // User methods
  static getCurrentUser(): User | undefined {
    return mockUsers.find((user) => user.user_id === CURRENT_USER_ID)
  }

  static getAllUsers(): User[] {
    return mockUsers
  }

  static getLeaderboard(): User[] {
    return mockUsers
      .sort((a, b) => {
        if (b.total_points !== a.total_points) {
          return b.total_points - a.total_points
        }
        // Tie-breaker: most recent activity (created_at)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
      .map((user, index) => ({ ...user, rank: index + 1 }))
  }

  // Match methods
  static getUpcomingMatches(): Match[] {
    return mockMatches.filter((match) => match.status === "upcoming")
  }

  static getCompletedMatches(): Match[] {
    return mockMatches.filter((match) => match.status === "completed")
  }

  static getMatchById(matchId: number): Match | undefined {
    return mockMatches.find((match) => match.match_id === matchId)
  }

  // Prediction methods
  static getUserPredictions(userId: number = CURRENT_USER_ID): Prediction[] {
    return mockPredictions.filter((prediction) => prediction.user_id === userId)
  }

  static getPredictionHistory(userId: number = CURRENT_USER_ID) {
    const userPredictions = this.getUserPredictions(userId)
    const completedMatches = this.getCompletedMatches()

    return userPredictions
      .map((prediction) => {
        const match = completedMatches.find((m) => m.match_id === prediction.match_id)
        if (!match) return null

        return {
          ...prediction,
          match,
          homeTeam: match.home_team,
          awayTeam: match.away_team,
          date: match.match_date,
          actualResult: match.actual_result,
          actualScore: match.actual_score,
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b!.submitted_at).getTime() - new Date(a!.submitted_at).getTime())
  }

  static getUserStats(userId: number = CURRENT_USER_ID) {
    const user = mockUsers.find((u) => u.user_id === userId)
    const predictions = this.getUserPredictions(userId)
    const correctPredictions = predictions.filter((p) => p.points_earned > 0)

    const leaderboard = this.getLeaderboard()
    const userRank = leaderboard.findIndex((u) => u.user_id === userId) + 1

    // Calculate prediction type breakdown
    const predictionBreakdown = predictions.reduce(
      (acc, prediction) => {
        acc[prediction.prediction_type] = (acc[prediction.prediction_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      user,
      rank: userRank,
      totalPredictions: predictions.length,
      correctPredictions: correctPredictions.length,
      accuracy:
        predictions.length > 0 ? Math.round((correctPredictions.length / predictions.length) * 100 * 10) / 10 : 0,
      predictionBreakdown,
      recentPerformance: predictions.slice(-5).map((p) => p.points_earned > 0),
    }
  }

  // Utility methods
  static getPointsForPrediction(predictionType: keyof typeof POINT_VALUES): number {
    return POINT_VALUES[predictionType]
  }

  static formatPredictionText(predictionType: string, predictedScore?: string): string {
    switch (predictionType) {
      case "HOME_WIN":
        return "Home Win"
      case "AWAY_WIN":
        return "Away Win"
      case "DRAW":
        return "Draw"
      case "CORRECT_SCORE":
        return `Correct Score: ${predictedScore}`
      default:
        return predictionType
    }
  }

  static formatResultText(result: string): string {
    switch (result) {
      case "HOME_WIN":
        return "Home Win"
      case "AWAY_WIN":
        return "Away Win"
      case "DRAW":
        return "Draw"
      default:
        return result
    }
  }

  // Simulate adding a new prediction (in a real app, this would make an API call)
  static addPrediction(matchId: number, predictionType: keyof typeof POINT_VALUES, predictedScore?: string) {
    const newPrediction: Prediction = {
      prediction_id: mockPredictions.length + 1,
      user_id: CURRENT_USER_ID,
      match_id: matchId,
      prediction_type: predictionType,
      predicted_score: predictedScore,
      points_earned: 0, // Will be calculated when match is completed
      submitted_at: new Date().toISOString(),
    }

    mockPredictions.push(newPrediction)
    return newPrediction
  }
}
