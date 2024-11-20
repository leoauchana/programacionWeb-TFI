import ButtonComponent from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth.context';

const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { signIn, errors: signinErrors } = useAuth();


    const handleLogin = async (values) => {
        try{
            const user = {
                userName: values.inputUserNameValue,
                password: values.inputPasswordValue
            };
            console.log(user);
            const validated = await signIn(user);
            if(validated) navigate('/main')
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className="container-login">
            <form>
                    {
                        signinErrors && signinErrors.length > 0 && signinErrors.map((error, i) => (
                            <div className='errors-style-login' key={i}>
                                {error}
                            </div>
                        ))
                    }
                <div className="login-form login-box">
                    <h2>Login</h2>
                    <div className="content-label-userName-login">
                        <label htmlFor="inputUserNameValue">Usuario</label>
                    </div>
                    <div className="content-input-userName-login">
                        <input 
                        type="text"
                        autoComplete='off'
                        {...register('inputUserNameValue', {
                            required: {
                                value: true,
                                message: "Usuario es requerido"
                            },
                            maxLength:{
                                value: 45,
                                message:"Usuario debe tener menor de 45 carácteres"
                            },
                            minLength: {
                                value: 5,
                                message:"Usuario debe tener mas de 5 caracteres"
                            }
                        })}
                        />
                    </div>
                    {
                                errors.inputUserNameValue && <p className='content-error-userName-login'>{errors.inputUserNameValue?.message}</p>
                    } 
                    <div className="content-label-password-login">
                        <label htmlFor="inputPasswordValue">Contraseña</label>
                    </div>
                    <div className="content-input-password-login">
                        <input 
                        type="password" 
                        {...register('inputPasswordValue', {
                            required: {
                                value: true,
                                message: "Contraseña es requerido"
                            },
                            maxLength:{
                                value: 50,
                                message:"Contraseña debe tener menor de 50 carácteres"
                            },
                        })}
                        />
                    </div>
                    {
                                errors.inputPasswordValue && <p className='content-error-password-login'>{errors.inputPasswordValue?.message}</p>
                    } 
                    <ButtonComponent
                    text='Iniciar Sesión'
                    className='button-initial'
                    onClick={handleSubmit(handleLogin)}
                    >
                    </ButtonComponent >
                    <ButtonComponent
                    text='Registrarse'
                    className='button-register'
                    onClick={() => navigate('/register')}
                    >
                        
                    </ButtonComponent >
                    
                </div>
            </form>
        </div>
    )


}

export default Login;