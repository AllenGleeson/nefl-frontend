import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { newsPosts } from "@/data/newsPosts"
import { assetUrl } from "@/utils/assetUrl"

export default function NewsSection() {
  // Get the first 7 news posts
  const news = newsPosts.slice(0, 7);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Early return if no news posts
  if (news.length === 0) {
    return null;
  }

  // Get featured story (most recent) and other stories
  const featuredStory = news[0];
  const otherStories = news.slice(1);

  return (
    <section className="news-section py-8 sm:py-10 md:py-12 bg-[var(--md-surface-variant)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">Latest News</h2>
          <Link 
            href="/news"
            className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 flex items-center gap-1"
          >
            GO TO NEWS
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Featured Story - Left Side */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Link href={`/news/${featuredStory.slug}`} className="block overflow-hidden cursor-pointer">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                <Image
                  src={assetUrl(featuredStory.image)}
                  alt={featuredStory.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                  <span className="text-xs sm:text-sm text-[var(--md-primary)] font-medium">{featuredStory.tags[0] || 'News'}</span>
                  <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{formatDate(featuredStory.date)}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 line-clamp-3 text-[var(--md-on-surface)]">{featuredStory.title.replace(/^\*WATCH\*\s*/i, '').replace(/^\*/g, '').replace(/\*/g, '')}</h3>
                <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)] line-clamp-3 sm:line-clamp-4">{featuredStory.excerpt}</p>
              </div>
            </Link>
          </div>

          {/* Other Stories - Right Side */}
          <div className="space-y-3 sm:space-y-4">
            {otherStories.map((article, index) => (
              <Link key={article.id} href={`/news/${article.slug}`} className={`block overflow-hidden cursor-pointer ${index >= 3 ? 'hidden lg:block' : ''}`}>
                <article className="flex gap-3 sm:gap-4">
                  {/* Image on the left */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={assetUrl(article.image)}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content on the right */}
                  <div className="flex-1 p-2 sm:p-4 md:p-5 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 line-clamp-2 text-[var(--md-on-surface)]">{article.title.replace(/^\*WATCH\*\s*/i, '').replace(/^\*/g, '').replace(/\*/g, '')}</h3>
                      <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{article.excerpt}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                      <span className="text-xs text-[var(--md-primary)] font-medium">{article.tags[0] || 'News'}</span>
                      <span className="text-xs text-[var(--md-on-surface-variant)]">{formatDate(article.date)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

