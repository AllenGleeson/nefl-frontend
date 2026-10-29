import Pitch from "./Pitch";
import type { Club } from "@/data/club";

interface ClubFormationProps {
  formation: NonNullable<Club["formation"]>;
}

// The club's preferred formation, shown as position markers on a pitch (no players).
export default function ClubFormation({ formation }: ClubFormationProps) {
  return (
    <section className="mt-8">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-2xl font-bold text-white">Formation</h2>
        <span className="text-lg font-semibold text-[var(--md-primary-container)]">{formation.name}</span>
      </div>
      {formation.description && <p className="text-white/70 mb-4">{formation.description}</p>}
      <div className="w-full max-w-4xl">
        <Pitch>
          {formation.positions.map((pos) => (
            <div
              key={pos.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.y}%`, top: `${pos.x}%` }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold bg-[var(--md-primary)] text-[var(--md-on-primary)] border-2 border-white shadow-lg"
                title={pos.position}
              >
                {pos.position}
              </div>
            </div>
          ))}
        </Pitch>
      </div>
    </section>
  );
}
