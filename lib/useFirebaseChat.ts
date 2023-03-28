import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

interface UseFirebaseChatProps {
  user: string | null | undefined;
  id?: string;
}

interface NameChatProps {
  id: string;
  name: string;
}

export default function useFirebaseChat({ user }: UseFirebaseChatProps) {
  const createChat = async () => {
    const doc = await addDoc(collection(db, "users", user!, "chats"), {
      userId: user,
      createdAt: serverTimestamp(),
    });
    return doc.id;
  };

  const deleteChat = async (id: string) => {
    const docRef = doc(db, "users", user!, "chats", id);
    await deleteDoc(docRef);
  };

  const nameChat = async ({ name, id }: NameChatProps) => {
    const docRef = doc(db, "users", user!, "chats", id);
    if (name) await updateDoc(docRef, { name: name });
  };
  return { deleteChat, nameChat, createChat };
}
