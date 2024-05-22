import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"

export const AloweeApp = () => {
    const routerStatus = 'authenticated'
    
    return (
        <RouterProvider router={ createBrowserRouter(AppRouter(routerStatus)) } />
    )
}
