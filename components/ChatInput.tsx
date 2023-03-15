"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { Message } from "../types";
// import Airplane from "./icons/AirplaneIcon";
import useSWR from "swr";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const { data: session } = useSession();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    if (loading) return;

    setLoading(true);

    const question = value.trim();

    setValue("");

    const message: Message = {
      text: question,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: question,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      setLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey === false && e.ctrlKey === false) {
      e.preventDefault();
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
    <div className="w-full p-5 text-base flex justify-center">
      <form
        ref={formRef}
        className=" gap-1 border-l-gray-900/50 text-white bg-gray_light rounded-md flex shadow-[0_0_15px_rgba(0,0,0,0.10)] md:max-w-3xl w-full "
        onSubmit={sendMessage}
      >
        <div className="flex grow pr-2 py-2 ">
          <textarea
            autoFocus={true}
            ref={textareaRef}
            rows={1}
            tabIndex={0}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            className="bg-transparent resize-none w-full overflow-y-hidden h-6 max-h-52 outline-none pl-2 pr-4"
            value={value}
          />

          <button
            type="submit"
            className="hover:bg-dark_gray p-1 rounded-md disabled:hover:bg-transparent"
            disabled={!value}
          >
            {loading ? (
              <div>
                <span>.</span>
                <span className="animate-[flicker_2s_steps(1,start)_infinite]">
                  .
                </span>
                <span className="animate-[flickerAlt_2s_steps(1,start)_infinite]">
                  .
                </span>
              </div>
            ) : (
              <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
