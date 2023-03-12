// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import { Message } from "../../types";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";
import { Session } from "next-auth";

type Data = {
  answer: string;
};

interface RequestProps {
  text: string;
  chatId: string;
  model: string;
  session: Session;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { text, chatId, model, session }: RequestProps = req.body;

  if (!text) {
    res.status(400).json({ answer: "Please provide question" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide valid Chat ID" });
    return;
  }

  const response = await query({ text, model });

  const responseMessage: Message = {
    text: response || "Chat GPT was unable to respond",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "Chat GPT",
      name: "Chat GPT",
      avatar: "gpt",
    },
  };

  await adminDb
    .collection("users")
    .doc(session.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(responseMessage);

  res.status(200).json({ answer: responseMessage.text });
}
