export type MdxRoute = {
  parentPath: string
  parentTitle: string
  path: string
  key: string
  name: string
  date: string
  element: () => Promise<unknown>
  index?: boolean
}

const mdxs = import.meta.glob('../page/md/**/*.mdx')
const safeMdxs = Object.fromEntries(
  Object.entries(mdxs).filter(([k]) => {
    // 这些文章里存在“可执行的 demo 代码/require/import 非本项目依赖”，会导致白屏；先跳过
    // 后续可以按需把文章改成纯展示代码再放开
    return (
      !k.includes('20220801@echarts绘制geo地图.mdx') &&
      !k.includes('20220925@vite 打包优化之：懒加载和分包.mdx') &&
      !k.includes('20221117@iconfont：使用symbol做Icon组件.mdx')
    )
  })
)

export let mdxFiles: MdxRoute[] = []
export let mdxInitError: string | null = null

// 解析 md 文件夹下的 markdown 文件，生成路由（约定式命名）
// 约定：
// - 目录：src/page/md/<parentPath>_<parentTitle>/
// - 文件：<date>@<name>.mdx 例如 20220507@xxx.mdx
export const genMdxRouters = (): MdxRoute[] => {
  try {
    let cacheParentPath = ''
    if (mdxFiles.length === 0) {
      mdxInitError = null
      mdxFiles = Object.keys(safeMdxs)
        .map((key) => {
          const reg = new RegExp('../page/md/(.*)/(.*).mdx')
          const pattern = key.replace(reg, (_regexp, r1, r2) => `${r1}@${r2}`)
          const arr = pattern.split('@')
          const group = arr[0] || ''
          const date = arr[1] || ''
          const name = arr[2] || ''

          const parentPath = group.split('_')[0] || ''
          const parentTitle = group.split('_')[1] || parentPath

          const loader = safeMdxs[key]
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

          // 每个分类的第一篇文章会在路由层做 index 处理，这里仅保持与原逻辑一致
          if (parentPath !== cacheParentPath) {
            cacheParentPath = parentPath
            params.path = `/${parentPath}`
          }

          return params
        })
        .filter((x): x is MdxRoute => Boolean(x))
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

export const genMdxMenus = () => {
  if (mdxFiles.length === 0) genMdxRouters()
  const seen = new Map<string, { key: string; title: string }>()
  for (const item of mdxFiles) {
    if (!seen.has(item.parentPath)) {
      seen.set(item.parentPath, { key: item.parentPath, title: item.parentTitle })
    }
  }
  return Array.from(seen.values())
}

