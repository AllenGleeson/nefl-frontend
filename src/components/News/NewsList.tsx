import { newsPosts } from "@/data/newsPosts"
import NewsCard from "./NewsCard"

export default function NewsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsPosts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  )
}