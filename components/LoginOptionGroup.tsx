import { signIn } from "next-auth/react";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface LoginOptionGroupProps {
  logo: StaticImageData;
  type: string;
  name: string;
}

const LoginOptionGroup = ({ logo, type, name }: LoginOptionGroupProps) => {
  const loginOption = type.toLowerCase();
  return (
    <div className="flex w-full justify-center gap-4 pr-12">
      <Image src={logo} alt="" width={40} className="object-contain" />
      <button
        className="border-1 inline-flex w-28 cursor-pointer justify-center rounded border-transparent bg-green py-3 px-2 leading-5 transition-colors duration-150 hover:bg-dark_green"
        onClick={() => signIn(loginOption)}
      >
        {name}
      </button>
    </div>
  );
};

export default LoginOptionGroup;
