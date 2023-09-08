import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";

export function useAddPost() {
  const [isPostLoading, setPostLoading] = useState(false);

  async function addPost(post) {
    setPostLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast.success("Post added successfully!");
    setPostLoading(false);
  }

  return { addPost, isPostLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, postsLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, postsLoading };
}

export function usePost(id) {
  const q = doc(db, "posts", id);
  const [post, isPostLoading] = useDocumentData(q);

  return { post, isPostLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [likeLoading, setLikeLoading] = useState(false);

  async function toggleLike() {
    setLikeLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLikeLoading(false);
  }

  return { toggleLike, likeLoading };
}

export function useDeletePost(id) {
  const [deletePostLoading, setDeletePostLoading] = useState(false);

  async function deletePost() {
    setDeletePostLoading(true);
      await deleteDoc(doc(db, "posts", id));
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
      toast.success("Post deleted!");
      setDeletePostLoading(false);
  }
  return { deletePost, deletePostLoading };
}
