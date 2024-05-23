import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { AppRouter } from "./routes"
import { store } from "./store"

export const AloweeApp = () => {
    const routerStatus = 'not-authenticated'
    
    return (
        <Provider store={ store }>
            <RouterProvider router={ createBrowserRouter(AppRouter(routerStatus)) } />
        </Provider>
    )
}
