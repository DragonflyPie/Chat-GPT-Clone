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

interface UseFirebaseMessagesProps {
  user: string | null | undefined;
  chatId?: string;
}

export default function useFirebaseMessages({
  user,
  chatId,
}: UseFirebaseMessagesProps) {
  console.log("mounted");
  const [data, setData] = useState<QuerySnapshot<DocumentData>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const q = chatId
      ? query(
          collection(db, "users", user, "chats", chatId, "messages"),
          orderBy("createdAt", "asc")
        )
      : query(
          collection(db, "users", user, "chats"),
          orderBy("createdAt", "asc")
        );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(querySnapshot);
      setLoading(false);
    });

    return unsubscribe;
  }, [chatId, user, db]);

  return { loading, data };
}
