'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import type { HeroBanner, Product } from '@/lib/product-types'
import { slugify, type CategoryMeta, type StoredCatalog } from '@/lib/catalog-utils'
import { brand } from '@/lib/brand'
import { productPath } from '@/lib/product-path'
import { ENQUIRY_TYPE_LABELS, type Enquiry } from '@/lib/enquiry-types'

type Tab = 'products' | 'categories' | 'banners' | 'marquee' | 'enquiries'

const navItems: { id: Tab; label: string; hint: string }[] = [
  { id: 'products', label: 'Products', hint: 'Manage catalogue items' },
  { id: 'categories', label: 'Categories', hint: 'Collection groups' },
  { id: 'banners', label: 'Hero Banners', hint: 'Homepage hero slides' },
  { id: 'marquee', label: 'Text Slider', hint: 'Homepage ticker after About' },
  { id: 'enquiries', label: 'Enquiries', hint: 'Contact form submissions' },
]

function nextSku(products: Product[]): string {
  let max = products.length
  for (const product of products) {
    const match = product.sku?.match(/(\d+)\s*$/)
    if (match) max = Math.max(max, Number(match[1]))
  }
  return `DB-${String(max + 1).padStart(3, '0')}`
}

function fileLabel(url: string, fallback = 'Image'): string {
  try {
    const path = url.split('?')[0]
    const name = path.split('/').pop() || fallback
    return decodeURIComponent(name).slice(0, 48)
  } catch {
    return fallback
  }
}

function ImagePickerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M21 16l-5.5-5.5L9 17" />
    </svg>
  )
}

type UploadKind = 'products' | 'categories' | 'banners'

async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })
}

async function uploadImageFile(file: File, kind: UploadKind = 'products'): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  form.append('kind', kind)
  const res = await fetch('/api/upload', { method: 'POST', body: form })
  if (res.ok) {
    const data = (await res.json()) as { url?: string; secure_url?: string }
    const url = data.url || data.secure_url
    if (url) return url
  }

  // Cloudinary missing / failed — only keep tiny files as data URLs so catalog saves stay under Mongo limits.
  if (file.size <= 400_000) {
    return readFileAsDataUrl(file)
  }

  const data = (await res.json().catch(() => null)) as { error?: string } | null
  throw new Error(
    data?.error
      || 'Image upload failed. Check Cloudinary credentials, or use a smaller image / image URL.',
  )
}

function DashboardImageField({
  title,
  value,
  label,
  kind = 'products',
  multiple = false,
  values = [],
  onChange,
  onAddMany,
  onRemove,
  busy = false,
}: {
  title: string
  value?: string
  label?: string
  kind?: UploadKind
  multiple?: boolean
  values?: string[]
  onChange?: (url: string, label?: string) => void
  onAddMany?: (items: { url: string; label: string }[]) => void
  onRemove?: (url: string) => void
  busy?: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [urlDraft, setUrlDraft] = useState('')
  const [uploading, setUploading] = useState(false)
  const isBusy = busy || uploading

  const applyUrl = () => {
    const url = urlDraft.trim()
    if (!url) return
    if (multiple && onAddMany) {
      onAddMany([{ url, label: fileLabel(url) }])
    } else if (onChange) {
      onChange(url, fileLabel(url))
    }
    setUrlDraft('')
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    if (!files.length) return
    setUploading(true)
    try {
      if (multiple && onAddMany) {
        const items: { url: string; label: string }[] = []
        for (const file of files) {
          const url = await uploadImageFile(file, kind)
          items.push({ url, label: file.name })
        }
        onAddMany(items)
      } else if (onChange && files[0]) {
        const url = await uploadImageFile(files[0], kind)
        onChange(url, files[0].name)
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const previews = multiple
    ? values
    : value
      ? [value]
      : []

  return (
    <div className="dashboardImageBlock">
      <span className="dashboardImageBlockTitle">{title}</span>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="dashboardImageInput"
        onChange={onFileChange}
      />

      <div className="dashboardImageActions">
        <button
          type="button"
          className="dashboardImagePick dashboardImagePick--compact"
          onClick={() => fileRef.current?.click()}
          disabled={isBusy}
        >
          <ImagePickerIcon />
          <span>{isBusy ? 'Uploading…' : multiple ? 'Choose local images' : 'Choose local image'}</span>
        </button>
        <div className="dashboardImageUrlRow">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="Or paste image URL (https://...)"
          />
          <button type="button" className="btnOrange dashboardImageUrlBtn" onClick={applyUrl} disabled={!urlDraft.trim()}>
            Add URL
          </button>
        </div>
      </div>

      {previews.length > 0 ? (
        <div className="dashboardImageGallery">
          {previews.map((url) => (
            <div key={url} className="dashboardImageThumb">
              <img src={url} alt={label || fileLabel(url)} />
              <div className="dashboardImageMeta">
                <strong>{label && !multiple ? label : fileLabel(url)}</strong>
                {onRemove ? (
                  <button type="button" className="danger" onClick={() => onRemove(url)}>
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

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
  material: '',
  sku: '',
  reviewCount: 0,
  inStock: true,
  isNew: false,
  isBestSeller: false,
  isLimited: false,
  showInFooter: false,
  hidePrice: false,
  moq: 1,
  subcategory: '',
})

const emptyCategory = (): CategoryMeta => ({
  title: '',
  slug: '',
  img: '',
  size: 'medium',
  description: '',
  subcategories: [],
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
  const [messageError, setMessageError] = useState(false)
  const [storageMode, setStorageMode] = useState<'mongodb' | 'file'>('file')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<CategoryMeta | null>(null)
  const [isNewProduct, setIsNewProduct] = useState(false)
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [categoryEditSlug, setCategoryEditSlug] = useState('')
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null)
  const [isNewBanner, setIsNewBanner] = useState(false)
  const [bannerEditId, setBannerEditId] = useState('')
  const [marqueeDraft, setMarqueeDraft] = useState('')
  const [imageLabels, setImageLabels] = useState<Record<string, string>>({})
  const [slugLocked, setSlugLocked] = useState(false)
  const [subcategoryDraft, setSubcategoryDraft] = useState('')
  const [featureDraft, setFeatureDraft] = useState('')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [enquiriesLoading, setEnquiriesLoading] = useState(false)
  const [resendConfigured, setResendConfigured] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    try {
      const [catalogRes, metaRes] = await Promise.all([
        fetch('/api/catalog', { cache: 'no-store' }),
        fetch('/api/catalog/meta', { cache: 'no-store' }),
      ])
      const data = (await catalogRes.json()) as StoredCatalog
      setCatalog(data)
      setMarqueeDraft((data.marqueeTerms ?? []).join('\n'))
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

  const loadEnquiries = useCallback(async () => {
    setEnquiriesLoading(true)
    try {
      const res = await fetch('/api/enquiries', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load enquiries')
      const data = (await res.json()) as { enquiries?: Enquiry[]; resendConfigured?: boolean }
      setEnquiries(Array.isArray(data.enquiries) ? data.enquiries : [])
      setResendConfigured(Boolean(data.resendConfigured))
    } catch {
      setMessageError(true)
      setMessage('Could not load enquiries.')
    } finally {
      setEnquiriesLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tab === 'enquiries') {
      loadEnquiries()
    }
  }, [tab, loadEnquiries])

  const categoryTitles = useMemo(
    () => catalog?.categories.map((c) => c.title) ?? [],
    [catalog],
  )

  const saveCatalog = async (next: StoredCatalog) => {
    setSaving(true)
    setMessage('')
    setMessageError(false)
    try {
      const res = await fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || `Save failed (${res.status})`)
      }
      setCatalog(next)
      setMessageError(false)
      setMessage('Saved successfully.')
      window.dispatchEvent(new CustomEvent('catalog-updated'))
    } catch (error) {
      setMessageError(true)
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : 'Could not save changes. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  const openNewProduct = () => {
    const draft = emptyProduct()
    draft.category = categoryTitles[0] ?? ''
    draft.sku = nextSku(catalog?.products ?? [])
    setEditingProduct(draft)
    setIsNewProduct(true)
    setSlugLocked(false)
    setImageLabels({})
    setFeatureDraft('')
  }

  const openEditProduct = (product: Product) => {
    setEditingProduct({
      ...product,
      material: product.material ?? '',
      images: [...(product.images ?? [product.img]).filter(Boolean)],
      features: [...(product.features ?? [])],
    })
    setIsNewProduct(false)
    setSlugLocked(true)
    setFeatureDraft('')
    const labels: Record<string, string> = {}
    if (product.img) labels[product.img] = fileLabel(product.img, 'Main image')
    for (const url of product.images ?? []) {
      if (url) labels[url] = fileLabel(url)
    }
    setImageLabels(labels)
  }

  const updateProductTitle = (title: string) => {
    if (!editingProduct) return
    const nextSlug = slugLocked && editingProduct.slug ? editingProduct.slug : slugify(title)
    setEditingProduct({
      ...editingProduct,
      title,
      slug: nextSlug,
    })
  }

  const updateProductSlug = (slug: string) => {
    if (!editingProduct) return
    setSlugLocked(true)
    setEditingProduct({ ...editingProduct, slug: slugify(slug) || slug })
  }

  const rememberLabel = (url: string, name: string) => {
    setImageLabels((prev) => ({ ...prev, [url]: name }))
  }

  const setMainImage = (url: string, label?: string) => {
    if (!editingProduct) return
    if (label) rememberLabel(url, label)
    else rememberLabel(url, fileLabel(url, 'Main image'))
    const extras = editingProduct.images.filter((img) => img && img !== editingProduct.img && img !== url)
    setEditingProduct({
      ...editingProduct,
      img: url,
      images: [url, ...extras],
    })
  }

  const addExtraImages = (items: { url: string; label: string }[]) => {
    if (!editingProduct) return
    const main = editingProduct.img
    const existing = editingProduct.images.filter((img) => img && img !== main)
    const merged = [...existing]
    for (const item of items) {
      rememberLabel(item.url, item.label)
      if (!merged.includes(item.url) && item.url !== main) merged.push(item.url)
    }
    setEditingProduct({
      ...editingProduct,
      images: main ? [main, ...merged] : merged,
    })
  }

  const removeExtraImage = (url: string) => {
    if (!editingProduct) return
    setEditingProduct({
      ...editingProduct,
      images: editingProduct.images.filter((img) => img !== url),
    })
  }

  const clearMainImage = () => {
    if (!editingProduct) return
    const extras = editingProduct.images.filter((img) => img && img !== editingProduct.img)
    setEditingProduct({
      ...editingProduct,
      img: '',
      images: extras,
    })
  }

  const submitProduct = async () => {
    if (!catalog || !editingProduct) return
    const title = editingProduct.title.trim()
    if (!title) return

    const slug = editingProduct.slug.trim() || slugify(title)
    if (!slug) {
      setMessageError(true)
      setMessage('Add a title so the product URL/slug can be created.')
      return
    }
    const img = editingProduct.img.trim()
    if (!img) {
      setMessageError(true)
      setMessage('Please add a main product image.')
      return
    }

    const id = editingProduct.id || `rx-${slug}`
    const images = editingProduct.images.filter(Boolean)
    const sku = editingProduct.sku.trim() || nextSku(catalog.products)
    const nextProduct: Product = {
      ...editingProduct,
      id,
      slug,
      title,
      sku,
      moq: Math.max(1, Math.floor(Number(editingProduct.moq) || 1)),
      subcategory: editingProduct.subcategory?.trim() || undefined,
      material: editingProduct.material?.trim() || undefined,
      img: img || images[0] || '',
      images: images.length ? images : img ? [img] : [],
      features: editingProduct.features.map((f) => f.trim()).filter(Boolean),
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
    setFeatureDraft('')
  }

  const addFeatureToDraft = () => {
    if (!editingProduct) return
    const feature = featureDraft.trim()
    if (!feature) return
    const existing = editingProduct.features.map((f) => f.trim().toLowerCase())
    if (existing.includes(feature.toLowerCase())) {
      setMessageError(true)
      setMessage('That feature is already added.')
      return
    }
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, feature],
    })
    setFeatureDraft('')
  }

  const removeFeatureFromDraft = (index: number) => {
    if (!editingProduct) return
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== index),
    })
  }

  const updateFeatureAt = (index: number, value: string) => {
    if (!editingProduct) return
    const features = [...editingProduct.features]
    features[index] = value
    setEditingProduct({ ...editingProduct, features })
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
    setSubcategoryDraft('')
  }

  const openEditCategory = (category: CategoryMeta) => {
    setEditingCategory({
      ...category,
      subcategories: [...(category.subcategories ?? [])],
    })
    setCategoryEditSlug(category.slug)
    setIsNewCategory(false)
    setSubcategoryDraft('')
  }

  const addSubcategoryToDraft = () => {
    if (!editingCategory) return
    const title = subcategoryDraft.trim()
    if (!title) return
    const slug = slugify(title)
    const existing = editingCategory.subcategories ?? []
    if (existing.some((s) => s.slug === slug || s.title.toLowerCase() === title.toLowerCase())) {
      setMessageError(true)
      setMessage('That sub-category already exists.')
      return
    }
    setEditingCategory({
      ...editingCategory,
      subcategories: [...existing, { title, slug }],
    })
    setSubcategoryDraft('')
  }

  const removeSubcategoryFromDraft = (slug: string) => {
    if (!editingCategory) return
    setEditingCategory({
      ...editingCategory,
      subcategories: (editingCategory.subcategories ?? []).filter((s) => s.slug !== slug),
    })
  }

  const submitCategory = async () => {
    if (!catalog || !editingCategory) return
    const title = editingCategory.title.trim()
    if (!title) return
    if (!editingCategory.img.trim()) {
      setMessageError(true)
      setMessage('Please add a category image (local file or URL).')
      return
    }

    const slug = editingCategory.slug.trim() || slugify(title)
    const subcategories = (editingCategory.subcategories ?? [])
      .map((s) => ({
        title: s.title.trim(),
        slug: s.slug.trim() || slugify(s.title),
      }))
      .filter((s) => s.title)
    const nextCategory: CategoryMeta = { ...editingCategory, title, slug, subcategories }

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
    if (!image) {
      setMessageError(true)
      setMessage('Please add a banner image (local file or URL).')
      return
    }

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

  const toggleProductInStock = async (id: string, inStock: boolean) => {
    if (!catalog) return
    await saveCatalog({
      ...catalog,
      products: catalog.products.map((product) =>
        product.id === id ? { ...product, inStock } : product,
      ),
    })
  }

  const saveMarqueeTerms = async () => {
    if (!catalog) return
    const marqueeTerms = marqueeDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    setMarqueeDraft(marqueeTerms.join('\n'))
    await saveCatalog({ ...catalog, marqueeTerms })
  }

  const renderPanel = () => {
    if (tab === 'enquiries') {
      return (
        <section className="dashboardPanel">
          <div className="dashboardPanelHead">
            <div>
              <h2>Enquiries</h2>
              <p className="dashboardPanelDesc">
                {enquiriesLoading
                  ? 'Loading submissions…'
                  : `${enquiries.length} contact form submission${enquiries.length === 1 ? '' : 's'}`}
              </p>
            </div>
            <button type="button" className="btnOrange" onClick={loadEnquiries} disabled={enquiriesLoading}>
              {enquiriesLoading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
          <p className="dashboardStorageNote">
            {resendConfigured
              ? 'Resend email alerts are enabled for new submissions.'
              : 'Resend not configured yet — submissions are still saved here. Add RESEND_API_KEY later to email alerts.'}
          </p>
          <div className="dashboardTableWrap">
            <table className="dashboardTable">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 && !enquiriesLoading ? (
                  <tr>
                    <td colSpan={6} className="dashboardEmptyCell">
                      No enquiries yet. Submit the contact form to see entries here.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <time dateTime={item.createdAt}>
                          {new Date(item.createdAt).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </td>
                      <td>
                        <span className="dashboardFlag">
                          {ENQUIRY_TYPE_LABELS[item.type] || item.type}
                        </span>
                      </td>
                      <td>
                        <strong>{item.name}</strong>
                        <div className="dashboardMuted">{item.email}</div>
                        {item.phone ? <div className="dashboardMuted">{item.phone}</div> : null}
                      </td>
                      <td>
                        <div>{item.subject}</div>
                        {item.productName ? (
                          <div className="dashboardMuted">
                            {item.productName}
                            {item.quantity != null ? ` · Qty ${item.quantity}` : ''}
                            {item.moq != null ? ` · MOQ ${item.moq}` : ''}
                          </div>
                        ) : null}
                      </td>
                      <td>
                        <span
                          className={`dashboardFlag${
                            item.emailStatus === 'sent'
                              ? ' dashboardFlag--ok'
                              : item.emailStatus === 'failed'
                                ? ' dashboardFlag--oos'
                                : ''
                          }`}
                        >
                          {item.emailStatus}
                        </span>
                      </td>
                      <td>
                        <div className="dashboardRowActions">
                          <button type="button" onClick={() => setSelectedEnquiry(item)}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )
    }

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
                  <th>MOQ</th>
                  <th>Price</th>
                  <th>In stock</th>
                  <th>Flags</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {catalog.products.map((product) => (
                  <tr key={product.id} className={product.inStock === false ? 'dashboardRow--oos' : undefined}>
                    <td>
                      <div className="dashboardProductCell">
                        {product.img ? <img src={product.img} alt="" /> : null}
                        <span>{product.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dashboardCategoryCell">
                        <span>{product.category}</span>
                        {product.subcategory ? (
                          <small>{product.subcategory}</small>
                        ) : null}
                      </div>
                    </td>
                    <td>{product.moq && product.moq > 1 ? product.moq : '1'}</td>
                    <td>{product.hidePrice ? 'Hidden' : product.price}</td>
                    <td>
                      <label className="dashboardStockToggle" title={product.inStock === false ? 'Mark in stock' : 'Mark out of stock'}>
                        <input
                          type="checkbox"
                          checked={product.inStock !== false}
                          disabled={saving}
                          onChange={(e) => toggleProductInStock(product.id, e.target.checked)}
                        />
                        <span>{product.inStock === false ? 'Out of stock' : 'In stock'}</span>
                      </label>
                    </td>
                    <td>
                      <div className="dashboardFlags">
                        {product.isNew && <span className="dashboardFlag">New</span>}
                        {product.isBestSeller && <span className="dashboardFlag">Best</span>}
                        {product.isLimited && <span className="dashboardFlag">Limited</span>}
                        {product.showInFooter && <span className="dashboardFlag">Footer</span>}
                        {product.hidePrice && <span className="dashboardFlag">No price</span>}
                        {product.inStock === false && <span className="dashboardFlag dashboardFlag--oos">OOS</span>}
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
              <p className="dashboardPanelDesc">{catalog.categories.length} product categories</p>
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
                  {(category.subcategories?.length ?? 0) > 0 ? (
                    <p className="dashboardSubcatHint">
                      {category.subcategories!.length} sub-categor
                      {category.subcategories!.length === 1 ? 'y' : 'ies'}:{' '}
                      {category.subcategories!.map((s) => s.title).join(', ')}
                    </p>
                  ) : (
                    <p className="dashboardSubcatHint">No sub-categories yet</p>
                  )}
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

    if (tab === 'marquee') {
      return (
        <section className="dashboardPanel">
          <div className="dashboardPanelHead">
            <div>
              <h2>Text Slider</h2>
              <p className="dashboardPanelDesc">
                Words that scroll in the homepage ticker just after the About Us section. One phrase per line.
              </p>
            </div>
            <button type="button" className="btnOrange" onClick={saveMarqueeTerms} disabled={saving}>
              {saving ? 'Saving…' : 'Save Slider Text'}
            </button>
          </div>
          <label className="dashboardMarqueeEditor">
            <span>Slider phrases</span>
            <textarea
              rows={10}
              value={marqueeDraft}
              onChange={(e) => setMarqueeDraft(e.target.value)}
              placeholder={'GLOBAL SUPPLY\nWHOLESALE READY\nEXPORT QUALITY'}
            />
          </label>
          <div className="dashboardMarqueePreview" aria-label="Slider preview">
            {(marqueeDraft.split('\n').map((line) => line.trim()).filter(Boolean).length
              ? marqueeDraft.split('\n').map((line) => line.trim()).filter(Boolean)
              : ['Add phrases above']
            ).map((term, i) => (
              <span key={`${term}-${i}`} className="dashboardMarqueeChip">{term}</span>
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
              Active banners rotate in the homepage hero section. Use wide product images (1600px+).
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
              <strong>Homepage content</strong>
              <p>Use Text Slider for the ticker after About Us, and Hero Banners for the top slideshow.</p>
            </div>
          </aside>

          <div className="dashboardContent">
            <p className="dashboardStorageNote">
              {storageMode === 'mongodb'
                ? 'Storage: MongoDB — product images can use Cloudinary when credentials are added.'
                : 'Demo mode: catalogue stored locally. Share MongoDB & Cloudinary credentials to connect live storage.'}
            </p>

            {message && (
              <p className={`dashboardMessage${messageError ? ' dashboardMessage--error' : ''}`}>
                {message}
              </p>
            )}
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
                  <label>
                    Title
                    <input
                      value={editingProduct.title}
                      onChange={(e) => updateProductTitle(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Slug
                    <input
                      value={editingProduct.slug}
                      onChange={(e) => updateProductSlug(e.target.value)}
                      placeholder="auto-from-title"
                    />
                    {editingProduct.slug ? (
                      <span className="dashboardFieldHint">URL: {productPath(editingProduct.slug)}</span>
                    ) : null}
                  </label>
                </div>
                <div className="dashboardFormRow">
                  <label>
                    Price
                    <input
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      required={!editingProduct.hidePrice}
                      disabled={!!editingProduct.hidePrice}
                    />
                  </label>
                  <label>
                    MOQ (Min. order qty)
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={editingProduct.moq ?? 1}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          moq: Math.max(1, Math.floor(Number(e.target.value) || 1)),
                        })
                      }
                    />
                    <span className="dashboardFieldHint">Minimum quantity that must be ordered</span>
                  </label>
                </div>
                <div className="dashboardFormRow">
                  <label>
                    Category
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                          subcategory: '',
                        })
                      }
                      required
                    >
                      {categoryTitles.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Sub-category
                    <select
                      value={editingProduct.subcategory || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, subcategory: e.target.value })
                      }
                    >
                      <option value="">None</option>
                      {(
                        catalog?.categories.find((c) => c.title === editingProduct.category)
                          ?.subcategories ?? []
                      ).map((sub) => (
                        <option key={sub.slug} value={sub.title}>
                          {sub.title}
                        </option>
                      ))}
                    </select>
                    <span className="dashboardFieldHint">
                      Add sub-categories under the Categories tab first
                    </span>
                  </label>
                </div>

                <div className="dashboardImageSection">
                  <DashboardImageField
                    title="Main image"
                    kind="products"
                    value={editingProduct.img}
                    label={imageLabels[editingProduct.img] || fileLabel(editingProduct.img, 'Main image')}
                    onChange={setMainImage}
                    onRemove={clearMainImage}
                  />
                  <DashboardImageField
                    title="Extra images"
                    kind="products"
                    multiple
                    values={editingProduct.images.filter((url) => url && url !== editingProduct.img)}
                    onAddMany={addExtraImages}
                    onRemove={removeExtraImage}
                  />
                </div>

                <label>
                  Short description
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Full description
                  <textarea
                    rows={4}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    required
                  />
                </label>
                <div className="dashboardFeatureEditor">
                  <span className="dashboardFeatureEditorTitle">Features</span>
                  <p className="dashboardFieldHint">Add each feature separately — shown as chips on the product page.</p>
                  <div className="dashboardFeatureList">
                    {editingProduct.features.length === 0 ? (
                      <span className="dashboardFieldHint">No features added yet.</span>
                    ) : (
                      editingProduct.features.map((feature, index) => (
                        <div key={`feature-${index}`} className="dashboardFeatureRow">
                          <input
                            value={feature}
                            onChange={(e) => updateFeatureAt(index, e.target.value)}
                            placeholder={`Feature ${index + 1}`}
                            aria-label={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="danger"
                            onClick={() => removeFeatureFromDraft(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="dashboardFeatureAddRow">
                    <input
                      value={featureDraft}
                      onChange={(e) => setFeatureDraft(e.target.value)}
                      placeholder="e.g. Antique gold plating"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addFeatureToDraft()
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btnOrange dashboardImageUrlBtn"
                      onClick={addFeatureToDraft}
                      disabled={!featureDraft.trim()}
                    >
                      Add feature
                    </button>
                  </div>
                </div>

                <label>
                  Material
                  <input
                    value={editingProduct.material ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    placeholder="e.g. Brass alloy with gold plating"
                  />
                  <span className="dashboardFieldHint">Shown under Specifications on the product page</span>
                </label>

                <label>
                  SKU
                  <input
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    readOnly={isNewProduct}
                    title={isNewProduct ? 'Auto-assigned from product count' : undefined}
                  />
                  {isNewProduct ? (
                    <span className="dashboardFieldHint">Auto from product list count</span>
                  ) : null}
                </label>
                <div className="dashboardFormRow">
                  <label>
                    Rating
                    <input
                      value={editingProduct.rating}
                      onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })}
                      placeholder="4.9"
                    />
                  </label>
                  <label>
                    Number of reviews
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={editingProduct.reviewCount ?? 0}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          reviewCount: Math.max(0, Math.floor(Number(e.target.value) || 0)),
                        })
                      }
                      placeholder="412"
                    />
                    <span className="dashboardFieldHint">Shown as “4.9 · 412 reviews” on the product page</span>
                  </label>
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
                  <label className="dashboardCheck">
                    <input type="checkbox" checked={!!editingProduct.showInFooter} onChange={(e) => setEditingProduct({ ...editingProduct, showInFooter: e.target.checked })} />
                    Show in footer (Shop Products)
                  </label>
                  <label className="dashboardCheck">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock !== false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    />
                    In stock (uncheck = out of stock → Order on Demand)
                  </label>
                  <label className="dashboardCheck">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.hidePrice}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        hidePrice: e.target.checked,
                        price: e.target.checked ? (editingProduct.price || '₹0') : editingProduct.price,
                      })}
                    />
                    Hide price (show enquire only)
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
                <label>Title<input value={editingCategory.title} onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value, slug: isNewCategory ? slugify(e.target.value) : editingCategory.slug })} required /></label>
                <label>Slug<input value={editingCategory.slug} onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })} placeholder="auto-from-title" /></label>
                <div className="dashboardImageSection">
                  <DashboardImageField
                    title="Category image"
                    kind="categories"
                    value={editingCategory.img}
                    label={fileLabel(editingCategory.img, 'Category image')}
                    onChange={(url) => setEditingCategory({ ...editingCategory, img: url })}
                    onRemove={() => setEditingCategory({ ...editingCategory, img: '' })}
                  />
                </div>
                <label>Description<textarea rows={3} value={editingCategory.description} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} required /></label>
                <label>Card size
                  <select value={editingCategory.size} onChange={(e) => setEditingCategory({ ...editingCategory, size: e.target.value as CategoryMeta['size'] })}>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="wide">Wide</option>
                  </select>
                </label>

                <div className="dashboardSubcatSection">
                  <span className="dashboardImageBlockTitle">Sub-categories</span>
                  <p className="dashboardFieldHint">
                    Add sub-groups under this category. Products can then pick a sub-category.
                  </p>
                  <div className="dashboardImageUrlRow">
                    <input
                      type="text"
                      value={subcategoryDraft}
                      onChange={(e) => setSubcategoryDraft(e.target.value)}
                      placeholder="e.g. Export Pack / Retail Pack"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSubcategoryToDraft()
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btnOrange dashboardImageUrlBtn"
                      onClick={addSubcategoryToDraft}
                      disabled={!subcategoryDraft.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="dashboardSubcatList">
                    {(editingCategory.subcategories ?? []).length === 0 ? (
                      <span className="dashboardFieldHint">No sub-categories added yet.</span>
                    ) : (
                      (editingCategory.subcategories ?? []).map((sub) => (
                        <div key={sub.slug} className="dashboardSubcatChip">
                          <span>{sub.title}</span>
                          <button type="button" className="danger" onClick={() => removeSubcategoryFromDraft(sub.slug)}>
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

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
                <div className="dashboardImageSection">
                  <DashboardImageField
                    title="Banner image"
                    kind="banners"
                    value={editingBanner.image}
                    label={fileLabel(editingBanner.image, 'Banner image')}
                    onChange={(url) => setEditingBanner({ ...editingBanner, image: url })}
                    onRemove={() => setEditingBanner({ ...editingBanner, image: '' })}
                  />
                </div>
                <label>Alt text / label<input value={editingBanner.alt} onChange={(e) => setEditingBanner({ ...editingBanner, alt: e.target.value })} placeholder="Featured product collection" /></label>
                <div className="dashboardFormRow">
                  <label>Sort order<input type="number" min={0} value={editingBanner.sortOrder} onChange={(e) => setEditingBanner({ ...editingBanner, sortOrder: Number(e.target.value) })} /></label>
                  <label className="dashboardCheck dashboardCheck--inline">
                    <input type="checkbox" checked={editingBanner.active} onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })} />
                    Show on homepage hero
                  </label>
                </div>
                <div className="dashboardModalActions">
                  <button type="button" className="btn btnDark" onClick={() => setEditingBanner(null)}>Cancel</button>
                  <button type="submit" className="btnOrange" disabled={saving}>{saving ? 'Saving…' : 'Save Banner'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {selectedEnquiry && (
          <div className="dashboardModalBackdrop" role="presentation" onClick={() => setSelectedEnquiry(null)}>
            <div className="dashboardModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h2>Enquiry details</h2>
              <div className="dashboardEnquiryDetail">
                <p><strong>When:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}</p>
                <p><strong>Type:</strong> {ENQUIRY_TYPE_LABELS[selectedEnquiry.type] || selectedEnquiry.type}</p>
                <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
                <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></p>
                {selectedEnquiry.phone ? (
                  <p><strong>Phone:</strong> <a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a></p>
                ) : null}
                {selectedEnquiry.productName ? (
                  <p>
                    <strong>Product:</strong> {selectedEnquiry.productName}
                    {selectedEnquiry.quantity != null ? ` · Qty ${selectedEnquiry.quantity}` : ''}
                    {selectedEnquiry.moq != null ? ` · MOQ ${selectedEnquiry.moq}` : ''}
                  </p>
                ) : null}
                <p>
                  <strong>Email alert:</strong> {selectedEnquiry.emailStatus}
                  {selectedEnquiry.emailError ? ` — ${selectedEnquiry.emailError}` : ''}
                </p>
                <div className="dashboardEnquiryMessage">
                  <strong>Message</strong>
                  <p>{selectedEnquiry.message}</p>
                </div>
              </div>
              <div className="dashboardModalActions">
                <button type="button" className="btn btnDark" onClick={() => setSelectedEnquiry(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
