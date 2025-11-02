import { notFound } from "next/navigation";
import Link from "next/link";
import { clubs } from "@/data/club"; // fixed typo: was club
import ClubDetails from "@/components/Clubs/ClubDetails";

interface ClubPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = clubs.find((club) => club.slug === slug);

  if (!club) {
    notFound();
  }

  return (
    <div
      className="px-4 py-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/clubspage.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Decorative club logo, contained to this page section */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 opacity-20"
        style={{
          top: '12vh',
          left: '6vw',
          backgroundImage: `url(${club.logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          backgroundSize: '50vw',
          width: '50vw',
          height: '50vw',
          maxWidth: '900px',
          maxHeight: '900px',
          filter: 'grayscale(20%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-xl bg-blue-100 border border-blue-300 text-blue-900 hover:bg-blue-200 transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          ← Back to Clubs
        </Link>
        <ClubDetails club={club} />
      </div>
    </div>
  );
}