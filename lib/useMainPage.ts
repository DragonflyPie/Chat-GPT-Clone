import { DocumentData } from "@firebase/firestore-types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import { createChat } from "./firebaseUtils";

export default function useMainPage(email: string | null | undefined) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!email) return;

    const queryCollection = async () => {
      setLoading(true);

      const q = query(
        collection(db, "users", email, "chats"),
        orderBy("createdAt", "asc")
      );

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      setLoading(false);
      if (docs.length) {
        router.push(`/chat/${docs[docs.length - 1].id}`);
      } else {
        const id = await createChat(email);
        router.push(`/chat/${id}`);
      }
    };

    queryCollection();
  }, [email]);

  return { loading };
}
