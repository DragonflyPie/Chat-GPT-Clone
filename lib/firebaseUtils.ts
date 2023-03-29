import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

interface DeleteChatProps {
  user: string;
  id: string;
}

interface NameChatProps {
  user: string | null | undefined;
  id: string;
  name: string;
}

export const createChat = async (email: string | null | undefined) => {
  if (!email) return;
  const doc = await addDoc(collection(db, "users", email, "chats"), {
    userId: email,
    createdAt: serverTimestamp(),
  });
  return doc.id;
};

export const deleteChat = async ({ user, id }: DeleteChatProps) => {
  const docRef = doc(db, "users", user!, "chats", id);
  await deleteDoc(docRef);
};

export const nameChat = async ({ user, name, id }: NameChatProps) => {
  const docRef = doc(db, "users", user!, "chats", id);
  if (name) await updateDoc(docRef, { name: name });
};
