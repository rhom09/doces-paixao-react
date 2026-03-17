import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import App from '@/App'

// Lazy-loaded pages
const CardapioPage   = lazy(() => import('@/pages/CardapioPage'))
const ProdutoPage    = lazy(() => import('@/pages/ProdutoPage'))
const EncomendaPage  = lazy(() => import('@/pages/EncomendaPage'))
const SobrePage      = lazy(() => import('@/pages/SobrePage'))
const NotFoundPage   = lazy(() => import('@/pages/NotFoundPage'))

// Loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl animate-bounce">🧁</div>
        <p className="text-[0.9rem] text-muted">Carregando...</p>
      </div>
    </div>
  )
}

// ScrollToTop as a layout component
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <ScrollToTop />,
    children: [
      { index: true, path: '/',          element: <App /> },
      { path: '/cardapio',               element: <Suspense fallback={<PageLoader />}><CardapioPage /></Suspense> },
      { path: '/produto/:id',            element: <Suspense fallback={<PageLoader />}><ProdutoPage /></Suspense> },
      { path: '/encomenda',              element: <Suspense fallback={<PageLoader />}><EncomendaPage /></Suspense> },
      { path: '/sobre',                  element: <Suspense fallback={<PageLoader />}><SobrePage /></Suspense> },
      { path: '*',                       element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
