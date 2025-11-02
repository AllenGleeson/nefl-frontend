"use client"

import { useState } from "react"
import StoreHeader from "./StoreHeader"
import StoreFilter from "./StoreFilter"
import { products } from "@/data/products"
import ProductGrid from "./ProductGrid"

export default function StoreIndex() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div>
      <StoreHeader
        setSearch={setQuery}
        setCategory={setCategory}
        categories={categories}
        showSearch={true}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <StoreFilter
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
        </div>
        <div className="flex-1">
          <ProductGrid products={products} search={query} category={category} sortBy={sortBy} />
        </div>
      </div>
    </div>
  )
}