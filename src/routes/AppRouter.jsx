import { AuthRoutes, TodoRoutes } from "./";

export const AppRouter = (status = 'checking') => {
    if (status === 'not-authenticated') {
        return AuthRoutes;
    } else {
        return TodoRoutes;
    }
};