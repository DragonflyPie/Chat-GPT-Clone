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
  // const [value, setValue] = useState("");

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
        name: value.trim().slice(0, 20),
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
    <div className="w-full p-5 text-base flex bottom-0 justify-center bg-background border-t border-white/20 md:border-none">
      <form
        ref={formRef}
        className=" gap-1 border-l-gray-900/50 text-white bg-gray_light rounded-md flex shadow-[0_0_15px_rgba(0,0,0,0.10)] md:max-w-3xl w-full "
        onSubmit={handleSubmit}
        onClick={() => textareaRef.current?.focus()}
      >
        <div className="flex grow pr-2 py-2 md:py-3 md:pl-3 ">
          <textarea
            autoFocus={true}
            ref={textareaRef}
            rows={1}
            tabIndex={0}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            className="bg-transparent resize-none w-full overflow-y-hidden h-6 max-h-52 outline-none pl-2 pr-4"
            value={value}
            placeholder="Send a message..."
          />

          {loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="hover:bg-dark_gray p-1 rounded-md disabled:hover:bg-transparent disabled:text-text_disabled"
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
