import { notFound, redirect } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/lib/products'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default function Page({ params }: Props) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()
  redirect(`/products?category=${params.slug}`)
}
