"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Logo from "./Logo";

const Login = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text bg-background text-white gap-5">
      <Logo />
      <p>Sign In to Use ChatGPT</p>
      <button
        className="bg-green hover:bg-dark_green duration-150 transition-colors inline-flex border-transparent rounded border-1 py-3 px-2 leading-5 cursor-pointer"
        onClick={() => signIn("google")}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
