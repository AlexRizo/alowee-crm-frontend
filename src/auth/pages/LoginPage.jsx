import { useEffect, useMemo } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import { fireModal } from '../../helpers';
import './loginPage.css'

const loginFormFields = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    const { status, startLogin, errorMessage } = useAuthStore();

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const { email, password, onInputChange } = useForm(loginFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin(email, password);
    };

    useEffect(() => {
        if(errorMessage !== undefined) {
            fireModal({ title: 'Error al iniciar sesión', text: errorMessage, icon: 'error' })
        }
    }, [errorMessage]);
    
    return (
        <div className="max-w-md m-auto mt-20">
            <h1 className="text-3xl font-bold text-center mb-1">Iniciar Sesión</h1>
            <p className='text-center mb-6 text-gray-600'>Ingresa tus datos para acceder al sistema</p>
            <form onSubmit={ loginSubmit } className="font-light">
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor='email'>Correo electrónico</label>
                    <input className="p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-violet-700 rounded transition" type='email' id='email' name='email' value={ email } onChange={ onInputChange } required placeholder='ejemplo@email.com'/>
                </div>
                <div className='flex flex-col gap-1 mb-3'>
                    <label htmlFor='password'>Contraseña</label>
                    <input className="p-2 placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-violet-700 rounded transition" type='password' id='password' name='password' value={ password } onChange={ onInputChange } required placeholder='***********'/>
                </div>
                <button disabled={ isCheckingAuthentication } type='submit' className="p-2 text-center w-full bg-violet-500 hover:bg-violet-600 text-white transition rounded-md focus:bg-violet-700">
                    Ingresar
                </button>
                <p className='mt-3 font-normal text-center text-violet-500 underline cursor-pointer'>¿Olvidaste tu contraseña?</p>
            </form>
        </div>
    )
}
