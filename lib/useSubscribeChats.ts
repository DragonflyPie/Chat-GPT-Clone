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
  email: string | null | undefined;
}

export default function useFirebaseMessages({
  email,
}: UseFirebaseMessagesProps) {
  const [data, setData] = useState<QuerySnapshot<DocumentData>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;

    setLoading(true);

    const q = query(
      collection(db, "users", email, "chats"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(querySnapshot);
      setLoading(false);
    });

    return unsubscribe;
  }, [email, db]);

  return { loading, data };
}
