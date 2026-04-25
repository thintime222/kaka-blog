import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'github-markdown-css/github-markdown.css'
import './index.css'
import Router from '@/routes'
import { genMdxRouters } from '@/service/mdx-service'

genMdxRouters()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
