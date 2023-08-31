import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase';

import { useState } from 'react';

import { DASHBOARD } from '../lib/routes';

import toast from 'react-hot-toast';


export function useAuth() {
  const [authUser, isUserLoading, error] = useAuthState(auth);

  return {user: authUser, isUserLoading, error };
}


export function useLogin() {

  const [isLoginLoading, setIsLoginLoading] = useState(false);


  async function login(email, password, redirectTo=DASHBOARD) {
    setIsLoginLoading(true);
    try {

      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login Successful!")
      
    }catch(error) {
      toast.error('Login Failed!')
      setIsLoginLoading(false);
    } return false; 

    setIsLoginLoading(false);
    return true; 
  }



  return {login, isLoginLoading }
}