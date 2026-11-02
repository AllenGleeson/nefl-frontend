import { notFound } from "next/navigation";
import Link from "next/link";
import { clubs } from "@/data/club"; // fixed typo: was club
import ClubDetails from "@/components/Clubs/ClubDetails";
import { buttonStyles } from "@/components/ui/Button";

// Background layers, top to bottom. Colours are the theme's teal/blue (--md-primary family) at low opacity.
const PITCH_AT_NIGHT = [
  // Floodlight glow over the top of the page
  "radial-gradient(70% 45% at 50% -5%, rgba(139, 208, 239, 0.28), transparent 70%)",
  // Softer light spilling in from the sides
  "radial-gradient(45% 35% at 100% 30%, rgba(18, 102, 130, 0.35), transparent 70%)",
  "radial-gradient(45% 35% at 0% 70%, rgba(18, 102, 130, 0.28), transparent 70%)",
  // Mowing stripes
  "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 96px, transparent 96px 192px)",
  // Base: deep teal fading to near-black
  "linear-gradient(180deg, #0a2a38 0%, #051821 45%, #030f15 100%)",
].join(", ");

interface ClubPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return clubs.map((club) => ({ slug: club.slug }));
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = clubs.find((club) => club.slug === slug);

  if (!club) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden py-6 sm:py-10">
      {/* A floodlit pitch at night, drawn in CSS: glow from the lights, a faint centre circle and mowing stripes */}
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: PITCH_AT_NIGHT }} />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full border-2 border-white/[0.06]"
      />      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link
          href="/clubs"
          className={buttonStyles({ variant: "glass", size: "sm", className: "mb-4 sm:mb-6" })}
        >
          ← All clubs
        </Link>
        <ClubDetails club={club} />
      </div>
    </div>
  );
}