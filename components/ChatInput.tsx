"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import useSendMessage from "../lib/useSendMessage";
import { createChat } from "../lib/firebaseUtils";
import { DocumentData } from "@firebase/firestore-types";
import { QuerySnapshot } from "firebase/firestore";

interface ChatInputProps {
  chatId?: string;
  messages?: QuerySnapshot<DocumentData>;
  value: string;
  updateValue: (text: string) => void;
}
const ChatInput = ({
  chatId,
  messages,
  value,
  updateValue,
}: ChatInputProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const { loading, sendMessage } = useSendMessage({
    user,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let id;
    if (!chatId) {
      id = await createChat({
        email: user?.email,
        name: value.trim().slice(0, 30),
      });
      router.push(`/chat/${id}`);
    } else {
      id = chatId;
    }

    const text = value;
    updateValue("");
    await sendMessage({ chatId: id, text, messages });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey === false && e.ctrlKey === false) {
      e.preventDefault();
      if (loading) return;
      formRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="bottom-0 flex w-full justify-center border-t border-white/20 bg-background p-5 text-base md:border-none md:pb-10">
      <form
        ref={formRef}
        className=" flex w-full gap-1 rounded-md border-l-gray-900/50 bg-gray_light text-white shadow-[0_0_15px_rgba(0,0,0,0.10)] md:max-w-3xl "
        onSubmit={handleSubmit}
        onClick={() => textareaRef.current?.focus()}
      >
        <div className="flex grow py-2 pr-2 md:py-3 md:pl-3 ">
          <textarea
            autoFocus={true}
            ref={textareaRef}
            rows={1}
            tabIndex={0}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            className="h-6 max-h-52 w-full resize-none overflow-y-hidden bg-transparent pl-2 pr-4 outline-none"
            value={value}
            placeholder="Send a message..."
          />

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="rounded-md p-1 hover:bg-dark_gray disabled:text-text_disabled disabled:hover:bg-transparent"
              disabled={!value}
            >
              <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
