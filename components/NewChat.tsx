"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import useFirebaseChat from "../lib/useFirebaseChat";

interface NewChatProps {
  mobile?: boolean;
}

const NewChat = ({ mobile }: NewChatProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { createChat } = useFirebaseChat({ user: session?.user?.email });

  const handleCreate = async () => {
    const newId = await createChat();

    router.push(`/chat/${newId}`);
  };

  return (
    <a
      onClick={handleCreate}
      className={`flex items-center cursor-pointer p-3 ${
        mobile
          ? " "
          : "justify-start rounded-md border-white/20 border hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-white gap-3"
      }`}
    >
      <PlusIcon
        className={mobile ? "h-5 w-5" : "h-4 w-4"}
        strokeWidth={2}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      {!mobile && "New chat"}
    </a>
  );
};

export default NewChat;
