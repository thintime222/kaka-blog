/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}

declare module '@/content/blog-theme.mdx' {
  import type { ComponentType } from 'react'
  /** 默认主题色，与 `index.css` 里 `--blog-accent` 初始值保持一致 */
  export const blogAccentDefault: string
  const MDXComponent: ComponentType
  export default MDXComponent
}

