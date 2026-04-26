import {
  ARTICLE_DATE_LEN,
  PAGE_ARTICLE_IMPORT_GLOB,
  PAGE_DIR_REL_TO_SERVICE,
  PARENT_TITLE_BY_SLUG,
  TOP_NAV_SLUG_ORDER,
  isStandalonePageDir,
} from '@/constants/page-convention'

export type MdxRoute = {
  parentPath: string
  parentTitle: string
  path: string
  key: string
  name: string
  date: string
  element: () => Promise<unknown>
  /** 该分类按日期降序后的首篇，对应路由 `/slug`（index） */
  isCategoryIndex?: boolean
}

if (import.meta.env.DEV && '../page/*/*.mdx' !== PAGE_ARTICLE_IMPORT_GLOB) {
  throw new Error('[mdx-service] glob 字面量与 page-convention.PAGE_ARTICLE_IMPORT_GLOB 不一致')
}
const mdxs = import.meta.glob('../page/*/*.mdx')

const entryKeyRe = new RegExp(
  `^${PAGE_DIR_REL_TO_SERVICE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([^/]+)/([^/]+)\\.mdx$`,
)

export let mdxFiles: MdxRoute[] = []
export let mdxInitError: string | null = null

/** 与侧栏、路由 index 子项一致：日期字符串 YYYYMMDD 降序；同日按 key 稳定排序 */
export function compareArticleDateDesc(a: MdxRoute, b: MdxRoute) {
  if (a.date < b.date) return 1
  if (a.date > b.date) return -1
  return a.key.localeCompare(b.key)
}

function applyCategoryIndexPaths(routes: MdxRoute[]) {
  const byParent = new Map<string, MdxRoute[]>()
  for (const r of routes) {
    const list = byParent.get(r.parentPath) ?? []
    list.push(r)
    byParent.set(r.parentPath, list)
  }
  for (const list of byParent.values()) {
    list.sort(compareArticleDateDesc)
    list.forEach((r, i) => {
      const isFirst = i === 0
      r.isCategoryIndex = isFirst
      r.path = isFirst ? `/${r.parentPath}` : `/${r.parentPath}/${r.date}`
    })
  }
  return Array.from(byParent.keys())
    .sort()
    .flatMap((k) => byParent.get(k)!)
}

export const genMdxRouters = (): MdxRoute[] => {
  try {
    if (mdxFiles.length === 0) {
      mdxInitError = null
      const keys = Object.keys(mdxs).sort()
      const raw = keys
        .map((key) => {
          const m = key.match(entryKeyRe)
          if (!m) return null
          const [, group, base] = m
          if (isStandalonePageDir(group)) return null

          const at = base.indexOf('@')
          if (at !== ARTICLE_DATE_LEN) return null
          const date = base.slice(0, ARTICLE_DATE_LEN)
          const name = base.slice(ARTICLE_DATE_LEN + 1)
          if (!/^\d{8}$/.test(date) || !name) return null

          const parentPath = group
          const parentTitle = PARENT_TITLE_BY_SLUG[group] ?? group

          const loader = mdxs[key]
          if (!loader) return null

          const params: MdxRoute = {
            parentPath,
            parentTitle,
            path: `/${parentPath}/${date}`,
            key: `/${parentPath}/${date}`,
            name,
            date,
            element: loader,
          }

          return params
        })
        .filter((x): x is MdxRoute => Boolean(x))

      mdxFiles = applyCategoryIndexPaths(raw)
    }
    return mdxFiles
  } catch (e) {
    mdxInitError = e instanceof Error ? e.message : String(e)
    return []
  }
}

export const genSubMdxRouters = (type: string) => {
  if (mdxFiles.length === 0) genMdxRouters()
  return mdxFiles.filter((mdx) => mdx.parentPath === type)
}

/** 按标题、分类名、slug、日期模糊搜索（不区分大小写） */
export function searchArticles(raw: string, limit = 20): MdxRoute[] {
  const q = raw.trim().toLowerCase()
  if (!q) return []
  if (mdxFiles.length === 0) genMdxRouters()
  const hits = mdxFiles.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.parentTitle.toLowerCase().includes(q) ||
      r.parentPath.toLowerCase().includes(q) ||
      r.date.includes(q),
  )
  hits.sort(compareArticleDateDesc)
  return hits.slice(0, limit)
}

export const genMdxMenus = () => {
  if (mdxFiles.length === 0) genMdxRouters()
  const seen = new Map<string, { key: string; title: string }>()
  for (const item of mdxFiles) {
    if (!seen.has(item.parentPath)) {
      seen.set(item.parentPath, { key: item.parentPath, title: item.parentTitle })
    }
  }
  const order = new Map<string, number>(TOP_NAV_SLUG_ORDER.map((k, i) => [k, i]))
  const tail = TOP_NAV_SLUG_ORDER.length
  return Array.from(seen.values()).sort((a, b) => {
    const ia = order.get(a.key) ?? tail
    const ib = order.get(b.key) ?? tail
    if (ia !== ib) return ia - ib
    return a.key.localeCompare(b.key)
  })
}
