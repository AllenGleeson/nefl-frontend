import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function NewsSection() {
  // Sample news data - in a real app, this would come from props or API
  const news = [
    {
      id: 1,
      title: "Team A Secures Championship with Stunning Victory",
      excerpt: "In a thrilling match that went down to the wire, Team A clinched the championship title with a dramatic last-minute goal that sent fans into a frenzy.",
      date: "March 10, 2024",
      category: "Match Report",
      image: "/images/news/news-1.jpg"
    },
    {
      id: 2,
      title: "New Stadium Construction Begins",
      excerpt: "The league announces the start of construction for a new state-of-the-art stadium that will seat 25,000 fans and feature modern amenities.",
      date: "March 8, 2024",
      category: "Announcement",
      image: "/images/news/news-2.jpg"
    },
    {
      id: 3,
      title: "Player of the Month: John Smith",
      excerpt: "Team B's star striker John Smith has been named Player of the Month for his outstanding performances and crucial goals throughout February.",
      date: "March 5, 2024",
      category: "Awards",
      image: "/images/news/news-3.jpg"
    },
    {
      id: 4,
      title: "Youth Academy Launches New Training Program",
      excerpt: "The league's youth academy introduces an innovative training program focused on developing technical skills and tactical awareness for young players.",
      date: "March 3, 2024",
      category: "Development",
      image: "/images/news/news-4.jpg"
    },
    {
      id: 5,
      title: "Referee Training Workshop Scheduled",
      excerpt: "A comprehensive referee training workshop will be held next month to ensure consistent officiating standards across all league matches.",
      date: "March 1, 2024",
      category: "Training",
      image: "/images/news/news-5.jpg"
    },
    {
      id: 6,
      title: "Community Outreach Program Expands",
      excerpt: "The league's community outreach program expands to include more schools and local clubs, promoting football at the grassroots level.",
      date: "February 28, 2024",
      category: "Community",
      image: "/images/news/news-6.jpg"
    },
    {
      id: 7,
      title: "Transfer Window Closes with Key Signings",
      excerpt: "The winter transfer window closes with several key signings that are expected to strengthen teams for the second half of the season.",
      date: "February 25, 2024",
      category: "Transfers",
      image: "/images/news/news-1.jpg"
    }
  ];

  // Get featured story (most recent) and other stories
  const featuredStory = news[0];
  const otherStories = news.slice(1);

  return (
    <section className="news-section py-8 sm:py-10 md:py-12 bg-[var(--md-surface-variant)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">Latest News</h2>
          <a 
            href="/news"
            className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 flex items-center gap-1"
          >
            GO TO NEWS
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Featured Story - Left Side */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Link href={`/news/${featuredStory.id}`} className="block overflow-hidden cursor-pointer">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                  <span className="text-xs sm:text-sm text-[var(--md-primary)] font-medium">{featuredStory.category}</span>
                  <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{featuredStory.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 line-clamp-3 text-[var(--md-on-surface)]">{featuredStory.title}</h3>
                <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)] line-clamp-3 sm:line-clamp-4">{featuredStory.excerpt}</p>
              </div>
            </Link>
          </div>

          {/* Other Stories - Right Side */}
          <div className="space-y-3 sm:space-y-4">
            {otherStories.map((article, index) => (
              <article key={article.id} className={`overflow-hidden cursor-pointer ${index >= 3 ? 'hidden lg:block' : ''}`}>
                <div className="flex gap-3 sm:gap-4">
                  {/* Image on the left */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content on the right */}
                  <div className="flex-1 p-2 sm:p-4 md:p-5 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 line-clamp-2 text-[var(--md-on-surface)]">{article.title}</h3>
                      <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{article.excerpt}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                      <span className="text-xs text-[var(--md-primary)] font-medium">{article.category}</span>
                      <span className="text-xs text-[var(--md-on-surface-variant)]">{article.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

