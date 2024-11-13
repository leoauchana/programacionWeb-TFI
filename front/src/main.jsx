import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './layout/Layout'
import AlumnsPage from './pages/students/AlumnsPage';
import FormPage from './pages/students/FormPage';
import MainPage from './pages/MainPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path:'/alumns',
        element: <AlumnsPage />
      },
      {
        path: '/alumns/form',
        element: <FormPage />
      }
    ]
    }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
