"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { dummyProducts } from "@/data/dummyProductsDisplay";
import { assetUrl } from "@/utils/assetUrl";

export default function StoreHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0); // For desktop: slide index

  // Use dummy products directly
  const highlights = dummyProducts;

  // Desktop: 5 products per slide
  const productsPerSlide = 5;
  const totalSlides = Math.ceil(highlights.length / productsPerSlide);

  // Manual navigation only - no auto-advance

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Get products for current slide (desktop)
  const getCurrentSlideProducts = () => {
    const startIndex = currentIndex * productsPerSlide;
    return highlights.slice(startIndex, startIndex + productsPerSlide);
  };


  if (highlights.length === 0) return null;

  return (
    <section className="relative w-full max-w-full sm:max-w-[calc(100vw-2rem)] mx-auto mt-3 mb-3 sm:mt-6 sm:mb-6 px-2 sm:px-8 md:px-16 lg:px-32">
      <div className="overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 flex flex-row justify-between items-center gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--md-on-surface)]">
            NEFL Store
          </h2>
          <a 
            href="/store"
            className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 flex items-center gap-1 text-sm sm:text-base"
          >
            VIEW STORE
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Mobile: Horizontal scrollable gallery (one product at a time) */}
          <div className="block sm:hidden">
            <div 
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4 gap-3"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {highlights.map((product, index) => (
                <div 
                  key={`mobile-${product.id}-${index}`}
                  className="flex-shrink-0 w-[85%] snap-center"
                >
                  <Link 
                    href={`/store/product/${product.slug}`}
                    className="block group hover:opacity-80 transition-opacity duration-200"
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-80 overflow-hidden">
                      <Image
                        src={assetUrl(product.img)}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-[var(--md-on-surface)] mb-2 text-base group-hover:text-[var(--md-primary)] transition-colors line-clamp-2 text-left">
                        {product.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 5 products per row */}
          <div className="hidden sm:block">
            <div className="flex h-full items-center px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-row justify-between w-full gap-2">
                {getCurrentSlideProducts().map((product, index) => (
                  <Link 
                    key={`desktop-${product.id}-${index}`}
                    href={`/store/product/${product.slug}`}
                    className="block group flex-1 hover:opacity-80 transition-opacity duration-200"
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                      <Image
                        src={assetUrl(product.img)}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-[var(--md-on-surface)] mb-2 text-sm group-hover:text-[var(--md-primary)] transition-colors line-clamp-2 text-left">
                        {product.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="flex justify-end gap-2 px-4 sm:px-6 md:px-8 py-4">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full transition-colors duration-200 ${
                  currentIndex === 0
                    ? "bg-gray-100 cursor-default"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                <svg className={`w-5 h-5 transition-colors duration-200 ${
                  currentIndex === 0 ? "text-gray-400" : "text-gray-700"
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === totalSlides - 1}
                className={`p-3 rounded-full transition-colors duration-200 ${
                  currentIndex === totalSlides - 1
                    ? "bg-gray-100 cursor-default"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                <svg className={`w-5 h-5 transition-colors duration-200 ${
                  currentIndex === totalSlides - 1 ? "text-gray-400" : "text-gray-700"
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
