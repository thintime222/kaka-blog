import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react'

import styles from './mdx.module.scss'

function cn(...parts: (string | undefined | false | null)[]) {
  return parts.filter(Boolean).join(' ')
}

function MdxH1(props: ComponentPropsWithoutRef<'h1'>) {
  const { className, ...rest } = props
  return <h1 {...rest} className={cn(styles.mdxH1, className)} />
}

function MdxH2(props: ComponentPropsWithoutRef<'h2'>) {
  const { className, ...rest } = props
  return <h2 {...rest} className={cn(styles.mdxH2, className)} />
}

function MdxH3(props: ComponentPropsWithoutRef<'h3'>) {
  const { className, ...rest } = props
  return <h3 {...rest} className={cn(styles.mdxH3, className)} />
}

function MdxH4(props: ComponentPropsWithoutRef<'h4'>) {
  const { className, ...rest } = props
  return <h4 {...rest} className={cn(styles.mdxH4, className)} />
}

function MdxH5(props: ComponentPropsWithoutRef<'h5'>) {
  const { className, ...rest } = props
  return <h5 {...rest} className={cn(styles.mdxH5, className)} />
}

function MdxH6(props: ComponentPropsWithoutRef<'h6'>) {
  const { className, ...rest } = props
  return <h6 {...rest} className={cn(styles.mdxH6, className)} />
}

function MdxHr(props: ComponentPropsWithoutRef<'hr'>) {
  const { className, ...rest } = props
  return <hr {...rest} className={cn(styles.mdxHr, className)} />
}

function MdxP(props: ComponentPropsWithoutRef<'p'>) {
  const { className, ...rest } = props
  return <p {...rest} className={cn(styles.mdxP, className)} />
}

function MdxA(props: ComponentPropsWithoutRef<'a'>) {
  const { className, href, ...rest } = props
  const base = href ? styles.mdxA : cn(styles.mdxA, styles.mdxAPlain)
  return <a {...rest} href={href} className={cn(base, className)} />
}

function MdxStrong(props: ComponentPropsWithoutRef<'strong'>) {
  const { className, ...rest } = props
  return <strong {...rest} className={cn(styles.mdxStrong, className)} />
}

function MdxB(props: ComponentPropsWithoutRef<'b'>) {
  const { className, ...rest } = props
  return <b {...rest} className={cn(styles.mdxStrong, className)} />
}

function MdxEm(props: ComponentPropsWithoutRef<'em'>) {
  const { className, ...rest } = props
  return <em {...rest} className={cn(styles.mdxEm, className)} />
}

function MdxDfn(props: ComponentPropsWithoutRef<'dfn'>) {
  const { className, ...rest } = props
  return <dfn {...rest} className={cn(styles.mdxEm, className)} />
}

function MdxMark(props: ComponentPropsWithoutRef<'mark'>) {
  const { className, ...rest } = props
  return <mark {...rest} className={cn(styles.mdxMark, className)} />
}

function MdxSmall(props: ComponentPropsWithoutRef<'small'>) {
  const { className, ...rest } = props
  return <small {...rest} className={cn(styles.mdxSmall, className)} />
}

function MdxSub(props: ComponentPropsWithoutRef<'sub'>) {
  const { className, ...rest } = props
  return <sub {...rest} className={cn(styles.mdxSub, className)} />
}

function MdxSup(props: ComponentPropsWithoutRef<'sup'>) {
  const { className, ...rest } = props
  return <sup {...rest} className={cn(styles.mdxSup, className)} />
}

function MdxImg(props: ComponentPropsWithoutRef<'img'>) {
  const { className, ...rest } = props
  return <img {...rest} className={cn(styles.mdxImg, className)} />
}

function MdxBlockquote(props: ComponentPropsWithoutRef<'blockquote'>) {
  const { className, ...rest } = props
  return <blockquote {...rest} className={cn(styles.mdxBlockquote, className)} />
}

function MdxUl(props: ComponentPropsWithoutRef<'ul'>) {
  const { className, ...rest } = props
  return <ul {...rest} className={cn(styles.mdxUl, className)} />
}

function MdxOl(props: ComponentPropsWithoutRef<'ol'>) {
  const { className, ...rest } = props
  return <ol {...rest} className={cn(styles.mdxOl, className)} />
}

function MdxLi(props: ComponentPropsWithoutRef<'li'>) {
  const { className, ...rest } = props
  return <li {...rest} className={cn(styles.mdxLi, className)} />
}

function MdxDl(props: ComponentPropsWithoutRef<'dl'>) {
  const { className, ...rest } = props
  return <dl {...rest} className={cn(styles.mdxDl, className)} />
}

function MdxDt(props: ComponentPropsWithoutRef<'dt'>) {
  const { className, ...rest } = props
  return <dt {...rest} className={cn(styles.mdxDt, className)} />
}

function MdxDd(props: ComponentPropsWithoutRef<'dd'>) {
  const { className, ...rest } = props
  return <dd {...rest} className={cn(styles.mdxDd, className)} />
}

function MdxKbd(props: ComponentPropsWithoutRef<'kbd'>) {
  const { className, ...rest } = props
  return <kbd {...rest} className={cn(styles.mdxKbd, className)} />
}

function MdxSamp(props: ComponentPropsWithoutRef<'samp'>) {
  const { className, ...rest } = props
  return <samp {...rest} className={cn(styles.mdxSamp, className)} />
}

/** 行内 / 代码块内 `code`：由 `className` 是否含 `language-` 区分 */
export function MdxCode(props: ComponentPropsWithoutRef<'code'>) {
  const { className, ...rest } = props
  const fenced = /language-[\w-]+/.test(String(className ?? ''))
  if (fenced) {
    return <code {...rest} className={cn(styles.mdxPreCode, className)} />
  }
  return <code {...rest} className={cn(styles.mdxCodeInline, className)} />
}

export const InlineCode = MdxCode

function MdxPre(props: ComponentPropsWithoutRef<'pre'>) {
  const { className, ...rest } = props
  return <pre {...rest} className={cn(styles.mdxPre, className)} />
}

function MdxTable(props: ComponentPropsWithoutRef<'table'>) {
  const { className, ...rest } = props
  return <table {...rest} className={cn(styles.mdxTable, className)} />
}

function MdxThead(props: ComponentPropsWithoutRef<'thead'>) {
  const { className, ...rest } = props
  return <thead {...rest} className={className} />
}

function MdxTbody(props: ComponentPropsWithoutRef<'tbody'>) {
  const { className, ...rest } = props
  return <tbody {...rest} className={className} />
}

function MdxTr(props: ComponentPropsWithoutRef<'tr'>) {
  const { className, ...rest } = props
  return <tr {...rest} className={cn(styles.mdxTr, className)} />
}

function MdxTh(props: ComponentPropsWithoutRef<'th'>) {
  const { className, ...rest } = props
  return <th {...rest} className={cn(styles.mdxTh, className)} />
}

function MdxTd(props: ComponentPropsWithoutRef<'td'>) {
  const { className, ...rest } = props
  return <td {...rest} className={cn(styles.mdxTd, className)} />
}

function MdxDetails(props: ComponentPropsWithoutRef<'details'>) {
  const { className, ...rest } = props
  return <details {...rest} className={cn(styles.mdxDetails, className)} />
}

function MdxSummary(props: ComponentPropsWithoutRef<'summary'>) {
  const { className, ...rest } = props
  return <summary {...rest} className={cn(styles.mdxSummary, className)} />
}

/** MDX 中偶见 `<center>`：用 div 承接，保留 `style` 等动态属性 */
function MdxCenter(props: ComponentPropsWithoutRef<'center'>) {
  const { className, children, style, id } = props
  return (
    <div id={id} style={style} className={cn(styles.mdxCenter, className)}>
      {children}
    </div>
  )
}

export function CodeBlock(props: { component?: string; children?: ReactNode }) {
  const code = typeof props.component === 'string' ? props.component : props.children
  return (
    <pre className={styles.mdxPre}>
      <code className={styles.mdxPreCode}>{code}</code>
    </pre>
  )
}

export function MdTitle(props: PropsWithChildren<{ text?: string; className?: string }>) {
  const { text, children, className } = props
  return <h2 className={cn(styles.mdxH2, className)}>{text ?? children}</h2>
}

export function MdCard(props: PropsWithChildren<{ className?: string }>) {
  const { children, className } = props
  return <div className={cn(styles.mdxCard, className)}>{children}</div>
}

export const mdxProviderComponents: MDXComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  hr: MdxHr,
  p: MdxP,
  a: MdxA,
  strong: MdxStrong,
  b: MdxB,
  em: MdxEm,
  dfn: MdxDfn,
  mark: MdxMark,
  small: MdxSmall,
  sub: MdxSub,
  sup: MdxSup,
  img: MdxImg,
  blockquote: MdxBlockquote,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  dl: MdxDl,
  dt: MdxDt,
  dd: MdxDd,
  kbd: MdxKbd,
  samp: MdxSamp,
  code: MdxCode,
  pre: MdxPre,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  details: MdxDetails,
  summary: MdxSummary,
  center: MdxCenter,
  CodeBlock,
  MdTitle,
  MdCard,
}
