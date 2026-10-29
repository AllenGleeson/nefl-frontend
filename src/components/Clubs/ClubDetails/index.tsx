// src/components/Clubs/ClubDetails/index.tsx
import { Club } from "@/data/club";
import ClubAchievements from "./ClubAchievements";
import ClubContacts from "./ClubContacts";
import ClubGrounds from "./ClubGrounds";
import ClubHeader from "./ClubHeader";
import ClubKit from "./ClubKit";
import ClubRankings from "./ClubRankings";
import ClubFormation from "./ClubFormation";

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
        website={club.website}
        facebook={club.facebook}
        instagram={club.instagram}
        twitter={club.twitter}
      />
      <ClubRankings clubName={club.name} />
      {club.formation && <ClubFormation formation={club.formation} />}
      {club.achievements && club.achievements.length > 0 && (
        <ClubAchievements achievements={club.achievements} />
      )}
      {club.contacts && club.contacts.length > 0 && (
        <ClubContacts contacts={club.contacts} />
      )}
      {club.kit && Object.values(club.kit).some(Boolean) && (
        <ClubKit kit={club.kit} />
      )}
      {club.ground && (
        <ClubGrounds
          groundName={club.grounds?.name ?? club.ground}
          image={club.grounds?.image}
          mapsUrl={club.grounds?.mapsUrl}
        />
      )}
    </div>
  );
}