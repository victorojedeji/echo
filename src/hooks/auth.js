import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { DASHBOARD, LOGIN } from "../lib/routes";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import isUserExist from "../utils/isUserExist";
import isEmailExist from "../utils/isEmailExist";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isDataLoading, setDataLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnapshot = await getDoc(ref);

      setUser(docSnapshot.data());
      setDataLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setDataLoading(false);
    }
  }, [authLoading]);

  return { user, isDataLoading, error };
}

export function useLogin() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setIsLoginLoading(true);
    const emailExists = await isEmailExist(email);
    
    if (!emailExists) {
      toast.error("Email does not exit!");
      setIsLoginLoading(false);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successful!");
        navigate(redirectTo);
      } catch (error) {
        toast.error("Login Failed!");
        setIsLoginLoading(false);
      }
      return false;
  
      setIsLoginLoading(false);
      return true;
    }
    
  }

  return { login, isLoginLoading };
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
      toast.error("Username already exists!");
      setIsRegisterLoading(false);
    } else {
      try {
        const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF5733", "#33FF57"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const response = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", response.user.uid), {
          id: response.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          bio: "",
          date: Date.now(),
          bgColor: randomColor, 
          email: email,
        });
        await setDoc(doc(db, "userChats", response.user.uid), {});

        toast.success("Registration Successful!");

        navigate(redirectTo);
      } catch (error) {
        if (error) throw error;
        toast.error("Registration Failed!");
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
