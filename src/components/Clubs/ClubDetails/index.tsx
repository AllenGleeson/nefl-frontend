// src/components/Clubs/ClubDetails/index.tsx
import { Club } from "@/data/club";
import ClubAchievements from "./ClubAchievements";
import ClubHeader from "./ClubHeader";
import ClubHistory from "./ClubHistory";
import ClubRankings from "./ClubRankings";
import ClubSquad from "./ClubSquad";

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
      <ClubRankings clubName={club.name} />
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