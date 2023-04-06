"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useContext, useRef, useState } from "react";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import Loader from "./Loader";
import useSubscribeChats from "../lib/useSubscribeChats";
import LogOutIcon from "./icons/LogOutIcon";
import TrashIcon from "./icons/TrashIcon";
import { deleteAllChats } from "../lib/firebaseUtils";
import { CheckIcon } from "@heroicons/react/24/outline";
import useClickOutside from "../lib/useClickOutside";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [deleteAllMode, setDeleteAllMode] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const email = session?.user?.email;

  const deleteRef = useRef<HTMLDivElement>(null);
  useClickOutside(deleteRef, () => setDeleteAllMode(false));

  const deleteChats = () => {
    setDeleteAllMode(false);
    deleteAllChats(email);
    router.push("/");
  };

  const { data: chats, loading } = useSubscribeChats({ email });

  const empty = chats?.docs && chats.docs.length === 0;

  return (
    <nav className="flex h-screen max-w-xs flex-col bg-dark_gray p-2 text-sm md:fixed md:w-[260px] ">
      <div className="flex grow flex-col gap-2">
        <NewChat />
        {loading ? (
          <div className="flex w-full items-center justify-center pt-20 text-white">
            <Loader text="Loading chats" />
          </div>
        ) : (
          <div className="flex max-h-[calc(100vh-15rem)] w-full flex-col gap-2 overflow-y-auto">
            {chats?.docs.map((chat) => (
              <ChatRow
                key={chat.id}
                id={chat.id}
                name={chat.data().name || "New Chat"}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start gap-3 border-t border-white/20 py-2">
        {!empty && !deleteAllMode ? (
          <div
            className="group inline-flex cursor-pointer items-center gap-2 rounded p-3 text-white  hover:bg-gray_hover"
            onClick={() => setDeleteAllMode(true)}
          >
            <TrashIcon /> Delete all conversations
          </div>
        ) : !empty && deleteAllMode ? (
          <div
            ref={deleteRef}
            className="group inline-flex cursor-pointer items-center gap-2 rounded p-3 text-white  hover:bg-gray_hover"
            onClick={deleteChats}
          >
            <CheckIcon className="h-4 w-4" /> Confirm delete all
          </div>
        ) : null}

        <div
          className="group inline-flex cursor-pointer items-center gap-2 rounded p-3 text-white  hover:bg-gray_hover"
          onClick={() => signOut()}
        >
          <LogOutIcon /> Log Out
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
