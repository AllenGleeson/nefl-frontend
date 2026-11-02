import Pitch from "./Pitch";
import ClubSection from "./ClubSection";
import type { Club } from "@/data/club";

interface ClubFormationProps {
  formation: NonNullable<Club["formation"]>;
}

// The club's preferred formation, shown as position markers on a pitch (no players).
export default function ClubFormation({ formation }: ClubFormationProps) {
  return (
    <ClubSection
      title="Formation"
      action={
        <span className="cursor-default select-none rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] px-3 py-1 text-sm font-bold">
          {formation.name}
        </span>
      }
    >
      <Pitch>
        {formation.positions.map((pos) => (
          <div
            key={pos.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.y}%`, top: `${pos.x}%` }}
          >
            <div
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] border-2 border-white shadow-lg"
              title={pos.position}
            >
              {pos.position}
            </div>
          </div>
        ))}
      </Pitch>
    </ClubSection>
  );
}
