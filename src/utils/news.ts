import { newsPosts, NewsPost } from '@/data/newsPosts'

/**
 * Find a news post by its slug
 * @param slug - The slug to search for
 * @returns The news post or undefined if not found
 */
export function getNewsBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug)
}

/**
 * Get all news posts
 * @returns Array of all news posts
 */
export function getAllNewsPosts(): NewsPost[] {
  return newsPosts
}

/**
 * Get featured news posts only
 * @returns Array of featured news posts
 */
export function getFeaturedNewsPosts(): NewsPost[] {
  return newsPosts.filter(post => post.isFeatured)
}

/**
 * Get non-featured news posts only
 * @returns Array of non-featured news posts
 */
export function getRegularNewsPosts(): NewsPost[] {
  return newsPosts.filter(post => !post.isFeatured)
}

/**
 * Get news posts by tag
 * @param tag - The tag to filter by
 * @returns Array of news posts with the specified tag
 */
export function getNewsPostsByTag(tag: string): NewsPost[] {
  return newsPosts.filter(post => post.tags.includes(tag))
}

/**
 * Get related news posts (excluding the current post)
 * @param currentPostId - The ID of the current post to exclude
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related news posts
 */
export function getRelatedNewsPosts(currentPostId: number, limit: number = 3): NewsPost[] {
  return newsPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit)
}

/**
 * Get all unique tags from news posts
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const allTags = newsPosts.flatMap(post => post.tags)
  return [...new Set(allTags)].sort()
}

/**
 * Search news posts by title or excerpt
 * @param query - The search query
 * @returns Array of matching news posts
 */
export function searchNewsPosts(query: string): NewsPost[] {
  const lowercaseQuery = query.toLowerCase()
  return newsPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery)
  )
}

