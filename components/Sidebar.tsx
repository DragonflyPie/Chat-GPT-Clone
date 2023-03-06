"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import NewChat from "./NewChat";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-sidebar flex flex-col h-screen max-w-xs p-2 overflow-y-scrol md:w-[260px]">
      <div className="flex-1">
        <NewChat />

        <div className="">{/* Model selection  */}</div>

        {/* Map through chat rows */}
      </div>
      {session && (
        <Image
          src={session.user?.image!}
          alt="User Icon"
          width={30}
          height={30}
          className={"rounded-sm"}
        />
      )}
    </nav>
  );
};

export default Sidebar;
