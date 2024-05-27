import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppRouter } from "./routes"

export const AloweeApp = () => {
    const { status:authStatus } = useSelector(state => state.auth);
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(authStatus)) } />
}
