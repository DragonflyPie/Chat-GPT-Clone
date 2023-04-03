import { doc, updateDoc } from "firebase/firestore";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { IMessage } from "../types";

interface UseTypeMessageProps {
  content: IMessage;
  messageId: string;
  chatId: string;
  email: string | null | undefined;
}

export default function useTypeMessage({
  content,
  messageId,
  chatId,
  email,
}: UseTypeMessageProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  const fullText = content.text;

  useEffect(() => {
    if (content.read || !fullText.length || !email) return;

    if (index < fullText.length) {
      const timerId = setTimeout(() => {
        setText((prevText) => prevText + fullText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 20);

      return () => clearTimeout(timerId);
    } else {
      const docRef = doc(
        db,
        "users",
        email,
        "chats",
        chatId,
        "messages",
        messageId
      );
      updateDoc(docRef, { read: true });
    }
  }, [index, content]);

  return { text };
}
