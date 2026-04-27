import styles from './status.module.scss'

export default function NotFound() {
  return (
    <div className={styles.statusRoot}>
      <h2 className={styles.statusTitle}>404</h2>
      <p className={styles.statusText}>Page not found.</p>
    </div>
  )
}
