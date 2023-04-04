"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useRef, useState } from "react";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import Loader from "./Loader";
import useSubscribeChats from "../lib/useSubscribeChats";
import LogOutIcon from "./icons/LogOutIcon";
import TrashIcon from "./icons/TrashIcon";
import { deleteAllChats } from "../lib/firebaseUtils";
import { CheckIcon } from "@heroicons/react/24/outline";
import useClickOutside from "../lib/useClickOutside";

const Sidebar = () => {
  const [deleteAllMode, setDeleteAllMode] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);
  useClickOutside(deleteRef, () => setDeleteAllMode(false));

  const { data: chats, loading } = useSubscribeChats({ email });

  const empty = chats?.docs && chats.docs.length === 0;

  return (
    <nav
      ref={sidebarRef}
      className="bg-dark_gray flex flex-col h-screen max-w-xs p-2 md:w-[260px] md:fixed "
    >
      <div className="flex flex-col gap-2 grow">
        <NewChat />
        {loading ? (
          <div className="flex w-full justify-center items-center text-white pt-20">
            <Loader text="Loading chats" />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2 overflow-y-auto max-h-[calc(100vh-15rem)]">
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
            className="text-white inline-flex gap-2 p-3 rounded cursor-pointer group items-center  hover:bg-gray_hover"
            onClick={() => setDeleteAllMode(true)}
          >
            <TrashIcon /> Delete all conversations
          </div>
        ) : !empty && deleteAllMode ? (
          <div
            ref={deleteRef}
            className="text-white inline-flex gap-2 p-3 rounded cursor-pointer group items-center  hover:bg-gray_hover"
            onClick={() => deleteAllChats(email)}
          >
            <CheckIcon className="h-4 w-4" /> Confirm delete all
          </div>
        ) : null}

        <div
          className="text-white inline-flex gap-2 p-3 rounded cursor-pointer group items-center  hover:bg-gray_hover"
          onClick={() => signOut()}
        >
          <LogOutIcon /> Log Out
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
