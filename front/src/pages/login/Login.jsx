import ButtonComponent from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const { signIn } = useAuth();
    const [errorsLogin, setErrorsLogin] = useState([]);


    const handleLogin = async (values) => {
        try{
            const body = {
                userName: values.inputUserNameValue,
                password: values.inputPasswordValue
            };
                const response = await fetch(`/api/login`,{
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(body)
                });
                if(response.ok){
                    const newUser = await response.json();
                    console.log(newUser);
                    signIn(newUser);
                    window.alert('¡Inicio de Sessión!');
                } else {
                    const errorData = await response.json();
                    window.alert(`${errorData.message}`);
                }
        }catch(err){
            console.error(err)
            setErrorsLogin(err.response.data);
        }
    }

    return (
        <div className="container-login">
            {
                errorsLogin.map((error,i) => {
                    <div className='' key={i}>
                        {error}
                    </div>
                })
            }
            <form>
                <div className="login-form login-box">
                    <label className="label-username" htmlFor="inputUserNameValue">Usuario</label>
                    <input className="input-username" 
                    type="text"
                    {...register('inputUserNameValue', {
                        required: {
                            value: true,
                            message: "Usuario es requerido"
                        },
                        maxLength:{
                            value: 45,
                            message:"Usuario debe tener menor de 45 carácteres"
                        },
                    })}
                    />
                    <label className="label-password" htmlFor="inputPasswordValue">Contraseña</label>
                    <input className="input-password" 
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