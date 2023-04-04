import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import ChatIcon from "./icons/ChatIcon";
import EditIcon from "./icons/EditIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteChat, nameChat } from "../lib/firebaseUtils";
import RowInput from "./RowInput";
import ConfirmationIcons from "./ConfirmationIcons";

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

  const rowRef = useRef<HTMLAnchorElement>(null);

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
      className={`group inline-flex items-center gap-2 rounded p-3 text-gray-100 ${
        active ? "bg-background hover:bg-background" : "hover:bg-gray_hover"
      }`}
      ref={rowRef}
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
          <RowInput name={name} inputRef={inputRef} renameChat={renameChat} />
        ) : (
          <React.Fragment>
            <p className="inline-flex h-6 overflow-hidden text-ellipsis break-all px-1  capitalize">
              {name}
            </p>
            <div
              className={`absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l   ${
                active
                  ? "from-background group-hover:from-background"
                  : "from-dark_gray group-hover:from-gray_hover"
              }`}
            ></div>
          </React.Fragment>
        )}
      </span>
      {active && (
        <span className="flex items-center text-gray_icons">
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
            <ConfirmationIcons
              defaultModeOn={() => setMode("default")}
              saveChanges={saveChanges}
              rowRef={rowRef}
            />
          )}
        </span>
      )}
    </Link>
  );
};

export default ChatRow;
