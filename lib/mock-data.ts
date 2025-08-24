// Mock database structure based on the original specification

export interface User {
  user_id: number
  username: string
  email: string
  total_points: number
  created_at: string
  avatar: string
}

export interface Match {
  match_id: number
  home_team: string
  away_team: string
  match_date: string
  match_time: string
  actual_result?: "HOME_WIN" | "AWAY_WIN" | "DRAW"
  actual_score?: string
  status: "upcoming" | "completed"
  created_at: string
}

export interface Prediction {
  prediction_id: number
  user_id: number
  match_id: number
  prediction_type: "HOME_WIN" | "AWAY_WIN" | "DRAW" | "CORRECT_SCORE"
  predicted_score?: string
  points_earned: number
  submitted_at: string
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    user_id: 1,
    username: "PredictionKing",
    email: "predictionking@example.com",
    total_points: 1250,
    created_at: "2023-06-15T10:00:00Z",
    avatar: "PK",
  },
  {
    user_id: 2,
    username: "SportsMaster99",
    email: "sportsmaster99@example.com",
    total_points: 1180,
    created_at: "2023-07-02T14:30:00Z",
    avatar: "SM",
  },
  {
    user_id: 3,
    username: "GoalGuesser",
    email: "goalguesser@example.com",
    total_points: 1050,
    created_at: "2023-07-20T09:15:00Z",
    avatar: "GG",
  },
  {
    user_id: 4,
    username: "MatchPredictor",
    email: "matchpredictor@example.com",
    total_points: 980,
    created_at: "2023-08-01T16:45:00Z",
    avatar: "MP",
  },
  {
    user_id: 5,
    username: "ScoreWizard",
    email: "scorewizard@example.com",
    total_points: 920,
    created_at: "2023-08-10T11:20:00Z",
    avatar: "SW",
  },
  {
    user_id: 6,
    username: "FootballFan",
    email: "footballfan@example.com",
    total_points: 850,
    created_at: "2023-08-12T13:00:00Z",
    avatar: "FF",
  },
  {
    user_id: 7,
    username: "WinPredictor",
    email: "winpredictor@example.com",
    total_points: 780,
    created_at: "2023-08-14T08:30:00Z",
    avatar: "WP",
  },
  {
    user_id: 8,
    username: "SportsFan123",
    email: "sportsfan123@example.com",
    total_points: 245,
    created_at: "2023-08-15T12:00:00Z",
    avatar: "SF",
  },
]

// Mock Matches Data
export const mockMatches: Match[] = [
  // Upcoming matches
  {
    match_id: 1,
    home_team: "Manchester United",
    away_team: "Liverpool",
    match_date: "2024-01-15",
    match_time: "15:00",
    status: "upcoming",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    match_id: 2,
    home_team: "Arsenal",
    away_team: "Chelsea",
    match_date: "2024-01-16",
    match_time: "17:30",
    status: "upcoming",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    match_id: 3,
    home_team: "Barcelona",
    away_team: "Real Madrid",
    match_date: "2024-01-17",
    match_time: "20:00",
    status: "upcoming",
    created_at: "2024-01-10T10:00:00Z",
  },
  // Completed matches
  {
    match_id: 4,
    home_team: "Chelsea",
    away_team: "Arsenal",
    match_date: "2024-01-11",
    match_time: "15:00",
    actual_result: "DRAW",
    actual_score: "1-1",
    status: "completed",
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    match_id: 5,
    home_team: "Liverpool",
    away_team: "Manchester City",
    match_date: "2024-01-08",
    match_time: "17:30",
    actual_result: "AWAY_WIN",
    actual_score: "0-2",
    status: "completed",
    created_at: "2024-01-02T10:00:00Z",
  },
  {
    match_id: 6,
    home_team: "Barcelona",
    away_team: "Real Madrid",
    match_date: "2024-01-05",
    match_time: "20:00",
    actual_result: "HOME_WIN",
    actual_score: "2-1",
    status: "completed",
    created_at: "2023-12-30T10:00:00Z",
  },
  {
    match_id: 7,
    home_team: "PSG",
    away_team: "Bayern Munich",
    match_date: "2024-01-02",
    match_time: "19:00",
    actual_result: "DRAW",
    actual_score: "2-2",
    status: "completed",
    created_at: "2023-12-28T10:00:00Z",
  },
  {
    match_id: 8,
    home_team: "Juventus",
    away_team: "AC Milan",
    match_date: "2023-12-28",
    match_time: "18:00",
    actual_result: "HOME_WIN",
    actual_score: "3-1",
    status: "completed",
    created_at: "2023-12-22T10:00:00Z",
  },
]

// Mock Predictions Data (for SportsFan123 - user_id: 8)
export const mockPredictions: Prediction[] = [
  {
    prediction_id: 1,
    user_id: 8,
    match_id: 4,
    prediction_type: "HOME_WIN",
    points_earned: 0,
    submitted_at: "2024-01-10T14:30:00Z",
  },
  {
    prediction_id: 2,
    user_id: 8,
    match_id: 5,
    prediction_type: "AWAY_WIN",
    points_earned: 3,
    submitted_at: "2024-01-07T16:20:00Z",
  },
  {
    prediction_id: 3,
    user_id: 8,
    match_id: 6,
    prediction_type: "CORRECT_SCORE",
    predicted_score: "2-1",
    points_earned: 10,
    submitted_at: "2024-01-04T19:45:00Z",
  },
  {
    prediction_id: 4,
    user_id: 8,
    match_id: 7,
    prediction_type: "DRAW",
    points_earned: 5,
    submitted_at: "2024-01-01T18:30:00Z",
  },
  {
    prediction_id: 5,
    user_id: 8,
    match_id: 8,
    prediction_type: "HOME_WIN",
    points_earned: 2,
    submitted_at: "2023-12-27T17:15:00Z",
  },
]

// Point values for different prediction types
export const POINT_VALUES = {
  HOME_WIN: 2,
  AWAY_WIN: 3,
  DRAW: 5,
  CORRECT_SCORE: 10,
} as const
