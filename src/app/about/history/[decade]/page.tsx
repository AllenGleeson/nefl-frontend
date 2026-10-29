import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDecade, leagueHistory } from "@/data/leagueHistory";
import DecadeStory from "@/components/About/History/DecadeStory";

type Props = { params: Promise<{ decade: string }> };

export function generateStaticParams() {
  return leagueHistory.map((d) => ({ decade: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decade = getDecade((await params).decade);
  return decade
    ? { title: `${decade.years}: ${decade.title} | NEFL History`, description: decade.summary }
    : {};
}

export default async function DecadePage({ params }: Props) {
  const decade = getDecade((await params).decade);
  if (!decade) notFound();
  return <DecadeStory decade={decade} />;
}
