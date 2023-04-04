import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc,
  limit,
  orderBy,
  query,
  getDocs,
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

interface CreateChatProps {
  email: string | null | undefined;
  name?: string;
}
export const createChat = async ({ email, name }: CreateChatProps) => {
  if (!email) return;

  const newChat = name
    ? { userId: email, createdAt: serverTimestamp(), name: name }
    : {
        userId: email,
        createdAt: serverTimestamp(),
      };

  const doc = await addDoc(collection(db, "users", email, "chats"), newChat);
  return doc.id;
};

export const deleteChat = async ({ email, id }: DeleteChatProps) => {
  const docRef = doc(db, "users", email, "chats", id);
  await deleteDoc(docRef);
};

export const nameChat = async ({ email, name, id }: NameChatProps) => {
  if (!email) return;

  const docRef = doc(db, "users", email, "chats", id);
  if (name) await updateDoc(docRef, { name: name });
};

export const deleteAllChats = async (email: string | null | undefined) => {
  if (!email) return;

  const collectionRef = query(collection(db, "users", email, "chats"));

  const chatsToDelete = await getDocs(collectionRef);

  chatsToDelete &&
    chatsToDelete.forEach((chat) => {
      const id = chat.id;
      const docRef = doc(db, "users", email, "chats", id);
      deleteDoc(docRef);
    });
};
