import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { todoApi } from "../api";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const startLogin = async(email, password) => {
        dispatch(onChecking());

        try {
            const { data } = await todoApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.tkn);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, email: data.email }));
        } catch (error) {
            console.log(error);

            dispatch(onLogout(error.response.data?.message ||
                Object.values(error.response.data?.errors).map((error) => error.msg).join('<br/>') ||
                'Error desconocido'
            ));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    };

    return {
        // Properties
        status,
        user,
        errorMessage,

        // Functions
        startLogin,
    };
};