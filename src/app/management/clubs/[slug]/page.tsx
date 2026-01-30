import { clubs } from "@/data/club";
import ManagementClubPageClient from "./ManagementClubPageClient";

export async function generateStaticParams() {
  return clubs.map((club) => ({ slug: club.slug }));
}

export default function ManagementClubPage() {
  return <ManagementClubPageClient />;
}
