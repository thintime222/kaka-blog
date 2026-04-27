import type { PropsWithChildren } from 'react'
import { MDXProvider } from '@mdx-js/react'

import { mdxProviderComponents } from './mdx-default-components'
import styles from './mdx.module.scss'

export default function MdxLayout(props: PropsWithChildren) {
  return (
    <MDXProvider components={mdxProviderComponents}>
      <article className={styles.mdx}>{props.children}</article>
    </MDXProvider>
  )
}

