"use client"
import { useState } from "react"
import Image from "next/image"

const timelineData = [
    {
        decade: "1980-1989",
        leftImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980.jpg",
        rightImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987.jpg",
        title: "THE FIRST DECADE 1980 – 1990",
        text: `Some 40 years ago, the North East Football League, as it is now known, was taking its first tentative steps in the form of the Mid-Meath League that kicked-off with eight teams in 1980. The build-up to that first round of action on 23rd November 1980 began around May 1980 with a crew on enthusiasts from Kilmessan who were eager to play the 'beautiful game' and they talked about entering teams in local seven-a-side tournaments during the summer months when the traditional soccer season was closed.`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
    {
        decade: "1990-1999",
        leftImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1.jpg",
        rightImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1.jpg",
        title: "Time of growth and a place to call home",
        text: `Thornes Lounge in Kilmessan was the venue for the weekly committee meetings and for the purpose of checking the weekly forecast cards each Saturday night as part of fundraising for the development of facilities at the sports complex outside Navan that is now known as the MDL. The closing years of the first decade saw the committee encounter problems obtaining planning permission for the 22-acre property that was purchased in 1988.`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
    {
        decade: "2000-2009",
        leftImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years.jpg",
        rightImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years-part-2.jpg",
        title: "Surviving emergencies and building a lasting legacy",
        text: `One highlight from the early part of the third decade was the 21st anniversary (1980 – 2001) banquet at the Headfort Arms Hotel, Kells on Friday 23rd November 2001. At that event, attended by FAI chief executive Brendan Menton, the MDL also launched a commemorative publication that covered all aspects of the first 21 years (1980 – 2001) – Not Just Another Brick In The Wall.`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
    {
        decade: "2010-2019",
        leftImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/MDL-AStro-DAy-1-scaled.jpg",
        rightImage: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Trim-Celtic-2010-2019.jpg",
        title: "Riding out the storm",
        text: `Decade number four covers 2010 – 2019 and the final piece of the jigsaw will feature an interview with Gerry Gorman who was, and remains, a driving force of the development since it started in November 1980. The fourth decade ended on a positive note in terms of affiliations with a total of 69 teams representing 48 clubs in the first calendar-year season during which the top honours went to Meath with Trim Celtic dominating. The introduction of the calendar-year season in 2019 was the first of summer soccer. The Summer of 69 perhaps!`,
        link: "https://nefl.ie/history-of-the-league-in-depth/",
    },
]

export default function Timeline() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="w-full max-w-6xl mx-auto mt-0 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap border-b-2 border-[var(--md-outline-variant)] mb-4 sm:mb-6 lg:mb-8">
                {timelineData.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold transition-all duration-200 ${
                            index === activeIndex
                                ? "border-b-2 border-[var(--md-primary)] text-[var(--md-primary)] bg-[var(--md-primary-container)]/10"
                                : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-primary)] hover:bg-[var(--md-surface-container)] border-b-2 border-transparent"
                        }`}
                    >
                        {item.decade}
                    </button>
                ))}
            </div>
            {/* Active Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {/* Left Image */}
                <div className="flex justify-center order-1 lg:order-1">
                    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/3] overflow-hidden border border-[var(--md-outline-variant)] shadow-lg">
                        <Image
                            src={timelineData[activeIndex].leftImage}
                            alt={timelineData[activeIndex].decade}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                    </div>
                </div>
                {/* Text */}
                <div className="order-2 lg:order-2 bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] p-4 sm:p-6 lg:p-8 flex flex-col aspect-[4/3] lg:aspect-auto lg:h-full">
                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4 text-center lg:text-left text-[var(--md-on-surface)]">
                        {timelineData[activeIndex].title}
                    </h3>
                    <p className="flex-1 text-sm sm:text-base text-center lg:text-left text-[var(--md-on-surface-variant)] leading-relaxed line-clamp-6 overflow-hidden">
                        {timelineData[activeIndex].text}
                    </p>
                    <div className="text-center lg:text-left mt-auto pt-3 sm:pt-4">
                        <a
                            href={timelineData[activeIndex].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 hover:underline text-sm sm:text-base font-medium transition-colors"
                        >
                            Read the Full History
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
                {/* Right Image */}
                <div className="hidden lg:flex justify-center order-3 lg:order-3">
                    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/3] overflow-hidden border border-[var(--md-outline-variant)] shadow-lg">
                        <Image
                            src={timelineData[activeIndex].rightImage}
                            alt={timelineData[activeIndex].decade}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}