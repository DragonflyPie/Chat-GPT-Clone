"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return (
    <a
      onClick={createNewChat}
      className="flex items-center justify-start rounded-md border-white/20 border hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-white p-3 gap-3"
    >
      <PlusIcon
        className="h-4 w-4"
        strokeWidth={2}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      New chat
    </a>
  );
};

export default NewChat;
