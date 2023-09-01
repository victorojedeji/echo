import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth'
import { auth, db } from '../lib/firebase';

import { useState } from 'react';

import { DASHBOARD, LOGIN } from '../lib/routes';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import isUserExist from '../utils/isUserExist';


export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isDataLoading, setDataLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function fetchData() {
      setDataLoading(true);
      const ref = doc(db, 'users', authUser.uid)
      const docSnapshot = await getDoc(ref)

      setUser(docSnapshot.data());
      setDataLoading(false);
    }

    if(!authLoading) {
      if(authUser) fetchData();
      else setDataLoading(false);
    }

  }, [authLoading])

  return {user, isDataLoading, error};
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
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setIsRegisterLoading(true);

    const usernameExists = await isUserExist(username);

    if (usernameExists) {
      toast.error('Username already exits!');
      setIsRegisterLoading(false);
    } else {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", response.user.uid), {
          id: response.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast.success('Registration Successfull!');

        navigate(redirectTo);
      } catch (error) {
        toast.error('Registration Failed!');
      } finally {
        setIsRegisterLoading(false);
      }
    }
  }

  return { register, isRegisterLoading };
}











export function useLogout() {
  const [signOut, isLogoutLoading] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast.success("Logout Successful!");
      navigate(LOGIN);
    } else toast.success("Logout Unsuccessful!");
  }

return { logout, isLogoutLoading };
}