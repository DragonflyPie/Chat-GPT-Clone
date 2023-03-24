"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import { SidebarContext } from "../context/sidebarContext";

import NewChat from "./NewChat";

const Navbar = () => {
  console.log("navbar rendered");
  // const [showSidebar, setShowSidebar] = useState(false);

  // const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setShowSidebar(!showSidebar);
  // };
  const { showSidebar, hideSidebar, displaySidebar } =
    useContext(SidebarContext);

  return (
    <React.Fragment>
      <nav
        className="sticky top-0 z-10 flex h-10 md:hidden bg-background justify-between text-text_darker border-b border-white/20
      "
      >
        <button
          onClick={displaySidebar}
          className="hover:text-white inline-flex justify-center items-center px-3"
        >
          <MenuIcon />
        </button>
        <NewChat mobile={true} />
      </nav>

      <div
        className={`fixed inset-0 bg-background_navbar bg-opacity-75 z-20 transition duration-1000 ${
          showSidebar ? "animate-appear" : "hidden"
        }  `}
      ></div>
      <div
        className={`fixed inset-0 z-40 transition-transform duration-700 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="fixed inset-0 z-40">
          <Sidebar />
        </div>
        <button
          type="button"
          tabIndex={0}
          onClick={hideSidebar}
          className="absolute left-[20.5rem] top-2 text-white focus:ring-2 z-40 h-10 w-10 inline-flex items-center justify-center focus:outline-none focus:ring-inset focus:ring-white"
        >
          <CloseIcon />
        </button>
      </div>

      {/* // : (
      //   <div className="">
      //     <div className="fixed inset-0 bg-background_navbar bg-opacity-75 z-20 opacity-0 transition-all duration-1000 h-0 "></div>
      //     <div className="transition-transform -translate-x-full duration-500 ease-in inset-0 h-screen fixed z-40">
      //       <div className="fixed inset-0 z-40">
      //         <Sidebar />
      //       </div>
      //       <button
      //         type="button"
      //         tabIndex={0}
      //         onClick={hideSidebar}
      //         className="absolute left-[20.5rem] top-2 text-white focus:ring-2 z-40 h-10 w-10 inline-flex items-center justify-center focus:outline-none focus:ring-inset focus:ring-white"
      //       >
      //         <CloseIcon />
      //       </button>
      //     </div>
      //   </div>
      // )
      // } */}
    </React.Fragment>
  );
};

export default Navbar;
