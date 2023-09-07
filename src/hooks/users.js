import { useState } from "react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useUser(uid) {
  const q = query(doc(db, "users", uid));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}

export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function updateAvatar() {

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
    file,
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
