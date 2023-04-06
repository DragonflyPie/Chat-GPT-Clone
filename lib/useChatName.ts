import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

interface UseChatNameProps {
  email: string | undefined | null;
  chatId: string | undefined | null;
}

export default function useChatName({ email, chatId }: UseChatNameProps) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (!email || !chatId) return;

    const getChatName = async () => {
      const chatRef = doc(db, "users", email, "chats", chatId);
      const chat = await getDoc(chatRef);
      const chatData = chat.data();
      setTitle(chatData?.name);
    };
    getChatName();
  }, [chatId, email, db]);

  return { title };
}
