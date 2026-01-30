import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { products } from "@/data/products"
import StoreHeader from "@/components/Store/StoreHeader"
import Product from "@/components/Product"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="product-page">
      <StoreHeader showSearch={false} />
      <div className="w-full px-2 sm:px-6 mt-12 sm:mt-0">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/store"
            className="inline-flex items-center gap-1 mb-0 md:mb-6 text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 text-sm sm:text-base"
          >
          <ChevronLeft className="w-4 h-4" />
          BACK TO STORE
          </Link>
        </div>
        <Product product={product} products={products} />
      </div>
    </div>
  )
}