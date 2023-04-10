"use client";

import React from "react";
import { signIn } from "next-auth/react";
import LogoIcon from "./icons/LogoIcon";
import GithubLogo from "../public/github.png";
import Image from "next/image";
import GoogleLogo from "../public/google.png";
import GuestLogo from "../public/guest.png";
import LoginOptionGroup from "./LoginOptionGroup";

const Login = () => {
  return (
    <div className="text flex h-screen w-full flex-col items-center justify-center gap-5 bg-background text-white">
      <LogoIcon />
      <div className="flex w-full flex-col gap-20 md:px-20 xl:px-[300px]">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
          <p>Sign In with:</p>
          <LoginOptionGroup logo={GoogleLogo} name="Google" type="google" />
          <LoginOptionGroup logo={GithubLogo} name="Github" type="github" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p>Explore as Guest</p>

          <LoginOptionGroup logo={GuestLogo} name="Guest" type="credentials" />
        </div>
      </div>
      {/* <Register /> */}
    </div>
  );
};

export default Login;
