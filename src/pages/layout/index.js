import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN } from '../../lib/routes';
import {useAuth} from '../../hooks/auth'
import Navbar from '../../components/Navbar';

export default function Layout() {
  const {pathname}= useLocation();
  const navigate = useNavigate();

  const { user, isDataLoading }= useAuth();

  
  useEffect(() => {
    if(!isDataLoading && pathname.startsWith("/auth") && !user ){
      navigate(LOGIN);
    }
  }, [pathname, user])
  
  if (isDataLoading) return "Loading authenticated User...";

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
