'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { useCatalog } from '@/components/CatalogProvider'
import { ProductCard } from '@/components/ProductCard'
import { parsePrice } from '@/lib/catalog-utils'

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest']
const collectionOptions = [
  { label: 'All Products', value: 'all' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Best Sellers', value: 'bestseller' },
  { label: 'Limited Edition', value: 'limited' },
] as const

type CollectionFilter = (typeof collectionOptions)[number]['value']

function FilterDropdown({
  title,
  value,
  children,
}: {
  title: string
  value: string
  children: ReactNode
}) {
  return (
    <details className="productsFilterDropdown">
      <summary className="productsFilterDropdownSummary">
        <span className="productsFilterDropdownTitle">{title}</span>
        <span className="productsFilterDropdownValue">{value}</span>
      </summary>
      <div className="productsFilterDropdownBody">{children}</div>
    </details>
  )
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { products: allProducts, categories } = useCatalog()
  const filterOptions = useMemo(
    () => ['All', ...categories.map((cat) => cat.title)],
    [categories],
  )
  const [wishlisted, setWishlisted] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [collectionFilter, setCollectionFilter] = useState<CollectionFilter>('all')
  const [sortBy, setSortBy] = useState('Featured')

  useEffect(() => {
    const categorySlug = searchParams.get('category')
    if (categorySlug) {
      const match = categories.find((c) => c.slug === categorySlug)
      if (match) setActiveFilter(match.title)
    }

    const collection = searchParams.get('collection')
    if (collection === 'new' || collection === 'bestseller' || collection === 'limited') {
      setCollectionFilter(collection)
    }
  }, [searchParams, categories])

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  const filteredProducts = useMemo(() => {
    let list = activeFilter === 'All'
      ? [...allProducts]
      : allProducts.filter((p) => p.category === activeFilter)

    if (collectionFilter === 'new') {
      list = list.filter((p) => p.isNew)
    } else if (collectionFilter === 'bestseller') {
      list = list.filter((p) => p.isBestSeller)
    } else if (collectionFilter === 'limited') {
      list = list.filter((p) => p.isLimited)
    }

    switch (sortBy) {
      case 'Price: Low to High':
        list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case 'Price: High to Low':
        list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'Top Rated':
        list = [...list].sort((a, b) => Number(b.rating) - Number(a.rating))
        break
      case 'Newest':
        list = [...list].reverse()
        break
      default:
        break
    }
    return list
  }, [activeFilter, collectionFilter, sortBy, allProducts])

  const activeCollectionLabel =
    collectionOptions.find((opt) => opt.value === collectionFilter)?.label ?? 'All Products'

  const activeCategory = categories.find((cat) => cat.title === activeFilter)
  const isCategoryView = activeFilter !== 'All'

  return (
    <>
      <FloatingNavbar activePage="products" />
      <main className="sitePage productsPage">
        <section className="section productsCatalog" id="catalog">
          <div className="container">
            <Reveal className="productsCatalogHeader">
              <h1 className="sectionTitle">
                {isCategoryView ? activeCategory?.title ?? activeFilter : 'Shop All Products'}
              </h1>
              <p className="sectionDesc">
                {isCategoryView
                  ? activeCategory?.description ?? `Browse products in ${activeFilter}.`
                  : 'Browse the full collection — filter by category, sort by price or rating, and save favorites.'}
              </p>
            </Reveal>

            <div className="productsCatalogLayout">
              <aside className="productsCatalogSidebar" aria-label="Product filters">
                <FilterDropdown title="Category" value={activeFilter}>
                  <div className="productsFilters productsFilters--sidebar">
                    {filterOptions.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={`productsFilterBtn${activeFilter === filter ? ' active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </FilterDropdown>

                <FilterDropdown title="Collection" value={activeCollectionLabel}>
                  <div className="productsFilters productsFilters--sidebar">
                    {collectionOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`productsFilterBtn${collectionFilter === option.value ? ' active' : ''}`}
                        onClick={() => setCollectionFilter(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </FilterDropdown>

                <FilterDropdown title="Sort by" value={sortBy}>
                  <div className="productsFilters productsFilters--sidebar">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`productsFilterBtn${sortBy === option ? ' active' : ''}`}
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </FilterDropdown>

                <p className="productsResultCount">{filteredProducts.length} products</p>
              </aside>

              <div className="productsCatalogMain">
                <div className="productGrid productsCatalogGrid">
                  {filteredProducts.map((product, i) => (
                    <Reveal key={product.slug} className="productsCatalogReveal" delay={(i % 3) * 0.05}>
                      <ProductCard
                        product={product}
                        wishlisted={wishlisted.includes(product.title)}
                        onToggleWishlist={() => toggleWishlist(product.title)}
                        showCategory
                        variant="showcase"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
