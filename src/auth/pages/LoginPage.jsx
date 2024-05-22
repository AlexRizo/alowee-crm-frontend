import './loginPage.css'

export const LoginPage = () => {
    return (
        <div className='auth-card'>
            <h1>Inicia Sesión</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='email'>Correo electrónico</label>
                    <input type='email' id='email' required placeholder='ejemplo@email.com'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' id='password' required placeholder='***********'/>
                </div>
                <p className='mb-5 text-violet-200 underline cursor-pointer w-max'>¿Olvidaste tu contraseña?</p>
                <button type='submit' className='p-2 text-center w-full bg-violet-500 hover:bg-violet-600 transition rounded-md focus:bg-violet-700'>
                    Ingresar
                </button>
            </form>
        </div>
    )
}
