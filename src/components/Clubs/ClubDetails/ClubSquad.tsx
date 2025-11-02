"use client";

import { Player } from "@/data/club";
import { Formation } from "@/api/ClubsService";
import SquadFormationTabs from "./SquadFormationTabs";

interface ClubSquadProps {
    squad: Player[];
    formation?: Formation;
}

export default function ClubSquad({ squad, formation }: ClubSquadProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Squad & Formation</h2>
            <SquadFormationTabs squad={squad} formation={formation} />
        </div>
    );
}