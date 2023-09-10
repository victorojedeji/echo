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
import { useEffect, useRef, useState } from "react";
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



// export async function useUserLikesCount(uid) {
//   const [likesCount, setLikesCount] = useState(0);
//   const [likeCountLoading, setLikeCountLoading] = useState(true);
//   const likesCountRef = useRef(0); 

//   useEffect(() => {
//     const fetchUserLikesCount = async () => {
//       try {
//         const postsCollectionRef = collection(db, "posts");
//         const querySnapshot = await getDocs(postsCollectionRef);

//         let accumulatedLikes = 0;

//         querySnapshot.forEach((doc) => {
//           const postData = doc.data();
//           if (postData.uid === uid && postData.likes) {
//             accumulatedLikes += postData.likes.length;
//           }
//         });

//         likesCountRef.current = accumulatedLikes;
//         setLikesCount(accumulatedLikes);
//         setLikeCountLoading(false);
//       } catch (error) {
//         console.error("Error fetching user's likes:", error);
//         setLikeCountLoading(false);
//       }
//     };

//     fetchUserLikesCount();
//   }, [uid]);

//   return { likesCount: likesCountRef.current, likeCountLoading };
// }



export async function useUserLikesCount(uid) {
  const [likesCount, setLikesCount] = useState([]);
  const [likeCountLoading, setLikeCountLoading] = useState(true);
  const likesCountRef = useRef([]);

  useEffect(() => {
    const fetchUserLikesCount = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollectionRef);

        let accumulatedLikes = [];

        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          if (postData.uid === uid && postData.likes) {
            accumulatedLikes.push(...postData.likes);
          }
        });

        likesCountRef.current = accumulatedLikes;
        setLikesCount(accumulatedLikes);    
        setLikeCountLoading(false);
      } catch (error) {
        console.error("Error fetching user's likes:", error);
        setLikeCountLoading(false);
      }
    };
    // console.log(likesCount);
    fetchUserLikesCount();
  }, [uid]);

  return { likesCount: likesCountRef.current, likeCountLoading };
}


export function useDeletePost(id) {
  const [deletePostLoading, setDeletePostLoading] = useState(false);

  async function deletePost() {
    setDeletePostLoading(true);
    await deleteDoc(doc(db, "posts", id));
    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
    toast.success("Post deleted!");
    setDeletePostLoading(false);
  }
  return { deletePost, deletePostLoading };
}
