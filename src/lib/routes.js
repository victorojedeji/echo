import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/layout";
import Root from "../pages/root";
import Profile from "../pages/profile";
import Users from "../pages/users";
import Dashboard from "../pages/Dashboard";
import Comments from "../pages/comments";
import Messages from "../pages/messages";
import Chat from "../pages/chat";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const AUTH = "/auth";
export const DASHBOARD = "/auth/posts";
export const PROFILE = "/auth/profile/:id";
export const COMMENTS = "/auth/comments/:postId";
export const USERS = "/auth/users";
export const MESSAGES = "/auth/messages";
export const DM = "/auth/messages/:id";

export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Root />,
  },

  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: AUTH,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
      {
        path: USERS,
        element: <Users />,
      },
      {
        path: COMMENTS,
        element: <Comments />,
      },
      {
        path: MESSAGES,
        element: <Messages />,
        children: [
         {
          path: DM, 
          element: <Chat />,
         }
        ]
      },
    ],
  },
]);
