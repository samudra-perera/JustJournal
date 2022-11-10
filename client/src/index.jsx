import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([{
  path: '/',
  element: <Home/>,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Login/>
    },
    {
      path: 'signup',
      element: <Signup/>,
    }
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


