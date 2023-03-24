"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import LogoIcon from "./icons/LogoIcon";

const Login = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text bg-background text-white gap-5">
      <LogoIcon />
      <div className="flex flex-col md:flex-row gap-10 w-full md:px-20 xl:px-[300px]">
        <div className="flex flex-col justify-center items-center gap-4 flex-1 w-full">
          <p>Sign In with Google Account</p>
          <button
            className="bg-green hover:bg-dark_green duration-150 transition-colors inline-flex border-transparent rounded border-1 py-3 px-2 leading-5 cursor-pointer"
            onClick={() => signIn("google")}
          >
            Log In
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center gap-4">
          <p>Explore as Guest</p>
          <button
            className="bg-green hover:bg-dark_green duration-150 transition-colors inline-flex border-transparent rounded border-1 py-3 px-2 leading-5 cursor-pointer"
            onClick={() => signIn("google")}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
