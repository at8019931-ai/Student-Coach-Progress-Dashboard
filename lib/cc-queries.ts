import { ccQuery } from './cc-db'

export interface CCStudentData {
  player_id: string
  student_name: string
  rating: number
  league_name: string | null
  class_name: string | null
  subscription_status: number | null
  subscription_start_date: string | null
  subscription_end_date: string | null
  total_sessions: number | null
  total_points: number
  last_30_days_points: number
  matches_played: number
  wins: number
  losses: number
  win_percentage: number
}

const STUDENT_DASHBOARD_QUERY = `
  SELECT
    lp.player_id,
    lp.name AS student_name,
    lp.rating,
    cl.name AS league_name,
    cr.class_name,
    cr.status AS subscription_status,
    cr.subscription_start_date,
    cr.subscription_end_date,
    cr.total_sessions,
    COALESCE(ds.total_points, 0) AS total_points,
    COALESCE(ds.last_30_days_points, 0) AS last_30_days_points,
    COALESCE(ms.matches_played, 0) AS matches_played,
    COALESCE(ms.wins, 0) AS wins,
    COALESCE(ms.losses, 0) AS losses,
    ROUND(
      CASE
        WHEN COALESCE(ms.matches_played, 0) = 0 THEN 0
        ELSE (ms.wins::decimal / ms.matches_played) * 100
      END, 2
    ) AS win_percentage
  FROM cc_league_players lp
  LEFT JOIN cc_leagues cl ON cl.id = lp.league_id
  LEFT JOIN cc_csoc_registration cr ON cr.player_id = lp.player_id AND cr.status = 1
  LEFT JOIN (
    SELECT
      player_id,
      SUM(total_score) AS total_points,
      SUM(CASE WHEN date >= CURRENT_DATE - INTERVAL '30 days' THEN total_score ELSE 0 END) AS last_30_days_points
    FROM cc_league_daily_score
    GROUP BY player_id
  ) ds ON ds.player_id = lp.player_id
  LEFT JOIN (
    SELECT
      player_id,
      COUNT(*) AS matches_played,
      SUM(CASE WHEN player_score > opponent_score THEN 1 ELSE 0 END) AS wins,
      SUM(CASE WHEN player_score < opponent_score THEN 1 ELSE 0 END) AS losses
    FROM cc_league_matches
    GROUP BY player_id
  ) ms ON ms.player_id = lp.player_id
  WHERE lp.player_id = $1
    AND lp.is_active = 1
`

export async function getStudentDashboardData(playerId: string): Promise<CCStudentData | null> {
  const rows = await ccQuery<CCStudentData>(STUDENT_DASHBOARD_QUERY, [playerId])
  return rows[0] ?? null
}

export async function getAllStudentsDashboardData(): Promise<CCStudentData[]> {
  const sql = STUDENT_DASHBOARD_QUERY.replace('WHERE lp.player_id = $1\n    AND lp.is_active = 1', 'WHERE lp.is_active = 1')
  return ccQuery<CCStudentData>(sql)
}
