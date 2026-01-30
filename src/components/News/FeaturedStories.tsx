import { newsPosts } from "@/data/newsPosts"
import Link from "next/link"
import Image from "next/image"
import { assetUrl } from "@/utils/assetUrl"

export default function FeaturedStories() {
  const featuredPosts = newsPosts.filter(post => post.isFeatured)

  return (
    <div className="featured-stories">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--md-on-surface)] px-2 sm:px-0">Featured Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {featuredPosts.map((post) => (
          <FeaturedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

type Props = {
  post: typeof newsPosts[0]
}

function FeaturedCard({ post }: Props) {
  return (
    <Link href={`/news/${post.slug}`} className="block group">
      <article className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
          <Image
            src={assetUrl(post.image)}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-base sm:text-lg font-semibold group-hover:text-[var(--md-primary)] transition-colors text-[var(--md-on-surface)] line-clamp-2">{post.title}</h2>
          <p className="text-sm text-[var(--md-on-surface-variant)] line-clamp-2">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 sm:px-3 py-1 bg-[var(--md-surface-container-low)] text-[var(--md-on-surface-variant)] text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--md-on-surface-variant)] mt-2">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </article>
    </Link>
  )
}
