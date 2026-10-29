"use client"

import { useState, useMemo, useEffect } from "react"
import { newsPosts } from "@/data/newsPosts"
import NewsCard from "./NewsCard"
import { buttonStyles } from "@/components/ui/Button";
import { ANY_DATE, inDateRange, type DateRange } from "@/components/ui/DateRangePicker";

const POSTS_PER_PAGE = 6

type Props = {
  search?: string
  category?: string
  dateRange?: DateRange
  sortBy?: string
  viewMode?: 'grid' | 'list'
}

export default function NewsListWithPagination({ 
  search = "", 
  category = "All",
  dateRange = ANY_DATE,
  sortBy = "newest",
  viewMode = "grid"
}: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Filter and sort posts based on all criteria
  const filteredPosts = useMemo(() => {
    let posts = [...newsPosts]
    
    // Filter out featured posts for this list (they're shown separately in FeaturedStories)
    posts = posts.filter(post => !post.isFeatured)
    
    // Apply category filter
    if (category !== "All") {
      posts = posts.filter(post => 
        post.tags.some(tag => tag === category)
      )
    }
    
    // Apply date range filter
    posts = posts.filter(post => inDateRange(post.date, dateRange))

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    // Apply sorting
    posts.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "alphabetical":
          return a.title.localeCompare(b.title)
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
    
    return posts
  }, [search, category, dateRange, sortBy])
  
  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, dateRange, sortBy])
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="news-list-with-pagination">
      {currentPosts.length > 0 ? (
        <>
          <div className={`gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'flex flex-col space-y-3 sm:space-y-4'
          }`}>
            {currentPosts.map((post) => (
              <NewsCard key={post.id} post={post} viewMode={viewMode} />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center flex-wrap gap-2 mt-6 sm:mt-8">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={buttonStyles({variant: "outline", size: "sm"})}
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={buttonStyles({ variant: currentPage === page ? "primary" : "outline", size: "icon-sm" })}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={buttonStyles({variant: "outline", size: "sm"})}
              >
                Next
              </button>
            </div>
          )}
          
          <div className="text-center text-xs sm:text-sm text-[var(--md-on-surface-variant)] mt-3 sm:mt-4 px-2">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
          </div>
        </>
      ) : (
        <div className="text-center py-8 sm:py-16 px-4">
          <p className="text-base sm:text-lg text-[var(--md-on-surface-variant)]">No news articles found.</p>
        </div>
      )}
    </div>
  )
}

