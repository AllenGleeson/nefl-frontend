import { getAllFixtureSlugs } from "@/data/fixtures";
import FixturePageClient from "./FixturePageClient";

export async function generateStaticParams() {
  return getAllFixtureSlugs();
}

export default function FixturePage() {
  return <FixturePageClient />;
}
