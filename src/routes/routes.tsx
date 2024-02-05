import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { LinksPage } from '../components/LinksPage/LinksPage';
import { Redirect } from '../components/Redirect/Redirect';

export const router = createBrowserRouter([
  { path: '/', element: <Redirect url="/mylinks" /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/mylinks', element: <LinksPage /> },
]);
