import './layout.css';
import {Navigate, NavLink, Outlet, useLocation} from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const Navigation = () => {
    const location = useLocation();
    const {  isAuthenticated } = useAuth();

    if(!isAuthenticated) return <Navigate to={'/'} replace/>


    return (
        <nav>
            <ul>
                <li className={location.pathname === '/main' ? 'link-selected' : ''}>
                    <NavLink to={'/main'}>
                        Pagina Principal
                    </NavLink>
                </li>
                <li className={location.pathname === '/main/alumns' || location.pathname === '/main/alumns/form' ? 'link-selected' : ''}>
                    <NavLink to={'/main/alumns'}>
                        Alumnos
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

const Layout = () => {
    return (
        <div className='layout-style'>
            <div className='layout-menu'>
                <h2>Menu</h2>
                <div className='layout-nav'>
                    <Navigation />
                </div>
            </div>
            <div className='layout-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;