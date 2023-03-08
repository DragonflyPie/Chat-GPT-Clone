import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import ChatIcon from "./icons/ChatIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { collection, deleteDoc, doc, getDoc, query } from "firebase/firestore";
import {
  useCollection,
  useDocument,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase";

interface ChatRowProps {
  id: string;
}

const ChatRow = ({ id }: ChatRowProps) => {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!path) return;
    setActive(path.includes(id));
  }, [path]);

  const deleteChat = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    if (active) {
      router.push("/");
    }
  };

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  return (
    <Link
      href={`/chat/${id}`}
      className={`text-gray-100 inline-flex gap-2 p-3 rounded group items-center ${
        active ? "bg-background hover:bg-background" : "hover:bg-gray_hover"
      }`}
    >
      {/* <ChatBubbleLeftIcon className="h-5 w-5" /> */}

      <span className="">
        <ChatIcon />
      </span>
      <span className="relative grow">
        <p className="text-ellipsis overflow-hidden break-all max-h-5">
          {messages?.docs[0]?.data().text || "New Chat"}
        </p>
        <div
          className={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l   ${
            active
              ? "from-background group-hover:from-background"
              : "from-dark_gray group-hover:from-gray_hover"
          }`}
        ></div>
      </span>
      <span className="text-gray-300 inline-flex items-center">
        {/* <TrashIcon className="w-5 h-5 hover:text-white" /> */}
        <span className="hover:text-white" onClick={deleteChat}>
          <TrashIcon />
        </span>
      </span>
    </Link>
  );
};

export default ChatRow;
