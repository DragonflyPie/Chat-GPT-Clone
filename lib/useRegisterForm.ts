import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

interface RegisterUserProps {
  username: string;
  email: string;
}
export default function useRegisterForm() {
  const [error, setError] = useState<Error | null>(null);

  const registerUser = async ({ email, username }: RegisterUserProps) => {
    try {
      const q = query(collection(db, "users", email, "chats"));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        throw new Error("User already exists");
      }
      const newUser = addDoc(collection(db, "users", email, "chats"), {});
      return newUser;
    } catch (error) {
      setError(error as Error);
      return false;
    }
  };

  return { registerUser, error };
}
