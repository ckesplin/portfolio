import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}
