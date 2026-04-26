import { lazy } from 'react'
import type { ComponentType } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { DEFAULT_ENTRY_SLUG } from '@/constants/page-convention'
import {
  compareArticleDateDesc,
  genMdxRouters,
  mdxInitError,
  type MdxRoute,
} from '@/service/mdx-service'
import Layout from '@/ui/layout/Layout'
import MdxLayout from '@/ui/layout/MdxLayout'

const NotFound = lazy(() => import('@/ui/status/NotFound'))
const MdxError = lazy(() => import('@/ui/status/MdxError'))


function categoryChildRoutes(sorted: MdxRoute[]): RouteObject[] {
  const indexMdx = sorted.find((m) => m.isCategoryIndex) ?? sorted[0]
  const rest = sorted.filter((m) => m !== indexMdx).sort(compareArticleDateDesc)

  const IndexEl = lazy(indexMdx.element as () => Promise<{ default: ComponentType }>)
  const children: RouteObject[] = [
    {
      index: true,
      id: `cat-index:${indexMdx.key}`,
      element: (
        <MdxLayout>
          <IndexEl />
        </MdxLayout>
      ),
    },
    ...rest.map((mdx) => {
      const Element = lazy(mdx.element as () => Promise<{ default: ComponentType }>)
      return {
        path: mdx.date,
        id: mdx.key,
        element: (
          <MdxLayout>
            <Element />
          </MdxLayout>
        ),
      }
    }),
  ]
  return children
}

const mdxRouters = (): RouteObject[] => {
  const mdxFiles = genMdxRouters()
  const byGroup = new Map<string, typeof mdxFiles>()
  for (const r of mdxFiles) {
    const list = byGroup.get(r.parentPath) ?? []
    list.push(r)
    byGroup.set(r.parentPath, list)
  }

  return Array.from(byGroup.entries()).map(([key, list]) => {
    const sorted = list.slice().sort(compareArticleDateDesc)
    return {
      path: `/${key}`,
      element: <Layout type={key} />,
      children: categoryChildRoutes(sorted),
    }
  })
}

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={`/${DEFAULT_ENTRY_SLUG}`} replace />,
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
