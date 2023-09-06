import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNlQ6EIx5zW_AdauMTMnazhMC6b9sYJCk",
  authDomain: "echo-918fb.firebaseapp.com",
  projectId: "echo-918fb",
  storageBucket: "echo-918fb.appspot.com",
  messagingSenderId: "54040213308",
  appId: "1:54040213308:web:4266ddb1366dd0ba855039",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
