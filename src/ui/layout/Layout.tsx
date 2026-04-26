import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOG_NAV_SLUG } from '@/constants/page-convention'
import {
  compareArticleDateDesc,
  genMdxMenus,
  genSubMdxRouters,
  searchArticles,
} from '@/service/mdx-service'
import type { MdxRoute } from '@/service/mdx-service'
import avatarSvg from './avator.svg'
import styles from './layout.module.scss'

export default function Layout(props: { type?: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = genMdxMenus().filter((m) => m.key !== LOG_NAV_SLUG)
  const currentType = props.type

  const sideItems = currentType
    ? genSubMdxRouters(currentType).slice().sort(compareArticleDateDesc)
    : []

  const categoryNewest = sideItems[0]
  const categoryNewestDate = categoryNewest?.date
  const pathname = location.pathname
  /** 只用首段路径匹配 slug，避免 `startsWith` 边界问题，且与各分类 `/slug`、`/slug/日期` 一致 */
  const topNavSlug = useMemo(() => pathname.replace(/^\/+/, '').split('/')[0] ?? '', [pathname])
  const isActiveTop = (key: string) => topNavSlug === key

  const [searchQ, setSearchQ] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchWrapRef = useRef<HTMLDivElement>(null)

  const searchHits = useMemo(() => searchArticles(searchQ), [searchQ])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = searchWrapRef.current
      if (el && !el.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    setSearchOpen(false)
    setSearchQ('')
  }, [pathname])

  /** 首篇规范 URL 为 `/分类`：若直接打开 `/分类/首篇日期`，与 index 对齐并 replace */
  useEffect(() => {
    if (!currentType || !categoryNewest?.isCategoryIndex || !categoryNewestDate) return
    const dated = `/${currentType}/${categoryNewestDate}`
    if (pathname === dated) {
      navigate(`/${currentType}`, { replace: true })
    }
  }, [categoryNewest?.isCategoryIndex, categoryNewestDate, currentType, navigate, pathname])

  const goArticle = (r: MdxRoute) => {
    navigate(r.path)
    setSearchOpen(false)
    setSearchQ('')
  }

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchOpen(false)
      ;(e.target as HTMLInputElement).blur()
    }
    if (e.key === 'Enter' && searchHits[0]) {
      e.preventDefault()
      goArticle(searchHits[0])
    }
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.avatarBlock}>
              <img className={styles.avatar} src={avatarSvg} alt="" width={30} height={30} />
            </div>
            <div>
              个人技术博客
            </div>
          </div>

          <div className={styles.searchWrap} ref={searchWrapRef}>
            <input
              className={styles.search}
              type="search"
              placeholder="搜索文章标题、分类、日期…"
              value={searchQ}
              autoComplete="off"
              aria-expanded={searchOpen && Boolean(searchQ.trim())}
              aria-controls="layout-search-results"
              onChange={(e) => {
                setSearchQ(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => {
                if (searchQ.trim()) setSearchOpen(true)
              }}
              onKeyDown={onSearchKeyDown}
            />
            {searchOpen && searchQ.trim() ? (
              <ul id="layout-search-results" className={styles.searchDropdown} role="listbox">
                {searchHits.length === 0 ? (
                  <li className={styles.searchEmpty}>未找到匹配文章</li>
                ) : (
                  searchHits.map((r) => (
                    <li key={r.key} role="presentation">
                      <button
                        type="button"
                        role="option"
                        className={styles.searchHit}
                        onClick={() => goArticle(r)}
                      >
                        <span className={styles.searchHitTitle}>{r.name}</span>
                        <span className={styles.searchHitMeta}>
                          {r.parentTitle} · {r.date}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </div>

          <nav className={styles.nav}>
            <div className={styles.navPrimary}>
              {menus.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`${styles.navLink} ${isActiveTop(m.key) ? styles.navLinkActive : ''}`}
                  onClick={() => navigate(`/${m.key}`)}
                >
                  {m.title}
                </button>
              ))}
            </div>
            <div className={styles.navUtil}>
              <button
                type="button"
                className={styles.navLink}
                onClick={() => window.open('https://github.com/', '_blank')}
              >
                GitHub
              </button>
              <button
                type="button"
                className={`${styles.navLink} ${isActiveTop(LOG_NAV_SLUG) ? styles.navLinkActive : ''}`}
                onClick={() => navigate(`/${LOG_NAV_SLUG}`)}
              >
                更新日志
              </button>
            </div>
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

                  const isIndex = Boolean(item.isCategoryIndex)
                  const isActive = isIndex
                    ? pathname === `/${currentType}` || pathname === `/${currentType}/${item.date}`
                    : pathname === target

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
          <Suspense
            key={pathname}
            fallback={<div className={styles.mainOutletFallback}>Loading…</div>}
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
