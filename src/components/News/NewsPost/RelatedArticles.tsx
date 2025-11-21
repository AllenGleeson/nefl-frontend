import Link from 'next/link'
import Image from 'next/image'
import { getRelatedNewsPosts } from '@/utils/news'

type Props = {
  currentPostId: number
  limit?: number
}

export default function RelatedArticles({ currentPostId, limit = 3 }: Props) {
  const relatedPosts = getRelatedNewsPosts(currentPostId, limit)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            href={`/news/${relatedPost.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(relatedPost.date).toLocaleDateString()}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
