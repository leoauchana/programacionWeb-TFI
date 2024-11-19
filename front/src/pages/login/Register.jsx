import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth.context';

const Register = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { signUp, errors: signupErrors } = useAuth();

    const handleRegister = async (values) => {
        try{
            const newUser = {
                name: values.inputNameValue,
                lastName: values.inputLastNameValue,
                userName: values.inputUserNameValue,
                password: values.inputPasswordValue
            };
            await signUp(newUser);
        } catch(err) {
            console.error(err);
        }            
    }

    return (
        <div className="container-login">
            {
                signupErrors.map((error,i) => {
                    <div className='' key={i}>
                        {error}
                    </div>
                })
            }
            <form>
                <div className="register-form register-box">
                    {
                        signupErrors && signupErrors.length > 0 && signupErrors.map((error, i) => (
                            <div className='errors-style-register' key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <div className="content-label-name-register">
                        <label htmlFor="inputNameValue">Nombre</label>
                    </div>
                    <div className="content-input-name-register">
                        <input 
                        type="text"
                        {...register('inputNameValue', {
                            required: {
                                value: true,
                                message: "Nombre es requerido"
                            },
                            maxLength:{
                                value: 45,
                                message:"Nombre debe tener menor de 45 carácteres"
                            },
                        })}/>
                    </div>
                    {
                                errors.inputNameValue && <p className='content-input-error-name'>{errors.inputNameValue?.message}</p>
                    } 
                    <div className="content-label-last-register">
                        <label htmlFor="inputLastNameValue">Apellido</label>
                    </div>
                    <div className="content-input-last-register">
                        <input 
                        type="text"
                        {...register('inputLastNameValue', {
                            required: {
                                value: true,
                                message: "Apellido es requerido"
                            },
                            maxLength:{
                                value: 45,
                                message:"Apellido debe tener menor de 45 carácteres"
                            },
                        })}/>
                    </div>
                    {
                                errors.inputLastNameValue && <p className='content-input-error-last'>{errors.inputLastNameValue?.message}</p>
                    } 
                    <div className="content-label-userName-register">
                        <label htmlFor="inputUserNameValue">Usuario</label>
                    </div>
                    <div className="content-input-userName-register">
                        <input 
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
                    </div>
                    {
                                errors.inputUserNameValue && <p className='content-input-error-userName'>{errors.inputUserNameValue?.message}</p>
                    } 
                    <div className="content-label-password-register">
                        <label htmlFor="inputPasswordValue">Contraseña</label>
                    </div>
                    <div className="content-input-password-register">
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
                                errors.inputPasswordValue && <p className='content-input-error-password'>{errors.inputPasswordValue?.message}</p>
                    } 
                    <div className="content-button-back">
                        <ButtonComponent 
                            text="Volver"
                            className='button-close'
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <div className="content-button-register">
                        <ButtonComponent
                        text="Registrarse"
                        className='button-initial'
                        onClick={handleSubmit(handleRegister)}
                        />
                    </div>
                </div>
            </form>
        </div>
    )

}

export default Register;