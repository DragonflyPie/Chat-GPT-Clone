// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import { adminDb } from "../../firebaseAdmin";
import { Session } from "next-auth";

type Data = {
  answer: string;
};

interface RequestProps {
  text: string;
  chatId: string;
  model: string;
  userId: string;
  messageId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { text, chatId, model, userId, messageId }: RequestProps = req.body;

  if (!text) {
    res.status(400).json({ answer: "Please provide question" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide valid Chat ID" });
    return;
  }

  const response = await query({ text, model });

  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .doc(messageId)
    .update({ text: response || "Chat GPT was unable to respond" });

  res.status(200).json({ answer: "Ok" });
}
