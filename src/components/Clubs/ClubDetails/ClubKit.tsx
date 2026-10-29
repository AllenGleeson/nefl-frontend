"use client";

import Image from "next/image";
import { assetUrl } from "@/utils/assetUrl";

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
  const entries = Object.entries(kit).filter(
    ([, url]) => url && typeof url === "string"
  ) as [string, string][];
  if (entries.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Kit</h2>
      <div className="flex flex-wrap gap-6">
        {entries.map(([key, src]) => (
          <div
            key={key}
            className="rounded-lg border border-white/10 overflow-hidden bg-white/5 p-4 flex flex-col items-center"
          >
            <div className="relative w-32 h-40 sm:w-40 sm:h-48">
              <Image
                src={assetUrl(src)}
                alt={`${LABELS[key] ?? key} kit`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
            <span className="mt-2 text-sm font-medium text-white/80 capitalize">
              {LABELS[key] ?? key}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
