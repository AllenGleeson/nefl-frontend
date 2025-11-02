// src/components/Clubs/ClubDetails/index.tsx
import { Club } from "@/data/club";
import ClubAchievements from "./ClubAchievements";
import ClubFixtures from "./ClubFixtures";
import ClubHeader from "./ClubHeader";
import ClubHistory from "./ClubHistory";
import ClubRankings from "./ClubRankings";
import ClubSquad from "./ClubSquad";
import ClubStats from "./ClubStats";

interface ClubDetailsProps {
  club: Club;
}

export default function ClubDetails({ club }: ClubDetailsProps) {
  return (
    <div className="clubs-details-page max-w-6xl mx-auto px-4 py-8 text-white bg-black/30 backdrop-blur-sm rounded-lg">
      <ClubHeader 
        name={club.name} 
        logo={club.logo} 
        founded={club.founded} 
        ground={club.ground}
        bio={club.bio}
        leagues={club.leagues}
        website={club.website}
      />
      
      {club.stats && (
        <ClubStats 
          league={club.leagues[0]} 
          position={club.stats.leaguePosition}
          matchesPlayed={club.stats.matchesPlayed}
          wins={club.stats.wins}
          draws={club.stats.draws}
          losses={club.stats.losses}
          goalsFor={club.stats.goalsFor}
          goalsAgainst={club.stats.goalsAgainst}
        />
      )}
      
      <ClubRankings clubName={club.name} />
      
      {club.fixtures && club.fixtures.length > 0 && (
        <ClubFixtures fixtures={club.fixtures} />
      )}
      
      {club.squad && club.squad.length > 0 && (
        <ClubSquad 
          squad={club.squad} 
          formation={club.formation ? {
            id: club.formation.id,
            name: club.formation.name,
            description: club.formation.description,
            positions: club.formation.positions.map(pos => ({
              id: pos.id,
              position: pos.position,
              x: pos.x,
              y: pos.y,
              playerId: pos.playerId,
              playerName: pos.playerName
            })),
            isDefault: true,
            createdAt: '',
            updatedAt: ''
          } : undefined}
        />
      )}
      
      {club.history && (
        <ClubHistory 
          history={club.history.narrative}
        />
      )}
      
      {club.achievements && club.achievements.length > 0 && (
        <ClubAchievements achievements={club.achievements} />
      )}
    </div>
  );
}