import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css'
import Swal from 'sweetalert2';
 import '@sweetalert2/themes/dark/dark.scss';

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
        <div className='auth-card'>
            <h1>Inicia Sesión</h1>
            <form onSubmit={ loginSubmit }>
                <div className='form-group'>
                    <label htmlFor='email'>Correo electrónico</label>
                    <input type='email' id='email' name='email' value={ email } onChange={ onInputChange } required placeholder='ejemplo@email.com'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' name='password' value={ password } onChange={ onInputChange } required placeholder='***********'/>
                </div>
                <p className='mb-5 text-violet-200 underline cursor-pointer w-max'>¿Olvidaste tu contraseña?</p>
                <button type='submit' className='p-2 text-center w-full bg-violet-500 hover:bg-violet-600 transition rounded-md focus:bg-violet-700'>
                    Ingresar
                </button>
            </form>
        </div>
    )
}
