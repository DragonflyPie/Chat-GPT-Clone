"use client";

import React from "react";
import { signIn } from "next-auth/react";
import LogoIcon from "./icons/LogoIcon";

const Login = () => {
  return (
    <div className="text flex h-screen w-full flex-col items-center justify-center gap-5 bg-background text-white">
      <LogoIcon />
      <div className="flex w-full flex-col gap-10 md:flex-row md:px-20 xl:px-[300px]">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
          <p>Sign In with Google Account</p>
          <button
            className="border-1 inline-flex cursor-pointer rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
            onClick={() => signIn("google")}
          >
            Log In
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p>Explore as Guest</p>
          <button
            className="border-1 inline-flex cursor-pointer rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
            onClick={() => signIn("credentials")}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
