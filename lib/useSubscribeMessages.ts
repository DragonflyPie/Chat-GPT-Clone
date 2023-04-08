import { DocumentData } from "@firebase/firestore-types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { IMessage } from "../types";
import { IChatGPTMessage } from "./OpenAIStream";

interface UseFirebaseMessagesProps {
  email: string | null | undefined;
  chatId?: string;
}

export default function useFirebaseMessages({
  email,
  chatId,
}: UseFirebaseMessagesProps) {
  const [data, setData] = useState<DocumentData[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;
    if (chatId) {
      setLoading(true);

      const q = query(
        collection(db, "users", email, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setData(querySnapshot.docs);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [chatId, email, db]);

  return { loading, data };
}
