import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const App = () => {

  const router = createRouter({routeTree})
  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
