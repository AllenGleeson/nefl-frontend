"use client"

import { useState, useMemo } from "react"
import NewsListWithPagination from "./NewsListWithPagination"
import NewsHeader from "./NewsHeader"
import StoreHighlights from "../Home/StoreHighlights"
import { newsPosts } from "@/data/newsPosts"
import HeroCarousel from "../Home/HeroCarousel"

export default function NewsIndex() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [dateRange, setDateRange] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState("newest")

  // Extract unique categories from news posts
  const categories = useMemo(() => {
    const allTags = newsPosts.flatMap(post => post.tags)
    return Array.from(new Set(allTags)).sort()
  }, [])

  return (
    <div className="news-page">
      <NewsHeader 
        setSearch={setSearchQuery}
        setCategory={setCategory}
        setDateRange={setDateRange}
        setViewMode={setViewMode}
        setSortBy={setSortBy}
        showSearch={true}
        categories={categories}
      />
      <div className="w-full sm:container sm:mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 bg-[var(--md-surface)]">
        <NewsListWithPagination 
          search={searchQuery}
          category={category}
          dateRange={dateRange}
          sortBy={sortBy}
          viewMode={viewMode}
        />
      </div>
      <HeroCarousel />
      <StoreHighlights />
    </div>
  );
}