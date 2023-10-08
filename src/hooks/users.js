import { useEffect, useState } from "react";
import { collection, doc, getDoc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";


export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setError(null);

        const userDocRef = doc(db, 'users', user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUsername(userData.username);
          }
        } catch (fetchError) {
          setError(fetchError);
        }
      } else {
        setCurrentUser({});
        setUsername(null);
      }
    }, (authError) => {
      setError(authError);
    });

    return () => {
      unsub();
    };
  }, []);

  return { currentUser, error, username };
}




export function useUser(uid) {
  const q = query(doc(db, "users", uid));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}


export function useUsers() {
  const [users, isUsersLoading] = useCollectionData(collection(db, "users"));
  return { users, isUsersLoading };
}

export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function updateAvatar() {

    if (!file) {
      toast.error("No file selected");

      return;
    }

    setLoading(true);

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast.success("Profile updated!");
    setLoading(false);

    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
