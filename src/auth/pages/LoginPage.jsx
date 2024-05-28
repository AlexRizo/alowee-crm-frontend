import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css'
import Swal from 'sweetalert2';

const loginFormFields = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    const { startLogin, errorMessage } = useAuthStore();

    const { email, password, onInputChange } = useForm(loginFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin(email, password);
    };

    useEffect(() => {
        if(errorMessage !== undefined) {
            Swal.fire('Error al iniciar sesión', errorMessage, 'error');
        }
    }, [errorMessage]);
    
    return (
        <div className="border border-violet-400/20 bg-gray-500/10 w-96 m-auto py-7 px-6 mt-20">
            <h1 className="text-2xl text-center mb-4">Inicia Sesión</h1>
            <form onSubmit={ loginSubmit }>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor='email'>Correo electrónico</label>
                    <input className="p-2 text-gray-400 bg-black/40 focus:outline-none focus:ring focus:ring-violet-700 rounded transition focus:text-white" type='email' id='email' name='email' value={ email } onChange={ onInputChange } required placeholder='ejemplo@email.com'/>
                </div>
                <div className='flex flex-col gap-1 mb-3'>
                    <label htmlFor='password'>Contraseña</label>
                    <input className="p-2 text-gray-400 bg-black/40 focus:outline-none focus:ring focus:ring-violet-700 rounded transition focus:text-white" type='password' id='password' name='password' value={ password } onChange={ onInputChange } required placeholder='***********'/>
                </div>
                <p className='mb-5 text-violet-200 underline cursor-pointer w-max'>¿Olvidaste tu contraseña?</p>
                <button type='submit' className="p-2 text-center w-full bg-violet-500 hover:bg-violet-600 transition rounded-md focus:bg-violet-700">
                    Ingresar
                </button>
            </form>
        </div>
    )
}
