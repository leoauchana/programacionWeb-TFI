import { useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import './pagesStyles.css';

const MainPage = () => {

    
    return (
        <PageContent
        headerTitle="Pagina Principal">
            <CardMain/>
        </PageContent>
    )
};

const CardMain = () => {
    const navigate = useNavigate();
    return (
        <div className="card-style">
            <h1 className="title-main" onClick={() => navigate('/alumns')}>Módulo Alumnos</h1>
        </div>
    )
}

export default MainPage;