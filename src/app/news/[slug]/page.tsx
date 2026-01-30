import { notFound } from 'next/navigation'
import { getAllNewsPosts, getNewsBySlug } from '@/utils/news'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import RelatedArticles from '@/components/News/NewsPost/RelatedArticles'
import { assetUrl } from '@/utils/assetUrl'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all news slugs
export async function generateStaticParams() {
  const allPosts = getAllNewsPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const newsPost = getNewsBySlug(slug)

  if (!newsPost) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Navigation */}
        <Link 
          href="/news" 
          className="inline-flex items-center text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--md-on-surface)] mb-6 leading-tight tracking-tight">
            {newsPost.title.replace(/^\*WATCH\*\s*/i, '').replace(/^\*/g, '').replace(/\*/g, '')}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[var(--md-on-surface-variant)] mb-6 pb-6 border-b border-[var(--md-outline-variant)]">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-[var(--md-primary)]" />
              <time dateTime={newsPost.date}>
              {new Date(newsPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              </time>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {newsPost.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] border border-[var(--md-primary-container)] hover:bg-[var(--md-primary-fixed-dim)] transition-colors"
              >
                <Tag className="w-3 h-3 mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10">
          <div className="relative w-full aspect-video overflow-hidden shadow-xl">
          <Image
            src={assetUrl(newsPost.image)}
            alt={newsPost.title}
            width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
          />
          </div>
          <p className="text-xs text-[var(--md-on-surface-variant)] mt-2 italic">
            Photo credit: NEFL Official
          </p>
        </div>

        {/* Article Content */}
        <article className="max-w-none">
          {/* Excerpt */}
          <div className="bg-gradient-to-r from-[var(--md-primary-container)] to-[var(--md-primary-fixed)] border-l-4 border-[var(--md-primary)] p-6 mb-8">
            <p className="text-lg text-[var(--md-on-primary-container)] font-semibold leading-relaxed italic">
              {newsPost.excerpt}
            </p>
          </div>

          {/* Main Article Content */}
          <div className="space-y-6 text-[var(--md-on-surface)] leading-relaxed">
            {/* Opening paragraph - typically the most important info */}
            <p className="text-lg font-medium text-[var(--md-on-surface)] leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-[var(--md-primary)] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {newsPost.title.includes('WATCH') 
                ? `In what proved to be an electrifying encounter, ${newsPost.excerpt.split(' from ')[1]?.split(' game')[0] || 'the match'} delivered exactly what fans had hoped for. The intensity was palpable from the opening whistle, with both sides showing their intent to take control of the game.`
                : newsPost.title.includes('Fixtures')
                ? `The NEFL has released the latest batch of confirmed fixtures for the upcoming matchweek, bringing excitement and anticipation for clubs and supporters alike. ${newsPost.excerpt}`
                : newsPost.title.includes('Preview')
                ? `As anticipation builds ahead of what promises to be a thrilling encounter, ${newsPost.excerpt} Both teams have been preparing meticulously, and the stage is set for what could be one of the matches of the season.`
                : newsPost.title.includes('Transfer')
                ? `The transfer window has once again proven to be a period of significant activity across the NEFL, with clubs making strategic moves to strengthen their squads. ${newsPost.excerpt}`
                : `In a development that has captured the attention of the NEFL community, ${newsPost.excerpt.toLowerCase()} This story continues to unfold as more details emerge from various sources close to the matter.`
              }
            </p>

            {/* Body paragraphs */}
            <p className="text-base leading-7 text-[var(--md-on-surface)]">
              {newsPost.title.includes('WATCH')
                ? `The match showcased exceptional skill and determination from both teams, with moments of brilliance that kept spectators on the edge of their seats throughout the contest. Tactical battles unfolded across the pitch, with managers making crucial decisions that would ultimately shape the outcome. The commitment shown by every player was evident, reflecting the competitive nature of the league.`
                : newsPost.title.includes('Fixtures')
                ? `Clubs across all divisions will be looking to capitalize on these upcoming opportunities, with crucial points at stake in the race for league positions and cup progression. The fixture list has been carefully balanced to ensure fairness and competitive balance throughout the season. Supporters are already making plans to attend what promise to be exciting contests.`
                : newsPost.title.includes('Preview')
                ? `Team preparations have been intensive, with both sides analyzing their opponents' recent performances and tactical approaches. Injury updates, player availability, and potential lineup changes are all factors that could influence the final result. The tactical chess match between the coaching staffs will be fascinating to observe.`
                : newsPost.title.includes('Transfer')
                ? `This transfer activity reflects the ambition of clubs looking to strengthen their positions, whether they're challenging for titles, fighting relegation, or building for the future. The investments made during this window demonstrate the competitive nature of the league and the commitment of club owners to success.`
                : `The implications of this development are far-reaching, affecting not just the immediate participants but potentially shaping the landscape of the league in the weeks and months ahead. Stakeholders are closely monitoring the situation, with many eager to see how events will unfold and what the long-term impact might be.`
              }
            </p>

            {/* Quote block */}
            <blockquote className="border-l-4 border-[var(--md-primary)] pl-6 py-4 my-8 bg-[var(--md-surface-container-low)] italic text-[var(--md-on-surface)]">
              <p className="text-lg mb-2">
                &ldquo;{newsPost.title.includes('WATCH')
                  ? 'The quality of football on display today was exceptional. Both teams played their part in what was a truly entertaining match.'
                  : newsPost.title.includes('Fixtures')
                  ? 'These fixtures represent crucial opportunities for every club. Every point matters at this stage of the season.'
                  : newsPost.title.includes('Preview')
                  ? 'We expect a closely contested match. Both teams have quality players who can make the difference.'
                  : 'This development shows the continued growth and professionalism within the NEFL. We\'re building something special here.'
                }&rdquo;
              </p>
              <footer className="text-sm text-[var(--md-on-surface-variant)] mt-2 not-italic">
                — NEFL Official Spokesperson
              </footer>
            </blockquote>

            {/* Additional paragraphs */}
            <p className="text-base leading-7 text-[var(--md-on-surface)]">
              {newsPost.title.includes('WATCH')
                ? `For those who missed the live action, the extended highlights package captures all the key moments, including stunning goals, crucial saves, and game-changing tackles. The video coverage provides multiple angles and expert commentary, offering viewers an in-depth look at how the match unfolded. This level of coverage has become a hallmark of NEFL.TV's commitment to bringing fans closer to the action.`
                : newsPost.title.includes('Fixtures')
                ? `Fixture scheduling takes into account various factors including travel distances, player welfare, and broadcast requirements. The league works closely with clubs to ensure that the schedule is as fair and balanced as possible. Any postponements or rescheduled matches are communicated promptly to ensure fans can plan accordingly.`
                : newsPost.title.includes('Preview')
                ? `Historical encounters between these sides have often produced memorable moments, and there's every reason to believe this latest meeting could add another chapter to their storied rivalry. Form guides, head-to-head records, and current league positions all add layers of intrigue to what is shaping up to be a compelling contest.`
                : newsPost.title.includes('Transfer')
                ? `The financial aspects of these moves are significant, with clubs investing substantial resources to secure their targets. These investments reflect confidence in the league's future and demonstrate the economic vitality of football at this level. Long-term planning and strategic thinking are evident in many of these decisions.`
                : `Community engagement and fan support continue to be fundamental to the league's success. The passion shown by supporters across all divisions helps drive the sport forward and creates an atmosphere that makes the NEFL a special place to play and watch football.`
              }
            </p>

            {/* Subheading and details */}
            <h2 className="text-2xl font-bold text-[var(--md-on-surface)] mt-10 mb-4 pt-6 border-t border-[var(--md-outline-variant)]">
              {newsPost.title.includes('WATCH') 
                ? 'Match Analysis'
                : newsPost.title.includes('Fixtures')
                ? 'What to Expect'
                : newsPost.title.includes('Preview')
                ? 'Key Factors'
                : 'Looking Ahead'
              }
            </h2>
            
            <p className="text-base leading-7 text-[var(--md-on-surface)]">
              {newsPost.title.includes('WATCH')
                ? `Detailed analysis reveals the tactical nuances that shaped this encounter. Set pieces, counter-attacking play, and defensive organization all played crucial roles. The individual performances of key players were instrumental, with standout contributions that deserve recognition. The refereeing decisions and their impact on the flow of the game also warrant discussion, as they contributed to the overall narrative of the match.`
                : newsPost.title.includes('Fixtures')
                ? `These upcoming matches will test teams in different ways, from handling pressure situations to adapting to various tactical approaches from opponents. For supporters, it's an opportunity to see their teams in action and play their part in creating the vibrant atmosphere that makes NEFL matches special. The stakes remain high across all competitions.`
                : newsPost.title.includes('Preview')
                ? `Weather conditions, pitch quality, and home advantage could all factor into the outcome. The psychological aspect of the match shouldn't be underestimated either, with confidence levels, recent results, and team morale all potentially influencing performances. The manager's team selection and in-game tactical adjustments will be crucial.`
                : newsPost.title.includes('Transfer')
                ? `Fans will be eager to see how new signings integrate into their respective squads and what impact they can make on the pitch. The bedding-in period for new players is always interesting to observe, as they adapt to new teammates, tactics, and the overall culture of their new clubs. Success in the transfer market often translates to success on the field.`
                : `As we move forward, the focus remains on maintaining the high standards that have been established while continuing to innovate and improve. The dedication of everyone involved - from players and coaches to administrators and volunteers - ensures that the NEFL remains at the forefront of grassroots football development.`
              }
            </p>

            {/* Closing paragraph */}
            <p className="text-base leading-7 text-[var(--md-on-surface)] pt-4">
              {newsPost.title.includes('WATCH')
                ? `The full match highlights are now available on NEFL.TV, where subscribers can relive all the action from multiple camera angles with expert analysis. This comprehensive coverage ensures that no one misses out on the excitement and drama that unfolded throughout the ninety minutes of play.`
                : newsPost.title.includes('Fixtures')
                ? `Further updates and any changes to the fixture schedule will be communicated through official NEFL channels. Clubs are reminded to keep their supporters informed through their own communication channels as well.`
                : newsPost.title.includes('Preview')
                ? `As kickoff approaches, anticipation continues to build. Both sets of supporters will be hoping for a performance that does justice to the occasion and provides entertainment worthy of this level of competition.`
                : newsPost.title.includes('Transfer')
                ? `The transfer window's impact will be measured over the coming months, but early signs suggest that clubs have made astute investments that could prove crucial in achieving their season's objectives.`
                : `Stay tuned to NEFL official channels for the latest updates on this developing story and all other league news.`
              }
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
  const { slug } = await params;
  const newsPost = getNewsBySlug(slug)

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
      images: [assetUrl(newsPost.image)],
      type: 'article',
      publishedTime: newsPost.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: newsPost.title,
      description: newsPost.excerpt,
      images: [assetUrl(newsPost.image)],
    },
  }
}
