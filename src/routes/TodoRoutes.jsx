import { CalendarPage, EventRequestPage, HomePage, RequestPage } from "../todo/pages";
import { TodoLayout } from "../todo/layout/TodoLayout";
import { Navigate } from "react-router-dom";

export const TodoRoutes = [
    {
        path: '/',
        element: <TodoLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/calendar',
                element: <CalendarPage />,
            },
            {
                path: '/requests',
                element: <RequestPage />,
            },
            {
                path: '/requests/new-event',
                element: <EventRequestPage />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to={'/'} />
    }
]