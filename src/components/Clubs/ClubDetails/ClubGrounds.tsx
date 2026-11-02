import Image from "next/image";
import { MapPin } from "lucide-react";
import { assetUrl } from "@/utils/assetUrl";
import { buttonStyles } from "@/components/ui/Button";
import ClubSection from "./ClubSection";

interface ClubGroundsProps {
  groundName: string;
  image?: string;
  mapsUrl?: string;
}

export default function ClubGrounds({ groundName, image, mapsUrl }: ClubGroundsProps) {
  // "Ireland" keeps Google from matching a ground with the same name elsewhere
  const query = encodeURIComponent(`${groundName}, Ireland`);
  // Keyless Google Maps embed, so it works on the static site
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
  // Use the club's own link if it has one, otherwise Google directions to the ground
  const directions = mapsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <ClubSection title="Home ground">
      <p className="flex items-start gap-2 font-semibold mb-3">
        <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[var(--md-primary)]" aria-hidden />
        {groundName}
      </p>

      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)]">
        <iframe
          src={embedUrl}
          title={`Map of ${groundName}`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {image && (
        <div className="relative w-full aspect-[16/9] mt-3 rounded-xl overflow-hidden bg-[var(--md-surface-container)]">
          <Image src={assetUrl(image)} alt={groundName} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 360px" />
        </div>
      )}

      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        // Dark blue, turning light blue on hover (the hover tokens are swapped just for this button)
        className={buttonStyles({
          variant: "tonal",
          size: "sm",
          className:
            "mt-4 [--md-primary-container-hover:var(--md-primary)] hover:[--md-on-primary-container:var(--md-on-primary)]",
        })}
      >
        Get directions
      </a>
    </ClubSection>
  );
}
