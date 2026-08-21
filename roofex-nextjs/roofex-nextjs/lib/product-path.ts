/** Public product detail path — root slug, e.g. /kundan-choker-set */
export function productPath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, '')
  return clean ? `/${clean}` : '/products'
}
