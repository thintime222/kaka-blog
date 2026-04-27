import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Router from '@/routes'
import './styles/global.scss' // 引入全局样式

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
      </BrowserRouter>
      <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
