import { 
    CalendarPage,
    PrintRequestPage,
    EventRequestPage,
    HomePage,
    PostRequestPage,
    RequestPage,
    DigitalRequestPage,
    TshirtRequestPage,
    OtherRequestPage,
    TaskPage
} from "../todo/pages";
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
            },
            {
                path: '/requests/new-post/',
                element: <PostRequestPage />
            },
            {
                path: '/requests/new-design/print',
                element: <PrintRequestPage />
            },
            {
                path: '/requests/new-design/digital',
                element: <DigitalRequestPage />
            },
            {
                path: '/requests/new-design/t-shirt',
                element: <TshirtRequestPage />
            },
            {
                path: '/requests/new-design/other',
                element: <OtherRequestPage />
            },
            {
                path: '/task/:id/preview',
                element: <TaskPage />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to={'/'} />
    }
]