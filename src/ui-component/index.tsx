import type { PropsWithChildren, ReactNode } from 'react'

export function CodeBlock(props: { component?: string; children?: ReactNode }) {
  const code = typeof props.component === 'string' ? props.component : props.children
  return (
    <pre>
      <code>{code}</code>
    </pre>
  )
}

export function InlineCode(props: PropsWithChildren) {
  return <code>{props.children}</code>
}

export function MdTitle(props: PropsWithChildren) {
  return <h2>{props.children}</h2>
}

export function MdCard(props: PropsWithChildren) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 6,
        margin: '12px 0',
      }}
    >
      {props.children}
    </div>
  )
}

