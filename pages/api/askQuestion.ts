// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

interface RequestProps {
  text: string;
  chatId: string;
  userId: string;
  messageId: string;
  chatHistory: {
    role: string;
    content: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { chatId, userId, messageId, chatHistory }: RequestProps = req.body;

  if (!chatId) {
    res.status(400).json({ answer: "Please provide valid Chat ID" });
    return;
  }

  const response = await query({ chatHistory });

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
