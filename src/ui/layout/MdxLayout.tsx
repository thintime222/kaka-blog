import type { PropsWithChildren } from 'react'
import { MDXProvider } from '@mdx-js/react'

import styles from './mdx.module.scss'
import { CodeBlock, InlineCode, MdCard, MdTitle } from '@/ui-component'

const components = {
  CodeBlock,
  MdTitle,
  MdCard,
  code: InlineCode,
}

export default function MdxLayout(props: PropsWithChildren) {
  return (
    <MDXProvider components={components}>
      <article className={styles.mdx}>{props.children}</article>
    </MDXProvider>
  )
}

