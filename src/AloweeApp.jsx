import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"
import { useAuthStore } from "./hooks";
import { useEffect } from "react";

export const AloweeApp = () => {
    // const { status:authStatus } = useSelector(state => state.auth);
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if (status === 'checking') {
        console.log(status);
        return (
            <h1>Cargando...</h1>
        )
    }
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(status)) } />
}
