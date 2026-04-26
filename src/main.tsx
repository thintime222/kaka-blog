import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BLOG_ACCENT_STORAGE_KEY } from '@/constants/page-convention'
import { blogAccentDefault } from '@/content/blog-theme.mdx'
import Router from '@/routes'
import './styles/global.scss' // 引入全局样式

try {
  const raw = localStorage.getItem(BLOG_ACCENT_STORAGE_KEY)
  if (raw && /^#[0-9A-Fa-f]{6}$/.test(raw)) {
    document.documentElement.style.setProperty('--blog-accent', raw)
  } else {
    document.documentElement.style.setProperty('--blog-accent', blogAccentDefault)
  }
} catch {
  document.documentElement.style.setProperty('--blog-accent', blogAccentDefault)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
      </BrowserRouter>
      <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
