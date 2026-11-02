import Image from "next/image";
import { assetUrl } from "@/utils/assetUrl";
import ClubSection from "./ClubSection";

type KitImages = {
  home?: string;
  away?: string;
  [key: string]: string | undefined;
};

interface ClubKitProps {
  kit: KitImages;
}

const LABELS: Record<string, string> = {
  home: "Home",
  away: "Away",
};

export default function ClubKit({ kit }: ClubKitProps) {
  const entries = Object.entries(kit).filter(([, url]) => url && typeof url === "string") as [string, string][];
  if (entries.length === 0) return null;

  return (
    <ClubSection title="Kit">
      <div className="grid grid-cols-2 gap-3">
        {entries.map(([key, src]) => (
          <figure key={key} className="rounded-xl bg-[var(--md-surface-container-low)] p-3 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={assetUrl(src)}
                alt={`${LABELS[key] ?? key} kit`}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
            <figcaption className="mt-2 text-sm font-medium text-[var(--md-on-surface-variant)] capitalize">
              {LABELS[key] ?? key}
            </figcaption>
          </figure>
        ))}
      </div>
    </ClubSection>
  );
}
