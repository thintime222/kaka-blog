
/** mdx-service 相对 `src/service/` 指向 page 根的路径（勿随意改，glob 与正则依赖此串） */
export const PAGE_DIR_REL_TO_SERVICE = '../page'

/**
 * 文章 glob 模式（须与 `mdx-service.ts` 里 `import.meta.glob` 的字符串完全一致）。
 * 表示「一级分类目录 + 一层 mdx」；独立页目录名见 PAGE_STANDALONE_DIR_NAMES，在 service 内过滤。
 */
export const PAGE_ARTICLE_IMPORT_GLOB = PAGE_DIR_REL_TO_SERVICE + '/*/*.mdx'

/** 文章文件名中 `YYYYMMDD` 长度 */
export const ARTICLE_DATE_LEN = 8

/** 分类 slug → 导航/侧栏展示标题 */
export const PARENT_TITLE_BY_SLUG: Record<string, string> = {
  about: '关于',
  log: '更新日志',
  front: '前端',
  end: '后端',
  tools: '工具',
  tech: '技术栈',
  component: '组件库',
}

/** 顶部导航中 MDX 分类 slug 的展示顺序（未列出的按 slug 字典序；`log` 由 Layout 固定在 GitHub 后） */
export const TOP_NAV_SLUG_ORDER = ['about'] as const

/** 更新日志走 MDX 分类目录 `log`，但主导航入口在 GitHub 之后 */
export const LOG_NAV_SLUG = 'log'

/** 无独立首页时，根路径 `/` 重定向到的分类 slug（须与 `src/page/<slug>/` 一致） */
export const DEFAULT_ENTRY_SLUG = 'about' as const

/** 不参与文章 glob 解析的目录名（如仅有 index 手写进路由） */
export const PAGE_STANDALONE_DIR_NAMES = ['resume'] as const

const standaloneSet = new Set<string>(PAGE_STANDALONE_DIR_NAMES)

export function isStandalonePageDir(name: string): boolean {
  return standaloneSet.has(name)
}
