"use client";

import React, { useContext, useRef } from "react";
import Sidebar from "./Sidebar";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import { SidebarContext } from "../context/sidebarContext";

import NewChat from "./NewChat";
import useClickOutside from "../lib/useClickOutside";

const Navbar = () => {
  const { showSidebar, hideSidebar, displaySidebar } =
    useContext(SidebarContext);

  const handler = () => {
    hideSidebar && hideSidebar();
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  useClickOutside(sidebarRef, handler);

  return (
    <React.Fragment>
      <nav
        className="sticky top-0 z-10 flex h-10 justify-between border-b border-white/20 bg-background text-text_darker md:hidden
      "
      >
        <button
          onClick={displaySidebar}
          className="inline-flex items-center justify-center px-3 hover:text-white"
        >
          <MenuIcon />
        </button>
        <NewChat mobile={true} />
      </nav>

      <div
        className={`fixed inset-0 z-20 bg-background_navbar bg-opacity-75 transition duration-1000 ${
          showSidebar ? "animate-appear" : "hidden"
        }  `}
      ></div>
      <div
        className={`fixed inset-0 z-40 transition-transform duration-700 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="fixed z-40 w-full max-w-xs" ref={sidebarRef}>
          <Sidebar />
        </div>
        <button
          type="button"
          tabIndex={0}
          onClick={hideSidebar}
          className="absolute left-[20.5rem] top-2 z-40 inline-flex h-10 w-10 items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <CloseIcon />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
