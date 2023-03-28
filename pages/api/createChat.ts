import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import { adminDb } from "../../firebaseAdmin";
import { Session } from "next-auth";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { IChat } from "../../types";
import { DocumentData } from "@firebase/firestore-types";

type Data = {
  newChat?: DocumentData;
  error?: string;
};

interface RequestProps {
  session: Session;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(500).send({ error: "Only POST request allowed" });
  }

  const { session }: RequestProps = req.body;

  let newChat: DocumentData;

  try {
    newChat = await adminDb
      .collection("users")
      .doc(session.user?.email!)
      .collection("chats")
      .add({
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      });

    res.status(200).send({ newChat: newChat });
  } catch (error) {
    res.status(500).send({ error: "Failed to create new chat" });
  }
}
