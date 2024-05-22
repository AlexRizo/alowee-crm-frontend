import { AuthRoutes, TodoRoutes } from "./";

export const AppRouter = (status = 'checking') => {

    console.log(status);
    if (status === 'not-authenticated') {
        return AuthRoutes;
    } else {
        return TodoRoutes;
    }
};