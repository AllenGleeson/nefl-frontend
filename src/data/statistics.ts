// src/data/statistics.ts
export type StatRow = {
    id: string
    rank: number
    team: string
    badge: string
    goals: number
    assists: number
    season: string
    league: string
}

export const statisticsData: StatRow[] = [
    // Premier League 2025-26
    { id: "liverpool-2025-26", rank: 1, team: "Liverpool", badge: "/images/img4.webp", goals: 8, assists: 3, season: "2025-26", league: "Premier League" },
    { id: "chelsea-2025-26", rank: 2, team: "Chelsea", badge: "/images/img4.webp", goals: 7, assists: 4, season: "2025-26", league: "Premier League" },
    { id: "arsenal-2025-26", rank: 3, team: "Arsenal", badge: "/images/img4.webp", goals: 6, assists: 2, season: "2025-26", league: "Premier League" },
    { id: "tottenham-2025-26", rank: 4, team: "Tottenham", badge: "/images/img4.webp", goals: 5, assists: 5, season: "2025-26", league: "Premier League" },
    { id: "manchester-city-2025-26", rank: 5, team: "Manchester City", badge: "/images/img4.webp", goals: 5, assists: 1, season: "2025-26", league: "Premier League" },

    // La Liga 2025-26
    { id: "real-madrid-2025-26", rank: 1, team: "Real Madrid", badge: "/images/img4.webp", goals: 9, assists: 6, season: "2025-26", league: "La Liga" },
    { id: "barcelona-2025-26", rank: 2, team: "Barcelona", badge: "/images/img4.webp", goals: 8, assists: 7, season: "2025-26", league: "La Liga" },
    { id: "atletico-madrid-2025-26", rank: 3, team: "Atletico Madrid", badge: "/images/img4.webp", goals: 6, assists: 4, season: "2025-26", league: "La Liga" },
    { id: "sevilla-2025-26", rank: 4, team: "Sevilla", badge: "/images/img4.webp", goals: 4, assists: 3, season: "2025-26", league: "La Liga" },

    // Bundesliga 2025-26
    { id: "bayern-munich-2025-26", rank: 1, team: "Bayern Munich", badge: "/images/img4.webp", goals: 10, assists: 5, season: "2025-26", league: "Bundesliga" },
    { id: "borussia-dortmund-2025-26", rank: 2, team: "Borussia Dortmund", badge: "/images/img4.webp", goals: 7, assists: 4, season: "2025-26", league: "Bundesliga" },
    { id: "rb-leipzig-2025-26", rank: 3, team: "RB Leipzig", badge: "/images/img4.webp", goals: 6, assists: 2, season: "2025-26", league: "Bundesliga" },

    // Serie A 2025-26
    { id: "juventus-2025-26", rank: 1, team: "Juventus", badge: "/images/img4.webp", goals: 7, assists: 3, season: "2025-26", league: "Serie A" },
    { id: "inter-milan-2025-26", rank: 2, team: "Inter Milan", badge: "/images/img4.webp", goals: 6, assists: 4, season: "2025-26", league: "Serie A" },
    { id: "ac-milan-2025-26", rank: 3, team: "AC Milan", badge: "/images/img4.webp", goals: 5, assists: 2, season: "2025-26", league: "Serie A" },

    // Premier League 2024-25
    { id: "liverpool-2024-25", rank: 1, team: "Liverpool", badge: "/images/img4.webp", goals: 9, assists: 6, season: "2024-25", league: "Premier League" },
    { id: "manchester-united-2024-25", rank: 2, team: "Manchester United", badge: "/images/img4.webp", goals: 8, assists: 5, season: "2024-25", league: "Premier League" },
    { id: "arsenal-2024-25", rank: 3, team: "Arsenal", badge: "/images/img4.webp", goals: 7, assists: 4, season: "2024-25", league: "Premier League" },

    // La Liga 2024-25
    { id: "real-madrid-2024-25", rank: 1, team: "Real Madrid", badge: "/images/img4.webp", goals: 11, assists: 7, season: "2024-25", league: "La Liga" },
    { id: "barcelona-2024-25", rank: 2, team: "Barcelona", badge: "/images/img4.webp", goals: 10, assists: 6, season: "2024-25", league: "La Liga" },
    { id: "real-sociedad-2024-25", rank: 3, team: "Real Sociedad", badge: "/images/img4.webp", goals: 6, assists: 3, season: "2024-25", league: "La Liga" },
]