import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase';

import { useState } from 'react';

import { DASHBOARD } from '../lib/routes';

export function useAuth() {
  const [authUser, isUserLoading, error] = useAuthState(auth);

  return {user: authUser, isUserLoading, error };
}


export function useLogin() {

  const [isLoginLoading, setIsLoginLoading] = useState();


  async function login(email, password, redirectTo=DASHBOARD) {
    setIsLoginLoading(true);


    try {

      await signInWithEmailAndPassword({ auth, email, password })
      
    }catch(error) {

    }

    setIsLoginLoading(false);
  }


  return {login, isLoginLoading }
}