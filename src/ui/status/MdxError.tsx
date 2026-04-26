export default function MdxError(props: { message?: string }) {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>MDX 渲染出错</h2>
      <p style={{ opacity: 0.8 }}>
        该分类或文章引用了当前项目不存在的依赖/文件（例如原 yaolx 项目里的 util、asset、第三方库等）。
      </p>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflow: 'auto',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <code>{props.message || 'Unknown error'}</code>
      </pre>
      <p style={{ opacity: 0.8 }}>
        你把报错页面对应的 mdx 文件路径告诉我，我可以把那篇文章里“可执行代码块”改成纯展示代码，避免运行时白屏。
      </p>
    </div>
  )
}

