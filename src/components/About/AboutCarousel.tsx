"use client"
import { useState } from "react"

export default function AboutCarousel() {
    const images = [
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987-1170x650.jpg",
            alt: "Presentation to Cathal 1987",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980-1097x650.jpg",
            alt: "1980",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Shambo-87-1170x650.jpg",
            alt: "Shambo 87",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1-1170x650.jpg",
            alt: "1990 -1",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/dunderry-panle-90s-1170x650.jpg",
            alt: "Dunderry Panel 90s",
        },
    ]

    const [current, setCurrent] = useState(0)

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1)
    }

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1)
    }

    return (
        <section className="relative w-full max-w-4xl mx-auto my-6 sm:my-8 lg:my-12 px-2 sm:px-4 lg:px-8">
            {/* Images */}
            <div className="overflow-hidden shadow-lg">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            alt={img.alt}
                            className="w-full flex-shrink-0 h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                        />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-[var(--md-surface-container)]/90 hover:bg-[var(--md-surface-container)] text-[var(--md-on-surface)] rounded-full p-2 sm:p-2.5 shadow-lg transition-all duration-200"
                aria-label="Previous slide"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-[var(--md-surface-container)]/90 hover:bg-[var(--md-surface-container)] text-[var(--md-on-surface)] rounded-full p-2 sm:p-2.5 shadow-lg transition-all duration-200"
                aria-label="Next slide"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-3 sm:mt-4 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${current === index 
                            ? "bg-[var(--md-primary)]" 
                            : "bg-[var(--md-outline-variant)]"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}