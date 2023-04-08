import { DocumentData } from "@firebase/firestore-types";
import { doc, getDoc, QuerySnapshot, updateDoc } from "firebase/firestore";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { db } from "../firebase";

interface UseAutoNameChatProps {
  email: string | undefined | null;
  id: string;
  messages?: DocumentData[];
}

export default function useAutoNameChat({
  email,
  messages,
  id,
}: UseAutoNameChatProps) {
  useEffect(() => {
    if (!email || !messages) return;

    const updateName = async () => {
      const docRef = doc(db, "users", email, "chats", id);
      const chatSnap = await getDoc(docRef);
      const chatData = chatSnap.data();

      if (chatData && !chatData.name && messages?.length) {
        const newName = messages[0].data().text.trim().slice(0, 30);
        await updateDoc(docRef, { name: newName });
      }
    };
    updateName();
  }, [db, email, messages]);
  return;
}
