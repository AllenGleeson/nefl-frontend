"use client"
import { useState } from "react"
import Image from "next/image"

const timelineData = [
    {
        decade: "1980-1989",
        leftImage: "/images/news/news-1.jpg",
        rightImage: "/images/news/news-2.jpg",
        title: "The First Decade 1980 – 1990",
        text: `Some 40 years ago, the North East Football League began as the Mid-Meath League with eight teams in 1980...`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
    {
        decade: "1990-1999",
        leftImage: "/images/news/news-1.jpg",
        rightImage: "/images/news/news-2.jpg",
        title: "Time of growth and a place to call home",
        text: `Thornes Lounge in Kilmessan was the venue for weekly committee meetings...`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
    // add more decades here...
]

export default function Timeline() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="w-full max-w-6xl mx-auto my-6 sm:my-8 lg:my-12 px-2 sm:px-4 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-[var(--md-outline-variant)] mb-4 sm:mb-6 lg:mb-8">
                {timelineData.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold transition-colors ${
                            index === activeIndex
                                ? "border-b-2 border-[var(--md-primary)] text-[var(--md-primary)]"
                                : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-primary)]"
                        }`}
                    >
                        {item.decade}
                    </button>
                ))}
            </div>
            {/* Active Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
                {/* Left Image */}
                <div className="flex justify-center order-1 lg:order-1">
                    <Image
                        src={timelineData[activeIndex].leftImage}
                        alt={timelineData[activeIndex].decade}
                        width={400}
                        height={300}
                        className="shadow-lg object-cover w-full max-w-sm sm:max-w-md lg:max-w-none"
                    />
                </div>
                {/* Text */}
                <div className="order-2 lg:order-2">
                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4 text-center lg:text-left text-[var(--md-on-surface)]">
                        {timelineData[activeIndex].title}
                    </h3>
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base text-center lg:text-left text-[var(--md-on-surface-variant)] leading-relaxed">{timelineData[activeIndex].text}</p>
                    <div className="text-center lg:text-left">
                        <a
                            href={timelineData[activeIndex].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 hover:underline text-sm sm:text-base transition-colors"
                        >
                            Read the Full History →
                        </a>
                    </div>
                </div>
                {/* Right Image */}
                <div className="flex justify-center order-3 lg:order-3">
                    <Image
                        src={timelineData[activeIndex].rightImage}
                        alt={timelineData[activeIndex].decade}
                        width={400}
                        height={300}
                        className="shadow-lg object-cover w-full max-w-sm sm:max-w-md lg:max-w-none"
                    />
                </div>
            </div>
        </section>
    )
}