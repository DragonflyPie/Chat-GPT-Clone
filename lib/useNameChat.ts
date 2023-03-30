import { DocumentData } from "@firebase/firestore-types";
import { doc, getDoc, QuerySnapshot, updateDoc } from "firebase/firestore";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { db } from "../firebase";

interface UseNameChatProps {
  email: string | undefined | null;
  id: string;
  messages?: QuerySnapshot<DocumentData>;
}

export default function useNameChat({ email, messages, id }: UseNameChatProps) {
  useEffect(() => {
    if (!email || !messages) return;
    const getName = async () => {
      const docRef = doc(db, "users", email, "chats", id);
      const chatSnap = await getDoc(docRef);
      const chatData = chatSnap.data();

      if (chatData && !chatData.name && messages?.docs.length) {
        const newName = messages.docs[0].data().text.trim().slice(0, 20);
        await updateDoc(docRef, { name: newName });
      }
    };
    getName();
  }, [db, email, messages]);
  return;
}
