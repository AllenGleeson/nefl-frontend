"use client";

import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { assetUrl } from "@/utils/assetUrl";

interface ClubGroundsProps {
  groundName: string;
  image?: string;
  mapsUrl?: string;
}

export default function ClubGrounds({
  groundName,
  image,
  mapsUrl,
}: ClubGroundsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Grounds</h2>
      <div className="rounded-lg border border-white/10 overflow-hidden bg-white/5">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {image && (
            <div className="relative w-full sm:w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-white/10">
              <Image
                src={assetUrl(image)}
                alt={groundName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 256px"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <h3 className="text-lg font-semibold text-white">{groundName}</h3>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors w-fit"
                aria-label={`View ${groundName} on Google Maps`}
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white">
                  <FaLocationDot className="w-4 h-4" />
                </span>
                <span>View on Google Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
