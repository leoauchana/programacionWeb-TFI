import { useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import './pagesStyles.css';
import ButtonComponent from "../components/Button";
import { useAuth } from "../context/auth.context";

const MainPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth()
    return (
        <PageContent
        headerTitle="Pagina Principal"
        actions={[
            <ButtonComponent key={'close'}
            text="Cerrar Sesión"
            className='button-close'
            onClick={() => {
                logout()
                navigate('/');
            }}
            />
        ]}
        >
            <CardMain/>
        </PageContent>
    )
};

const CardMain = () => {
    const navigate = useNavigate();
    return (
        <div className="card-style">
            <h1 className="title-main" onClick={() => navigate('/main/alumns')}>Módulo Alumnos</h1>
        </div>
    )
}

export default MainPage;