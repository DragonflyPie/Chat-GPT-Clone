import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import ChatIcon from "./icons/ChatIcon";
import EditIcon from "./icons/EditIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteChat, nameChat } from "../lib/firebaseUtils";
import RowInput from "./RowInput";
import { CheckIcon } from "@heroicons/react/24/outline";
import CloseIcon from "./icons/CloseIcon";

interface ChatRowProps {
  id: string;
  name: string;
}

const ChatRow = ({ id, name }: ChatRowProps) => {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<"default" | "edit" | "delete">("default");

  const path = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const email = session?.user?.email;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!path) return;
    setActive(path.includes(id));
  }, [path]);

  const renameChat = () => {
    const name = inputRef.current?.value;
    name && nameChat({ name, id, email });

    setMode("default");
  };

  const saveChanges = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (mode === "edit") {
      renameChat();
    } else {
      if (!email || !id) return;
      deleteChat({ email, id });
      active && router.push("/");
    }
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`text-gray-100 inline-flex gap-2 p-3 rounded group items-center ${
        active ? "bg-background hover:bg-background" : "hover:bg-gray_hover"
      }`}
    >
      <span className="">
        {mode === "default" ? (
          <ChatIcon />
        ) : mode === "edit" ? (
          <EditIcon />
        ) : (
          <TrashIcon />
        )}
      </span>
      <span className="relative grow">
        {mode === "edit" ? (
          <RowInput
            name={name}
            inputRef={inputRef}
            renameChat={renameChat}
            editOff={() => setMode("default")}
          />
        ) : (
          <React.Fragment>
            <p className="text-ellipsis overflow-hidden break-all h-6 inline-flex capitalize  px-1">
              {name}
            </p>
            <div
              className={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l   ${
                active
                  ? "from-background group-hover:from-background"
                  : "from-dark_gray group-hover:from-gray_hover"
              }`}
            ></div>
          </React.Fragment>
        )}
      </span>
      {active && (
        <span className="text-gray_icons flex items-center">
          {mode === "default" ? (
            <div className="inline-flex items-center gap-2">
              <span
                className="hover:text-white"
                onClick={() => setMode("edit")}
              >
                <EditIcon />
              </span>
              <span
                className="hover:text-white"
                onClick={() => setMode("delete")}
              >
                <TrashIcon />
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2">
              <span className="hover:text-white" onClick={saveChanges}>
                <CheckIcon className="hover:text-white h-[1.1rem] w-[1.1rem]" />
              </span>
              <span
                className="hover:text-white"
                onClick={() => setMode("default")}
              >
                <CloseIcon size={5} />
              </span>
            </div>
          )}
        </span>
      )}
    </Link>
  );
};

export default ChatRow;
