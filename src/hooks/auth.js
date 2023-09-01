import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth'
import { auth, db } from '../lib/firebase';

import { useState } from 'react';

import { DASHBOARD, LOGIN } from '../lib/routes';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import isUserExist from '../utils/isUserExist';


export function useAuth() {
  const [authUser, isUserLoading, error] = useAuthState(auth);

  return {user: authUser, isUserLoading, error };
}


export function useLogin() {

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();


  async function login({email, password, redirectTo = DASHBOARD}) {
    setIsLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login Successful!");
      navigate(redirectTo);
    }catch(error) {
      toast.error('Login Failed!');
      setIsLoginLoading(false);
    } return false; 

    setIsLoginLoading(false);
    return true; 
  }

  return {login, isLoginLoading }
}




export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUserExist(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast.success('Registration Successfull!');

        navigate(redirectTo);
      } catch (error) {
        toast.error('Registration Failed!');
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}




export function useLogout() {
  const [signOut, isLogoutLoading, error] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast.success("Logout Successful!");
      navigate(LOGIN);
    } else toast.success("Logout Unsuccessful!");
  }

return { logout, isLogoutLoading };
}