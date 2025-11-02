import { NewsPost } from "@/data/newsPosts"
import Badge from "./Badge"
import Link from "next/link"

type Props = {
  post: NewsPost
  viewMode?: 'grid' | 'list'
}

export default function NewsCard({ post, viewMode = 'grid' }: Props) {
  if (viewMode === 'list') {
    return (
      <Link href={`/news/${post.slug}`} className="block group">
        <article className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col sm:flex-row h-auto sm:h-56">
            <div className="relative w-full sm:w-56 h-56 sm:h-full flex-shrink-0 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-6 flex-1 flex flex-col sm:flex-col justify-between">
              <div className="space-y-2 sm:space-y-3 flex-1">
                <div className="flex flex-row sm:flex-col items-start sm:items-start justify-between sm:justify-start gap-2 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 text-[var(--md-on-surface)] flex-1">{post.title}</h2>
                  <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] font-medium whitespace-nowrap sm:hidden">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)] leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Badge key={i}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] mt-2 font-medium hidden sm:block">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Grid view (default)
  return (
    <Link href={`/news/${post.slug}`} className="block group">
      <article className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between sm:min-h-[200px]">
          <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col sm:justify-between">
            <div className="w-full">
              <div className="flex flex-row sm:flex-col items-start sm:items-start justify-between sm:justify-start gap-2 sm:gap-0 mb-2 sm:mb-3">
                <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight line-clamp-2 text-[var(--md-on-surface)] flex-1">{post.title}</h2>
                <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] font-medium whitespace-nowrap sm:hidden">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)] leading-relaxed line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
              ))}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] mt-3 sm:mt-4 font-medium hidden sm:block">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </article>
    </Link>
  )
}