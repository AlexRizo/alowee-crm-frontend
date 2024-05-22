import { LoginPage } from "../auth/pages/LoginPage";

export const AuthRoutes = [
    {
        path: '/auth',
        element: <LoginPage />,
    },
    {
        path: '/*',
        element: <LoginPage />,
    }
]