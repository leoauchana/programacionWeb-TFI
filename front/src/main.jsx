import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './layout/Layout'
import AlumnsPage from './pages/students/AlumnsPage';
import FormPage from './pages/students/FormPage';
import MainPage from './pages/MainPage';
import Login from './pages/login/Login';
import Register from './pages/login/Register'
import './index.css';
import { AuthProvider } from './context/auth.context'
import LayoutLogin from './layout/LayoutLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutLogin />,
    children: [
      {
      path: '/',
      element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }  
    ]
  },
  {
    path: '/main',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MainPage />
      },
      {
        path:'alumns',
        element: <AlumnsPage />
      },
      {
        path: 'alumns/form',
        element: <FormPage />
      }
    ]
    }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
