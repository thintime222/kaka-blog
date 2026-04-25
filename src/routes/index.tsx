import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { genMdxRouters, mdxInitError } from '@/service/mdx-service'
import Layout from '@/ui/layout/Layout'
import MdxLayout from '@/ui/layout/MdxLayout'

const NotFound = lazy(() => import('@/ui/status/NotFound'))
const MdxError = lazy(() => import('@/ui/status/MdxError'))
const About = lazy(() => import('@/page/about/index.mdx'))
const Log = lazy(() => import('@/page/log/index.mdx'))
const Resume = lazy(() => import('@/page/resume/index.mdx'))
const MyResume = lazy(() => import('@/page/resume/resume.mdx'))

const mdxRouters = (): RouteObject[] => {
  const mdxFiles = genMdxRouters()
  const byGroup = new Map<string, typeof mdxFiles>()
  for (const r of mdxFiles) {
    const list = byGroup.get(r.parentPath) ?? []
    list.push(r)
    byGroup.set(r.parentPath, list)
  }

  return Array.from(byGroup.entries()).map(([key, list]) => {
    return {
      path: `/${key}`,
      element: <Layout type={key} />,
      children: list.map((mdx, idx) => {
        const Element = lazy(mdx.element as any)
        if (idx === 0) {
          return {
            ...mdx,
            index: true,
            path: '',
            element: (
              <MdxLayout>
                <Element />
              </MdxLayout>
            ),
          }
        }
        return {
          ...mdx,
          path: mdx.date,
          element: (
            <MdxLayout>
              <Element />
            </MdxLayout>
          ),
        }
      }),
    }
  })
}

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div style={{ padding: 24 }}>Home</div>,
      },
    ],
  },
  {
    path: '/md',
    element: <Layout />,
    children: [
      {
        path: 'about',
        element: (
          <MdxLayout>
            <About />
          </MdxLayout>
        ),
      },
      {
        path: 'log',
        element: (
          <MdxLayout>
            <Log />
          </MdxLayout>
        ),
      },
      {
        path: 'resume',
        element: (
          <MdxLayout>
            <Resume />
          </MdxLayout>
        ),
      },
      {
        path: 'myresume',
        element: (
          <MdxLayout>
            <MyResume />
          </MdxLayout>
        ),
      },
    ],
  },
  ...mdxRouters(),
  {
    path: '*',
    element: (
      <MdxLayout>
        {mdxInitError ? <MdxError message={mdxInitError} /> : <NotFound />}
      </MdxLayout>
    ),
  },
]

export default function Router() {
  return useRoutes(routeConfig)
}

