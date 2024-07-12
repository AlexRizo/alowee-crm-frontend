import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { todoApi } from "../api";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, team, errorMessage } = useSelector((state) => state.auth);

    const startLogin = async(email, password) => {
        dispatch(onChecking());

        try {
            const { data } = await todoApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.tkn);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                },
                team: {
                    tid: data.team.tid,
                    team: data.team.name,
                    color: data.team.color
                }
            }));
        } catch (error) {
            console.error({ error });

            dispatch(onLogout(error.response?.data?.message ||
                Object.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                'Error desconocido'
            ));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await todoApi.get('/auth/renew');
            localStorage.setItem('token', data.tkn);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                },
                team: {
                    tid: data.team.tid,
                    team: data.team.name,
                    color: data.team.color
                }
            }));
        } catch (error) {
            console.error({ error });
            startLogout();
        }
    };

    return {
        // Properties
        status,
        user,
        team,
        errorMessage,

        // Functions
        startLogin,
        startLogout,
        checkAuthToken
    };
};