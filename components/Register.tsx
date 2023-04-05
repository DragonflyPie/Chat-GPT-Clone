"use client";

import { collection, getDocs, query } from "firebase/firestore";
import React, { useRef } from "react";
import { db } from "../firebase";
import useRegisterForm from "../lib/useRegisterForm";

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const { registerUser, error } = useRegisterForm();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRef.current?.value || !usernameRef.current?.value) return;

    await registerUser({
      email: emailRef.current.value,
      username: usernameRef.current?.value,
    });

    const form = e.target as HTMLFormElement;
    form.reset();
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-white">
      <form
        className="flex flex-col gap-8 rounded-md bg-gray_light p-10"
        onSubmit={submitForm}
      >
        <div className="flex max-w-2xl justify-between gap-2">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            required
            className="rounded-sm px-2 py-1 text-black"
          />
        </div>
        <div className="flex max-w-2xl justify-between gap-2">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            required
            className="rounded-sm px-2 py-1 text-black"
          />
        </div>
        <button type="submit">232133</button>
      </form>
    </div>
  );
};

export default Register;
