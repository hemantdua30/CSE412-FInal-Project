export interface User {
  user_id: number
  name: string
  email: string
  password: string
  created_at: string
}

export interface Building {
  building_id: number
  name: string
  campus: string
  longitude: number
  latitude: number
}

export interface Spot {
  spot_id: number
  building_id: number
  name: string
  floor: number
  seat_count: number
  has_outlets: boolean
  is_quiet_zone: boolean
}

export interface Rating {
  rating_id: number
  user_id: number
  spot_id: number
  quiet_score: number
  comment: string
  created_at: string
}

export interface Favorite {
  user_id: number
  spot_id: number
  created_at: string
}

export interface SpotWithBuilding extends Spot {
  building: Building
}

export interface SpotWithSummary extends Spot {
  building: Pick<Building, 'name' | 'campus'>
  avg_quiet_score?: number
  rating_count?: number
}

export interface RatingWithUser extends Rating {
  users: Pick<User, 'name'>
}

export interface SessionUser {
  user_id: number
  name: string
  email: string
}

