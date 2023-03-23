import { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { DocumentData } from "@firebase/firestore-types";

interface useCollectionProps {
  email: string;
  id?: string;
}

export default function useFetchFirebase({ email, id }: useCollectionProps) {
  const [messages, setMessages] = useState<DocumentData[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchCollection = async () => {
      if (!email) return;
      let q;
      if (id !== undefined) {
        q = query(
          collection(db, "users", email, "chats", id, "messages"),
          orderBy("createdAt", "asc")
        );
      } else {
        q = query(
          collection(db, "users", email, "chats"),
          orderBy("createdAt", "asc")
        );
      }
      try {
        const unsub = onSnapshot(q, (querySnapshot) => {
          const data: DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setMessages(data);
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          const unknownEror = new Error("Unknown error");
          setError(unknownEror);
        }
      }
    };
    fetchCollection();
  }, [email, id, db]);

  return { messages, error };
}
