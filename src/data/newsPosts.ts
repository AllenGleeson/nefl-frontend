export type NewsPost = {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  tags: string[]
  isFeatured?: boolean
  slug: string
}

// Helper function to generate slugs from titles
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const newsPosts: NewsPost[] = [
  {
    id: 1,
    title: "*WATCH* Walshestown Fc v Athboy Celtic Match Highlights",
    excerpt:
      "Watch the extended match highlights from this O Neills Sportswear Division 1 game. 8 goals captured in this game plus plenty more action.",
    date: "2025-07-31",
    image: "/images/news/news-1.webp",
    tags: ["Division 1", "Highlights", "Video"],
    isFeatured: true,
    slug: generateSlug("*WATCH* Walshestown Fc v Athboy Celtic Match Highlights"),
  },
  {
    id: 2,
    title: "*WATCH* Kentstown Rovers v Duleek FC Match Highlights",
    excerpt:
      "Extended highlights from this UHY Farrelly Dawe White Premier Division clash between local rivals. 10 goal thriller captured on NEFL.TV.",
    date: "2025-07-25",
    image: "/images/news/news-2.webp",
    tags: ["Premier Division", "Highlights", "Video"],
    isFeatured: true,
    slug: generateSlug("*WATCH* Kentstown Rovers v Duleek FC Match Highlights"),
  },
  {
    id: 3,
    title: "Confirmed Fixtures",
    excerpt:
      "Upcoming fixtures including PM Blinds & Shutters Mens Challenge Cup, Fiachra O'Neill Shield, and more.",
    date: "2025-07-23",
    image: "/images/news/news-3.webp",
    tags: ["Fixtures", "Cup"],
    slug: generateSlug("Confirmed Fixtures"),
  },
  {
    id: 4,
    title: "NEFL League Cup Final Preview",
    excerpt:
      "Everything you need to know about the upcoming League Cup Final between Manchester United and Liverpool. Match preview, team news, and predictions.",
    date: "2025-07-20",
    image: "/images/news/news-4.webp",
    tags: ["Cup Final", "Preview", "Manchester United", "Liverpool"],
    slug: generateSlug("NEFL League Cup Final Preview"),
  },
  {
    id: 5,
    title: "Transfer Window Roundup",
    excerpt:
      "A comprehensive look at all the major transfers and signings during the summer transfer window. Who made the best moves?",
    date: "2025-07-18",
    image: "/images/news/news-5.webp",
    tags: ["Transfers", "Signings", "Transfer Window"],
    slug: generateSlug("Transfer Window Roundup"),
  },
  {
    id: 6,
    title: "Championship Race Heats Up",
    excerpt:
      "With just 5 games remaining, the race for the championship title is more intense than ever. Analysis of the top contenders and their remaining fixtures.",
    date: "2025-07-15",
    image: "/images/news/news-6.webp",
    tags: ["Championship", "Title Race", "Analysis"],
    isFeatured: true,
    slug: generateSlug("Championship Race Heats Up"),
  },
  {
    id: 7,
    title: "New Signing Joins Arsenal Squad",
    excerpt:
      "Arsenal FC has announced the signing of a promising young midfielder from the academy. The 19-year-old is expected to make an immediate impact.",
    date: "2025-07-12",
    image: "/images/news/news-1.webp",
    tags: ["Arsenal", "Signings", "Academy"],
    slug: generateSlug("New Signing Joins Arsenal Squad"),
  },
  {
    id: 8,
    title: "Match of the Day: Chelsea vs Tottenham",
    excerpt:
      "A thrilling London derby that had everything - goals, drama, and controversy. Relive the key moments from this Premier League classic.",
    date: "2025-07-10",
    image: "/images/news/news-2.webp",
    tags: ["Chelsea", "Tottenham", "London Derby", "Premier League"],
    slug: generateSlug("Match of the Day: Chelsea vs Tottenham"),
  },
  {
    id: 9,
    title: "Injury Update: Key Players Return",
    excerpt:
      "Several key players are set to return from injury just in time for the crucial final stretch of the season. Medical team provides latest updates.",
    date: "2025-07-08",
    image: "/images/news/news-3.webp",
    tags: ["Injuries", "Medical", "Return"],
    slug: generateSlug("Injury Update: Key Players Return"),
  },
  {
    id: 10,
    title: "Youth Academy Success Story",
    excerpt:
      "How the NEFL Youth Academy has produced some of the league's brightest talents. A look at the development pathway and success stories.",
    date: "2025-07-05",
    image: "/images/news/news-4.webp",
    tags: ["Youth Academy", "Development", "Success"],
    slug: generateSlug("Youth Academy Success Story"),
  },
  {
    id: 11,
    title: "Referee Spotlight: Meet the Officials",
    excerpt:
      "Get to know the referees who keep the game fair and safe. Their journey to the top and what it takes to officiate at the highest level.",
    date: "2025-07-02",
    image: "/images/news/news-5.webp",
    tags: ["Referees", "Officials", "Spotlight"],
    slug: generateSlug("Referee Spotlight: Meet the Officials"),
  },
  {
    id: 12,
    title: "Stadium Upgrades Complete",
    excerpt:
      "Major stadium improvements have been completed across several venues. New facilities, improved seating, and enhanced fan experience await.",
    date: "2025-06-28",
    image: "/images/news/news-6.webp",
    tags: ["Stadium", "Upgrades", "Facilities"],
    slug: generateSlug("Stadium Upgrades Complete"),
  },
  {
    id: 13,
    title: "Community Outreach Program",
    excerpt:
      "NEFL's commitment to the community continues with new outreach programs. Football clinics, school visits, and charity events planned.",
    date: "2025-06-25",
    image: "/images/news/news-1.webp",
    tags: ["Community", "Outreach", "Charity"],
    slug: generateSlug("Community Outreach Program"),
  },
  {
    id: 14,
    title: "Women's League Expansion",
    excerpt:
      "Exciting news as the women's league expands to include more teams and divisions. A major step forward for women's football in the region.",
    date: "2025-06-22",
    image: "/images/news/news-2.webp",
    tags: ["Women's Football", "Expansion", "Growth"],
    slug: generateSlug("Women's League Expansion"),
  },
  {
    id: 15,
    title: "Technology in Football",
    excerpt:
      "How modern technology is changing the game. From VAR to performance analytics, explore the innovations shaping football's future.",
    date: "2025-06-20",
    image: "/images/news/news-3.webp",
    tags: ["Technology", "VAR", "Analytics", "Innovation"],
    slug: generateSlug("Technology in Football"),
  },
  {
    id: 16,
    title: "Fan Engagement Initiatives",
    excerpt:
      "New initiatives to enhance fan engagement and create memorable matchday experiences. Interactive features and digital platforms launched.",
    date: "2025-06-18",
    image: "/images/news/news-4.webp",
    tags: ["Fan Engagement", "Digital", "Matchday Experience"],
    slug: generateSlug("Fan Engagement Initiatives"),
  },
  {
    id: 17,
    title: "Season Awards Ceremony",
    excerpt:
      "The annual NEFL awards ceremony celebrates the best players, managers, and moments of the season. Full list of winners and highlights.",
    date: "2025-06-15",
    image: "/images/news/news-5.webp",
    tags: ["Awards", "Ceremony", "Winners", "Season"],
    slug: generateSlug("Season Awards Ceremony"),
  },
  {
    id: 18,
    title: "Pre-Season Training Begins",
    excerpt:
      "Teams return to training as pre-season preparations get underway. Fitness programs, tactical sessions, and team building activities planned.",
    date: "2025-06-12",
    image: "/images/news/news-6.webp",
    tags: ["Pre-Season", "Training", "Fitness"],
    slug: generateSlug("Pre-Season Training Begins"),
  },
  {
    id: 19,
    title: "International Break Roundup",
    excerpt:
      "How NEFL players performed during the international break. Goals, assists, and standout performances from around the world.",
    date: "2025-06-10",
    image: "/images/news/news-1.webp",
    tags: ["International", "Break", "Performance"],
    slug: generateSlug("International Break Roundup"),
  },
  {
    id: 20,
    title: "Coaching Development Program",
    excerpt:
      "New coaching development program launched to improve standards across all levels. UEFA qualified instructors lead the initiative.",
    date: "2025-06-08",
    image: "/images/news/news-2.webp",
    tags: ["Coaching", "Development", "UEFA", "Standards"],
    slug: generateSlug("Coaching Development Program"),
  },
]