import { AuthRoutes, TodoRoutes } from "./";

export const AppRouter = (status = 'checking') => {
    if (status === 'authenticated') {
        return TodoRoutes;
    } else {
        return AuthRoutes;
    }
};