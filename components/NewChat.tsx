"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createChat } from "../lib/firebaseUtils";

interface NewChatProps {
  mobile?: boolean;
}

const NewChat = ({ mobile }: NewChatProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;

  const handleCreate = async () => {
    const newChatId = await createChat({ email });

    router.push(`/chat/${newChatId}`);
  };

  return (
    <a
      onClick={handleCreate}
      className={`flex cursor-pointer items-center p-3 ${
        mobile
          ? " "
          : "cursor-pointer justify-start gap-3 rounded-md border border-white/20 text-white transition-colors duration-200 hover:bg-gray-500/10"
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
