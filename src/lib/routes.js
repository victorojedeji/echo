import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../pages/layout';


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";


export const AUTH = "/auth";
export const DASHBOARD = "/auth/dashboard";

export const router = createBrowserRouter([
  {
    path: ROOT, 
    element: 'public'
  },

  {
    path: LOGIN, 
    element: <Login />
  },
  {
    path: REGISTER,
    element: <Register />
  },
  {
    path: AUTH,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: '<Dashboard />'
      }
    ]
  },
])

