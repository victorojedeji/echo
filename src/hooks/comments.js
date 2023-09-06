import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";

export function useAddComment({ postId, uid }) {
  const [isNewCommentLoading, setNewCommentLoading] = useState(false);

  async function addComment(text) {
    setNewCommentLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postId, date, uid });

    toast.success("Comment added!");

    setNewCommentLoading(false);
  }

  return { addComment, isNewCommentLoading };
}


export function useComments(postId) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("date", "asc")
  );
  const [comments, isCommentsLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isCommentsLoading };
}

export function useDeleteComment(id) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setDeleteLoading(true);
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef); 
      toast.success("Comment deleted!");
      setDeleteLoading(false);
    }
  }

  return { deleteComment, deleteLoading };
}
