import Image from "next/image";
import { assetUrl } from "@/utils/assetUrl";
import { getClubCrest } from "@/utils/clubLogos";

const SIZES = {
  sm: "w-6 h-6 text-[9px]",
  md: "w-8 h-8 text-[10px]",
} as const;

/** A club's crest, or its initials in a circle when we don't have one */
export default function ClubCrest({ name, size = "md" }: { name: string; size?: keyof typeof SIZES }) {
  const crest = getClubCrest(name);
  const box = `relative shrink-0 ${SIZES[size]}`;

  if (crest) {
    return (
      <span className={box}>
        <Image src={assetUrl(crest)} alt="" fill className="object-contain" sizes="32px" />
      </span>
    );
  }

  const initials = name
    .replace(/\b(FC|AFC|United|Celtic)\b/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      className={`${box} rounded-full bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)] font-bold flex items-center justify-center`}
    >
      {initials || name[0]}
    </span>
  );
}
