// src/components/Clubs/ClubDetails/index.tsx
import { Club } from "@/data/club";
import ClubAchievements from "./ClubAchievements";
import ClubContacts from "./ClubContacts";
import ClubGrounds from "./ClubGrounds";
import ClubHeader from "./ClubHeader";
import ClubKit from "./ClubKit";
import ClubMatches from "./ClubMatches";
import ClubRankings from "./ClubRankings";
import ClubFormation from "./ClubFormation";
import { getClubHonours } from "@/utils/rollOfHonour";

interface ClubDetailsProps {
  club: Club;
}

export default function ClubDetails({ club }: ClubDetailsProps) {
  const honours = getClubHonours(club.name);

  return (
    <div className="space-y-6">
      <ClubHeader club={club} />

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Main column: matches, table, formation */}
        <div className="space-y-6 lg:col-span-2 min-w-0">
          <ClubMatches clubName={club.name} />
          <ClubRankings clubName={club.name} />
          {club.formation && <ClubFormation formation={club.formation} />}
        </div>

        {/* Side column: ground, honours, contacts, kit */}
        <div className="space-y-6 min-w-0">
          {club.ground && (
            <ClubGrounds
              groundName={club.grounds?.name ?? club.ground}
              image={club.grounds?.image}
              mapsUrl={club.grounds?.mapsUrl}
            />
          )}
          {honours.length > 0 && <ClubAchievements honours={honours} />}
          {club.contacts && club.contacts.length > 0 && <ClubContacts contacts={club.contacts} />}
          {club.kit && Object.values(club.kit).some(Boolean) && <ClubKit kit={club.kit} />}
        </div>
      </div>
    </div>
  );
}
