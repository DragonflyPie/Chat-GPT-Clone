"use client";

import React from "react";
import { signIn } from "next-auth/react";
import LogoIcon from "./icons/LogoIcon";
import Register from "./Register";
import GithubLogo from "../public/github.png";
import Image from "next/image";
import GoogleLogo from "../public/google.png";
import GuestLogo from "../public/guest.png";

const Login = () => {
  return (
    <div className="text flex h-screen w-full flex-col items-center justify-center gap-5 bg-background text-white">
      <LogoIcon />
      <div className="flex w-full flex-col gap-10 md:px-20 xl:px-[300px]">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
          <p>Sign In with:</p>
          <div className="flex w-full justify-center gap-4">
            <Image
              src={GoogleLogo}
              alt=""
              width={38}
              className="object-contain"
            />
            <button
              className="border-1 inline-flex w-28 cursor-pointer justify-center rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
              onClick={() => signIn("google")}
            >
              Google
            </button>
          </div>
          <div className="flex w-full justify-center gap-4">
            <Image
              src={GithubLogo}
              alt=""
              width={40}
              className="object-contain"
            />
            <button
              className="border-1 inline-flex w-28 cursor-pointer justify-center rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
              onClick={() => signIn("github")}
            >
              Github
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p>Explore with a shared guest account</p>
          <div className="flex w-full justify-center gap-4">
            <Image
              src={GuestLogo}
              alt=""
              width={40}
              className="object-contain invert"
            />
            <button
              className="border-1 inline-flex w-28 cursor-pointer justify-center rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
              onClick={() => signIn("credentials")}
            >
              Guest
            </button>
          </div>
        </div>
      </div>
      {/* <Register /> */}
    </div>
  );
};

export default Login;
