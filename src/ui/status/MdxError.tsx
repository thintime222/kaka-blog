import styles from './status.module.scss'

export default function MdxError(props: { message?: string }) {
  return (
    <div className={styles.statusRoot}>
      <h2 className={styles.statusTitle}>MDX 渲染出错</h2>
      <p className={styles.statusText}>
        该分类或文章引用了当前项目不存在的依赖/文件（例如原 yaolx 项目里的 util、asset、第三方库等）。
      </p>
      <pre className={styles.statusPre}>
        <code className={styles.statusPreCode}>{props.message || 'Unknown error'}</code>
      </pre>
      <p className={styles.statusText}>
        你把报错页面对应的 mdx 文件路径告诉我，我可以把那篇文章里“可执行代码块”改成纯展示代码，避免运行时白屏。
      </p>
    </div>
  )
}
