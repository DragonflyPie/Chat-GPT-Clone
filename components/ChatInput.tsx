"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import useSendMessage from "../lib/useSendMessage";

const ChatInput = () => {
  const [value, setValue] = useState("");

  const path = usePathname();
  const { data: session } = useSession();

  let chatId = path ? path.split("/").slice(-1)[0] : null;

  const { loading, sendMessage } = useSendMessage({
    session,
    chatId,
    value,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setValue("");
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
    <div className="w-full p-5 text-base flex justify-center bg-background">
      <form
        ref={formRef}
        className=" gap-1 border-l-gray-900/50 text-white bg-gray_light rounded-md flex shadow-[0_0_15px_rgba(0,0,0,0.10)] md:max-w-3xl w-full "
        onSubmit={handleSubmit}
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

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="hover:bg-dark_gray p-1 rounded-md disabled:hover:bg-transparent"
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

// if (!value) return;
// if (loading) return;

// setLoading(true);

// const question = value.trim();

// const message: IMessage = {
//   text: question,
//   createdAt: serverTimestamp(),
//   read: true,
//   user: {
//     _id: session?.user?.email!,
//     name: session?.user?.name!,
//     avatar:
//       session?.user?.image ||
//       `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
//   },
// };

// const blankResponse: IMessage = {
//   text: "",
//   createdAt: serverTimestamp(),
//   read: false,
//   user: {
//     _id: "chatGPT",
//     name: "chatGPT",
//     avatar: "/chatgpt-icon.png",
//   },
// };

// setValue("");

// if (!chatId) {
//   const doc = await addDoc(
//     collection(db, "users", session?.user?.email!, "chats"),
//     {
//       userId: session?.user?.email!,
//       createdAt: serverTimestamp(),
//     }
//   );
//   chatId = doc.id;

//   router.push(`/chat/${chatId}`);
// }

// await addDoc(
//   collection(
//     db,
//     "users",
//     session?.user?.email!,
//     "chats",
//     chatId,
//     "messages"
//   ),
//   message
// );

// const responseMessage = await addDoc(
//   collection(
//     db,
//     "users",
//     session?.user?.email!,
//     "chats",
//     chatId,
//     "messages"
//   ),
//   blankResponse
// );

// await fetch("/api/askQuestion", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     text: question,
//     chatId,
//     model,
//     session,
//     messageId: responseMessage.id,
//   }),
// });

// setLoading(false);
