import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button";


const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="container-login">
            <form>
                <div className="register-form register-box">
                    <div className="content-label-name-register">
                        <label htmlFor="">Nombre</label>
                    </div>
                    <div className="content-input-name-register">
                        <input type="text"/>
                    </div>
                    <div className="content-label-last-register">
                        <label htmlFor="">Apellido</label>
                    </div>
                    <div className="content-input-last-register">
                        <input type="text"/>
                    </div>
                    <div className="content-label-userName-register">
                        <label htmlFor="">Usuario</label>
                    </div>
                    <div className="content-input-userName-register">
                        <input type="text"/>
                    </div>
                    <div className="content-label-password-register">
                        <label htmlFor="">Contraseña</label>
                    </div>
                    <div className="content-input-password-register">
                        <input type="password" />
                    </div>
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
                        onClick={() => navigate(-1)}
                        />
                    </div>
                </div>
            </form>
        </div>
    )

}

export default Register;