import { notFound } from 'next/navigation'
import { getAllNewsPosts, getNewsBySlug } from '@/utils/news'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import RelatedArticles from '@/components/News/NewsPost/RelatedArticles'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for all news slugs
export async function generateStaticParams() {
  const allPosts = getAllNewsPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function NewsArticlePage({ params }: PageProps) {
  const newsPost = getNewsBySlug(params.slug)

  if (!newsPost) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          href="/news" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {newsPost.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(newsPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {newsPost.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={newsPost.image}
            alt={newsPost.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {/* Excerpt */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              {newsPost.excerpt}
            </p>
          </div>


          {/* Main Article Content - This would be expanded in a real app */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              This is where the full article content would go. In a real application, 
              you would store the full article content in your database and display it here.
              For now, this is a placeholder to show the structure of the news article page.
            </p>
            
            <p>
              The article would include detailed information about the topic, quotes from 
              relevant people, statistics, and any other relevant content that provides 
              value to the reader.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Key Points
            </h2>
            
            <ul className="list-disc list-inside space-y-2">
              <li>Detailed analysis of the topic</li>
              <li>Expert opinions and quotes</li>
              <li>Statistical information and data</li>
              <li>Future implications and next steps</li>
            </ul>

            <p>
              This template provides a solid foundation for displaying news articles 
              with proper SEO structure, responsive design, and good user experience.
            </p>
          </div>
        </article>

        {/* Related Articles Section */}
        <RelatedArticles currentPostId={newsPost.id} limit={3} />
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const newsPost = getNewsBySlug(params.slug)

  if (!newsPost) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${newsPost.title} | NEFL News`,
    description: newsPost.excerpt,
    openGraph: {
      title: newsPost.title,
      description: newsPost.excerpt,
      images: [newsPost.image],
      type: 'article',
      publishedTime: newsPost.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: newsPost.title,
      description: newsPost.excerpt,
      images: [newsPost.image],
    },
  }
}
