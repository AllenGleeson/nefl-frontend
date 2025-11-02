export type TeamRow = {
  position: number
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
}

export type LeagueTables = {
  Men: Record<string, TeamRow[]>
  Women: Record<string, TeamRow[]>
}