import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"
import { useAuthStore } from "./hooks";
import { useEffect } from "react";
import { LoadingComponent } from "./todo/components";

export const AloweeApp = () => {
    // const { status:authStatus } = useSelector(state => state.auth);
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (<LoadingComponent />);
    }
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(status)) } />
}
