"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useRef } from "react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import Loader from "./Loader";
import useSubscribeFirebase from "../lib/useSubscribeFirebase";

const Sidebar = () => {
  const { data: session } = useSession();
  const user = session?.user?.email;

  const sidebarRef = useRef<HTMLDivElement>(null);

  const { data: chats, loading } = useSubscribeFirebase({ user });

  return (
    <nav
      ref={sidebarRef}
      className="bg-dark_gray flex flex-col h-screen max-w-xs p-2 overflow-y-scrol md:w-[260px] md:fixed"
    >
      <div className="flex-1">
        <NewChat />

        <div className="my-2">
          <ModelSelection />
        </div>
        {loading ? (
          <div className="flex w-full justify-center items-center text-white pt-20">
            <Loader text="Loading chats" />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
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
      {session && (
        <div
          className="flex justify-center items-center pb-2"
          onClick={() => signOut()}
        >
          <Image
            src={session.user?.image!}
            alt="User Icon"
            width={30}
            height={30}
            className={"rounded-full hover:opacity-50 cursor-pointer"}
          />
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
