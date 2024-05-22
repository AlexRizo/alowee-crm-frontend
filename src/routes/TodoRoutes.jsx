import { CalendarPage, HomePage, RequestPage } from "../todo/pages";
import { TodoLayout } from "../todo/layout/TodoLayout";

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
            }
        ]
    }
]