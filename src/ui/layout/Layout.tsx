import { Suspense } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { genMdxMenus, genSubMdxRouters } from '@/service/mdx-service'
import styles from './layout.module.scss'

export default function Layout(props: { type?: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = genMdxMenus()
  const currentType = props.type

  const sideItems = currentType
    ? genSubMdxRouters(currentType)
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    : []

  const pathname = location.pathname
  const isActiveTop = (key: string) => pathname === `/${key}` || pathname.startsWith(`/${key}/`)

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand} onClick={() => navigate('/')}>
            <div className={styles.avatar} />
            千禮之行
          </div>

          <input className={styles.search} placeholder="搜索文章（后续接入）" />

          <nav className={styles.nav}>
            <button className={styles.navLink} onClick={() => navigate('/')}>
              首页
            </button>
            {menus.map((m) => (
              <button
                key={m.key}
                className={`${styles.navLink} ${isActiveTop(m.key) ? styles.navLinkActive : ''}`}
                onClick={() => navigate(`/${m.key}`)}
              >
                {m.title}
              </button>
            ))}
            <button className={styles.navLink} onClick={() => window.open('https://github.com/', '_blank')}>
              github
            </button>
            <button
              className={`${styles.navLink} ${pathname.startsWith('/md/about') ? styles.navLinkActive : ''}`}
              onClick={() => navigate('/md/about')}
            >
              关于
            </button>
            <button
              className={`${styles.navLink} ${pathname.startsWith('/md/log') ? styles.navLinkActive : ''}`}
              onClick={() => navigate('/md/log')}
            >
              更新日志
            </button>
          </nav>
        </div>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          {currentType ? (
            <>
              <div className={styles.sideTitle}>文章列表</div>
              <div className={styles.sideList}>
                {sideItems.map((item) => {
                  const target = item.date ? `/${currentType}/${item.date}` : `/${currentType}`

                  // 只有第一篇文章对应 index(/type) 需要特殊高亮
                  const isIndex = item.path === `/${currentType}`
                  const isActive = isIndex ? pathname === `/${currentType}` : pathname === target

                  return (
                    <button
                      key={item.key}
                      className={`${styles.sideItem} ${isActive ? styles.sideItemActive : ''}`}
                      onClick={() => navigate(isIndex ? `/${currentType}` : target)}
                      title={item.name}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </>
          ) : null}
        </aside>
        <main className={styles.main}>
          <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

