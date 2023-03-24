"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import ChatLoader from "./ChatLoader";

const Sidebar = () => {
  const { data: session } = useSession();

  const sidebarRef = useRef<HTMLDivElement>(null);

  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <nav
      ref={sidebarRef}
      className="bg-dark_gray flex flex-col h-full max-w-xs p-2 overflow-y-scrol md:w-[260px] "
    >
      <div className="flex-1">
        <NewChat />

        <div className="my-2">
          <ModelSelection />
        </div>
        {loading ? (
          <ChatLoader />
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
