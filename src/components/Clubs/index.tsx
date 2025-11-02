"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { clubs } from "@/data/club";
import ClubsHeader from "./ClubsHeader";
import ClubsCard from "./ClubsCard";

export default function Clubs() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedClubSlug, setSelectedClubSlug] = useState<string | null>(null)
  const [showLargeImage, setShowLargeImage] = useState(false)
  const clubsPerPage = 12
  const showPaginationThreshold = clubsPerPage

  // Filter clubs based on search query
  const filteredClubs = useMemo(() => {
    if (!searchQuery.trim()) {
      return clubs
    }
    const query = searchQuery.toLowerCase()
    return clubs.filter(club => 
      club.name.toLowerCase().includes(query) ||
      club.leagues.some(league => league.toLowerCase().includes(query)) ||
      club.bio.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Pagination logic
  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage)
  const startIndex = (currentPage - 1) * clubsPerPage
  const endIndex = startIndex + clubsPerPage
  const currentClubs = filteredClubs.slice(startIndex, endIndex)

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

  const handleCardClick = (slug: string) => {
    setSelectedClubSlug(slug)
    setShowLargeImage(false)
    // Show large image after a brief delay to allow cards to disappear
    setTimeout(() => {
      setShowLargeImage(true)
    }, 50)
    // Navigate after animation completes
    setTimeout(() => {
      router.push(`/clubs/${slug}`)
    }, 2500) // Match animation duration (2000ms fade in + buffer)
  }

  return (
    <div 
      className="clubs-page relative min-h-screen bg-fixed"
      style={{
        backgroundImage: 'url(/images/clubspage.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backgroundBlendMode: 'multiply',
      }}
    >
      
      {/* Content */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <ClubsHeader setSearch={setSearchQuery} showSearch={true} />
        
        {filteredClubs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-lg">No clubs found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="relative min-h-[600px]">
              {/* All cards - disappear immediately when one is selected */}
              <div className={`grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4 ${
                selectedClubSlug ? 'opacity-0 pointer-events-none' : ''
              }`}>
                {currentClubs.map((club) => (
                  <ClubsCard 
                    key={club.slug} 
                    club={club} 
                    isSelected={false}
                    onCardClick={handleCardClick}
                    shouldHide={false}
                  />
                ))}
              </div>

              {/* Large expanded image */}
              {selectedClubSlug && (
                <div className={`absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-2000 ${
                  showLargeImage ? 'opacity-100' : 'opacity-0'
                }`}>
                  {(() => {
                    const selectedClub = currentClubs.find(club => club.slug === selectedClubSlug)
                    if (!selectedClub) return null
                    return (
                      <div className="w-full h-full flex items-center justify-center p-12">
                        <Image
                          src={selectedClub.logo}
                          alt={selectedClub.name}
                          width={800}
                          height={800}
                          className="w-full h-full max-w-full max-h-full object-contain"
                        />
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredClubs.length > showPaginationThreshold && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        page === currentPage
                          ? 'text-gray-900 bg-white border border-white'
                          : 'text-white bg-white/10 border border-white/30 hover:bg-white/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}