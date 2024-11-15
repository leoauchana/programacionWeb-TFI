import ButtonComponent from '../../components/Button';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="container-login">
            <form>
                <div className="login-form login-box">
                    <label className="label-username" htmlFor="">Usuario</label>
                    <input className="input-username" type="text"/>
                    <label className="label-password" htmlFor="">Contraseña</label>
                    <input className="input-password" type="password" />
                    <ButtonComponent
                    text='Iniciar Sesión'
                    className='button-initial'
                    onClick={() => navigate('/main')}
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