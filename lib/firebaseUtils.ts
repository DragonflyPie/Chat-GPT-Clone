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
  email: string;
  id: string;
}

interface NameChatProps {
  email: string | null | undefined;
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

export const deleteChat = async ({ email, id }: DeleteChatProps) => {
  const docRef = doc(db, "users", email!, "chats", id);
  await deleteDoc(docRef);
};

export const nameChat = async ({ email, name, id }: NameChatProps) => {
  const docRef = doc(db, "users", email!, "chats", id);
  if (name) await updateDoc(docRef, { name: name });
};
