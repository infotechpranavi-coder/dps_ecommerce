'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { HeroBanner, Product } from '@/lib/product-types'
import { slugify, type CategoryMeta, type StoredCatalog } from '@/lib/catalog-utils'
import { brand } from '@/lib/brand'

type Tab = 'products' | 'categories' | 'banners'

const navItems: { id: Tab; label: string; hint: string }[] = [
  { id: 'products', label: 'Products', hint: 'Manage catalogue items' },
  { id: 'categories', label: 'Categories', hint: 'Collection groups' },
  { id: 'banners', label: 'Hero Banners', hint: 'Homepage hero slides' },
]

const emptyProduct = (): Product => ({
  id: '',
  slug: '',
  title: '',
  price: '₹0',
  rating: '4.8',
  img: '',
  images: [],
  category: '',
  shortDescription: '',
  description: '',
  features: [],
  sku: '',
  reviewCount: 0,
  inStock: true,
  isNew: false,
  isBestSeller: false,
  isLimited: false,
})

const emptyCategory = (): CategoryMeta => ({
  title: '',
  slug: '',
  img: '',
  size: 'medium',
  description: '',
})

const emptyBanner = (): HeroBanner => ({
  id: '',
  image: '',
  alt: '',
  active: true,
  sortOrder: 0,
})

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('products')
  const [catalog, setCatalog] = useState<StoredCatalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [storageMode, setStorageMode] = useState<'mongodb' | 'file'>('file')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<CategoryMeta | null>(null)
  const [isNewProduct, setIsNewProduct] = useState(false)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [categoryEditSlug, setCategoryEditSlug] = useState('')
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null)
  const [isNewBanner, setIsNewBanner] = useState(false)
  const [bannerEditId, setBannerEditId] = useState('')

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    try {
      const [catalogRes, metaRes] = await Promise.all([
        fetch('/api/catalog', { cache: 'no-store' }),
        fetch('/api/catalog/meta', { cache: 'no-store' }),
      ])
      const data = (await catalogRes.json()) as StoredCatalog
      setCatalog(data)
      if (metaRes.ok) {
        const meta = (await metaRes.json()) as { storage: 'mongodb' | 'file' }
        setStorageMode(meta.storage)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCatalog()
  }, [loadCatalog])

  const categoryTitles = useMemo(
    () => catalog?.categories.map((c) => c.title) ?? [],
    [catalog],
  )

  const saveCatalog = async (next: StoredCatalog) => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/catalog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
      if (!res.ok) throw new Error('Save failed')
      setCatalog(next)
      setMessage('Saved successfully.')
      window.dispatchEvent(new CustomEvent('catalog-updated'))
    } catch {
      setMessage('Could not save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const openNewProduct = () => {
    const draft = emptyProduct()
    draft.category = categoryTitles[0] ?? ''
    setEditingProduct(draft)
    setIsNewProduct(true)
  }

  const openEditProduct = (product: Product) => {
    setEditingProduct({ ...product, images: [...(product.images ?? [product.img])] })
    setIsNewProduct(false)
  }

  const submitProduct = async () => {
    if (!catalog || !editingProduct) return
    const title = editingProduct.title.trim()
    if (!title) return

    const slug = editingProduct.slug.trim() || slugify(title)
    const id = editingProduct.id || `rx-${slug}`
    const img = editingProduct.img.trim()
    const images = editingProduct.images.filter(Boolean)
    const nextProduct: Product = {
      ...editingProduct,
      id,
      slug,
      title,
      img: img || images[0] || '',
      images: images.length ? images : img ? [img] : [],
      features: editingProduct.features.filter(Boolean),
      badge: editingProduct.isBestSeller
        ? editingProduct.badge || 'Best Seller'
        : editingProduct.isNew
          ? editingProduct.badge || 'New Season'
          : editingProduct.isLimited
            ? editingProduct.badge || 'Limited'
            : editingProduct.badge,
    }

    const products = isNewProduct
      ? [...catalog.products, nextProduct]
      : catalog.products.map((p) => (p.id === nextProduct.id ? nextProduct : p))

    await saveCatalog({ ...catalog, products })
    setEditingProduct(null)
  }

  const deleteProduct = async (id: string) => {
    if (!catalog || !confirm('Delete this product?')) return
    await saveCatalog({
      ...catalog,
      products: catalog.products.filter((p) => p.id !== id),
    })
  }

  const openNewCategory = () => {
    setEditingCategory(emptyCategory())
    setIsNewCategory(true)
  }

  const openEditCategory = (category: CategoryMeta) => {
    setEditingCategory({ ...category })
    setCategoryEditSlug(category.slug)
    setIsNewCategory(false)
  }

  const submitCategory = async () => {
    if (!catalog || !editingCategory) return
    const title = editingCategory.title.trim()
    if (!title) return

    const slug = editingCategory.slug.trim() || slugify(title)
    const nextCategory: CategoryMeta = { ...editingCategory, title, slug }

    const categories = isNewCategory
      ? [...catalog.categories, nextCategory]
      : catalog.categories.map((c) => (c.slug === categoryEditSlug ? nextCategory : c))

    await saveCatalog({ ...catalog, categories })
    setEditingCategory(null)
  }

  const deleteCategory = async (slug: string) => {
    if (!catalog || !confirm('Delete this category?')) return
    await saveCatalog({
      ...catalog,
      categories: catalog.categories.filter((c) => c.slug !== slug),
    })
  }

  const openNewBanner = () => {
    const draft = emptyBanner()
    draft.sortOrder = catalog?.banners.length ?? 0
    setEditingBanner(draft)
    setIsNewBanner(true)
  }

  const openEditBanner = (banner: HeroBanner) => {
    setEditingBanner({ ...banner })
    setBannerEditId(banner.id)
    setIsNewBanner(false)
  }

  const submitBanner = async () => {
    if (!catalog || !editingBanner) return
    const image = editingBanner.image.trim()
    if (!image) return

    const id = editingBanner.id.trim() || `banner-${slugify(editingBanner.alt || 'slide')}`
    const nextBanner: HeroBanner = {
      ...editingBanner,
      id,
      image,
      alt: editingBanner.alt.trim() || 'Homepage hero banner',
      sortOrder: Number(editingBanner.sortOrder) || 0,
    }

    const banners = isNewBanner
      ? [...(catalog.banners ?? []), nextBanner]
      : (catalog.banners ?? []).map((banner) => (banner.id === bannerEditId ? nextBanner : banner))

    await saveCatalog({ ...catalog, banners })
    setEditingBanner(null)
  }

  const deleteBanner = async (id: string) => {
    if (!catalog || !confirm('Delete this banner?')) return
    await saveCatalog({
      ...catalog,
      banners: (catalog.banners ?? []).filter((banner) => banner.id !== id),
    })
  }

  const toggleBannerActive = async (id: string) => {
    if (!catalog) return
    await saveCatalog({
      ...catalog,
      banners: (catalog.banners ?? []).map((banner) =>
        banner.id === id ? { ...banner, active: !banner.active } : banner,
      ),
    })
  }

  const renderPanel = () => {
    if (loading) return <p className="dashboardLoading">Loading catalog…</p>
    if (!catalog) return <p className="dashboardLoading">Could not load catalog.</p>

    if (tab === 'products') {
      return (
        <section className="dashboardPanel">
          <div className="dashboardPanelHead">
            <div>
              <h2>Products</h2>
              <p className="dashboardPanelDesc">{catalog.products.length} items in your catalogue</p>
            </div>
            <button type="button" className="btnOrange" onClick={openNewProduct}>+ Add Product</button>
          </div>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Flags</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {catalog.products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="dashboardProductCell">
                        {product.img ? <img src={product.img} alt="" /> : null}
                        <span>{product.title}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="dashboardFlags">
                        {product.isNew && <span className="dashboardFlag">New</span>}
                        {product.isBestSeller && <span className="dashboardFlag">Best</span>}
                        {product.isLimited && <span className="dashboardFlag">Limited</span>}
                      </div>
                    </td>
                    <td>
                      <div className="dashboardRowActions">
                        <button type="button" onClick={() => openEditProduct(product)}>Edit</button>
                        <button type="button" className="danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )
    }

    if (tab === 'categories') {
      return (
        <section className="dashboardPanel">
          <div className="dashboardPanelHead">
            <div>
              <h2>Categories</h2>
              <p className="dashboardPanelDesc">{catalog.categories.length} jewellery collections</p>
            </div>
            <button type="button" className="btnOrange" onClick={openNewCategory}>+ Add Category</button>
          </div>
          <div className="dashboardCategoryGrid">
            {catalog.categories.map((category) => (
              <article key={category.slug} className="dashboardCategoryCard">
                <img src={category.img} alt={category.title} />
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="dashboardRowActions">
                    <button type="button" onClick={() => openEditCategory(category)}>Edit</button>
                    <button type="button" className="danger" onClick={() => deleteCategory(category.slug)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )
    }

    return (
      <section className="dashboardPanel">
        <div className="dashboardPanelHead">
          <div>
            <h2>Hero Banners</h2>
            <p className="dashboardPanelDesc">
              Active banners rotate in the homepage hero section. Use wide jewellery images (1600px+).
            </p>
          </div>
          <button type="button" className="btnOrange" onClick={openNewBanner}>+ Add Banner</button>
        </div>
        <div className="dashboardBannerGrid">
          {(catalog.banners ?? []).length === 0 ? (
            <p className="dashboardEmptyNote">No banners yet. Add one to control the homepage hero slideshow.</p>
          ) : (
            (catalog.banners ?? [])
              .slice()
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((banner) => (
                <article key={banner.id} className={`dashboardBannerCard${banner.active ? '' : ' is-inactive'}`}>
                  <div className="dashboardBannerPreview">
                    <img src={banner.image} alt={banner.alt} />
                    <span className={`dashboardBannerStatus${banner.active ? ' is-live' : ''}`}>
                      {banner.active ? 'Live on homepage' : 'Hidden'}
                    </span>
                  </div>
                  <div className="dashboardBannerBody">
                    <h3>{banner.alt || 'Hero banner'}</h3>
                    <p className="dashboardBannerMeta">Order: {banner.sortOrder}</p>
                    <div className="dashboardRowActions">
                      <button type="button" onClick={() => toggleBannerActive(banner.id)}>
                        {banner.active ? 'Hide' : 'Show'}
                      </button>
                      <button type="button" onClick={() => openEditBanner(banner)}>Edit</button>
                      <button type="button" className="danger" onClick={() => deleteBanner(banner.id)}>Delete</button>
                    </div>
                  </div>
                </article>
              ))
          )}
        </div>
      </section>
    )
  }

  return (
    <div className="dashboardPage">
      <header className="dashboardHeader">
        <div className="dashboardHeaderInner container">
          <div>
            <p className="dashboardEyebrow">{brand.shortName} Admin</p>
            <h1>Catalog Dashboard</h1>
          </div>
          <Link href="/" className="dashboardBackLink">← Back to site</Link>
        </div>
      </header>

      <main className="dashboardMain">
        <div className="dashboardLayout container">
          <aside className="dashboardSidebar" aria-label="Dashboard navigation">
            <p className="dashboardSidebarLabel">Manage</p>
            <nav className="dashboardSidebarNav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`dashboardSidebarLink${tab === item.id ? ' active' : ''}`}
                  onClick={() => setTab(item.id)}
                >
                  <span className="dashboardSidebarLinkTitle">{item.label}</span>
                  <span className="dashboardSidebarLinkHint">{item.hint}</span>
                </button>
              ))}
            </nav>
            <div className="dashboardSidebarNote">
              <strong>Homepage hero</strong>
              <p>Banners marked active appear in the hero carousel on the home page.</p>
            </div>
          </aside>

          <div className="dashboardContent">
            <p className="dashboardStorageNote">
              {storageMode === 'mongodb'
                ? 'Storage: MongoDB — product images can use Cloudinary when credentials are added.'
                : 'Demo mode: catalogue stored locally. Share MongoDB & Cloudinary credentials to connect live storage.'}
            </p>

            {message && <p className="dashboardMessage">{message}</p>}
            {renderPanel()}
          </div>
        </div>

        {editingProduct && (
          <div className="dashboardModalBackdrop" role="presentation" onClick={() => setEditingProduct(null)}>
            <div className="dashboardModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h2>{isNewProduct ? 'Add Product' : 'Edit Product'}</h2>
              <form
                className="dashboardForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  submitProduct()
                }}
              >
                <div className="dashboardFormRow">
                  <label>Title<input value={editingProduct.title} onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })} required /></label>
                  <label>Slug<input value={editingProduct.slug} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })} placeholder="auto-from-title" /></label>
                </div>
                <div className="dashboardFormRow">
                  <label>Price<input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} required /></label>
                  <label>Category
                    <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} required>
                      {categoryTitles.map((title) => <option key={title} value={title}>{title}</option>)}
                    </select>
                  </label>
                </div>
                <label>Main image URL<input value={editingProduct.img} onChange={(e) => setEditingProduct({ ...editingProduct, img: e.target.value })} required /></label>
                <label>Gallery URLs (comma separated)<input value={editingProduct.images.join(', ')} onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
                <label>Short description<textarea rows={2} value={editingProduct.shortDescription} onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })} required /></label>
                <label>Full description<textarea rows={4} value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} required /></label>
                <label>Features (comma separated)<input value={editingProduct.features.join(', ')} onChange={(e) => setEditingProduct({ ...editingProduct, features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
                <div className="dashboardFormRow">
                  <label>SKU<input value={editingProduct.sku} onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })} /></label>
                  <label>Rating<input value={editingProduct.rating} onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })} /></label>
                </div>

                <div className="dashboardCheckboxes">
                  <p className="dashboardCheckboxesTitle">Show on homepage / collections</p>
                  <label className="dashboardCheck">
                    <input type="checkbox" checked={!!editingProduct.isNew} onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })} />
                    New Arrivals section
                  </label>
                  <label className="dashboardCheck">
                    <input type="checkbox" checked={!!editingProduct.isBestSeller} onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })} />
                    Best Sellers section
                  </label>
                  <label className="dashboardCheck">
                    <input type="checkbox" checked={!!editingProduct.isLimited} onChange={(e) => setEditingProduct({ ...editingProduct, isLimited: e.target.checked })} />
                    Limited Edition collection
                  </label>
                </div>

                <div className="dashboardModalActions">
                  <button type="button" className="btn btnDark" onClick={() => setEditingProduct(null)}>Cancel</button>
                  <button type="submit" className="btnOrange" disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingCategory && (
          <div className="dashboardModalBackdrop" role="presentation" onClick={() => setEditingCategory(null)}>
            <div className="dashboardModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h2>{isNewCategory ? 'Add Category' : 'Edit Category'}</h2>
              <form
                className="dashboardForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  submitCategory()
                }}
              >
                <label>Title<input value={editingCategory.title} onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })} required /></label>
                <label>Slug<input value={editingCategory.slug} onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })} placeholder="auto-from-title" /></label>
                <label>Image URL<input value={editingCategory.img} onChange={(e) => setEditingCategory({ ...editingCategory, img: e.target.value })} required /></label>
                <label>Description<textarea rows={3} value={editingCategory.description} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} required /></label>
                <label>Card size
                  <select value={editingCategory.size} onChange={(e) => setEditingCategory({ ...editingCategory, size: e.target.value as CategoryMeta['size'] })}>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="wide">Wide</option>
                  </select>
                </label>
                <div className="dashboardModalActions">
                  <button type="button" className="btn btnDark" onClick={() => setEditingCategory(null)}>Cancel</button>
                  <button type="submit" className="btnOrange" disabled={saving}>{saving ? 'Saving…' : 'Save Category'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {editingBanner && (
          <div className="dashboardModalBackdrop" role="presentation" onClick={() => setEditingBanner(null)}>
            <div className="dashboardModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h2>{isNewBanner ? 'Add Hero Banner' : 'Edit Hero Banner'}</h2>
              <form
                className="dashboardForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  submitBanner()
                }}
              >
                <label>Image URL<input value={editingBanner.image} onChange={(e) => setEditingBanner({ ...editingBanner, image: e.target.value })} required placeholder="https://..." /></label>
                <label>Alt text / label<input value={editingBanner.alt} onChange={(e) => setEditingBanner({ ...editingBanner, alt: e.target.value })} placeholder="Bridal jewellery collection" /></label>
                <div className="dashboardFormRow">
                  <label>Sort order<input type="number" min={0} value={editingBanner.sortOrder} onChange={(e) => setEditingBanner({ ...editingBanner, sortOrder: Number(e.target.value) })} /></label>
                  <label className="dashboardCheck dashboardCheck--inline">
                    <input type="checkbox" checked={editingBanner.active} onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })} />
                    Show on homepage hero
                  </label>
                </div>
                {editingBanner.image ? (
                  <div className="dashboardBannerModalPreview">
                    <img src={editingBanner.image} alt={editingBanner.alt || 'Banner preview'} />
                  </div>
                ) : null}
                <div className="dashboardModalActions">
                  <button type="button" className="btn btnDark" onClick={() => setEditingBanner(null)}>Cancel</button>
                  <button type="submit" className="btnOrange" disabled={saving}>{saving ? 'Saving…' : 'Save Banner'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
