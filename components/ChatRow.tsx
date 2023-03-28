import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import ChatIcon from "./icons/ChatIcon";
import EditIcon from "./icons/EditIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SaveEditIcon from "./icons/SaveEditIcon";
import useClickOutside from "../lib/useClickOutside";
import useFirebaseChat from "../lib/useFirebaseChat";

interface ChatRowProps {
  id: string;
  name: string;
}

const ChatRow = ({ id, name }: ChatRowProps) => {
  const [active, setActive] = useState(false);
  const [edit, setEdit] = useState(false);

  const path = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user?.email;
  const { deleteChat, nameChat } = useFirebaseChat({
    user,
    id,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!path) return;
    setActive(path.includes(id));
  }, [path]);

  useClickOutside(inputRef, () => setEdit(false));

  const toggleEditModeOn = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setEdit(true);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    deleteChat(id);

    if (active) {
      router.push("/");
    }
  };

  const handleRename = async () => {
    const name = inputRef.current?.value;
    if (name) nameChat({ name: name, id: id });

    setEdit(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleRename();
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`text-gray-100 inline-flex gap-2 p-3 rounded group items-center ${
        active ? "bg-background hover:bg-background" : "hover:bg-gray_hover"
      }`}
    >
      <span className="">
        <ChatIcon />
      </span>
      <span className="relative grow">
        {edit ? (
          <input
            autoFocus
            ref={inputRef}
            className="bg-gray_light w-full px-1  ring-0 outline-none focus:ring-0 rounded "
            type="text"
            defaultValue={name}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <React.Fragment>
            <p className="text-ellipsis overflow-x-hidden break-all h-6 inline-flex capitalize  px-1">
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
      <span className="text-gray-300 inline-flex items-center gap-2">
        {edit ? (
          <span className="hover:text-white" onClick={handleRename}>
            <SaveEditIcon />
          </span>
        ) : (
          <span className="hover:text-white" onClick={toggleEditModeOn}>
            <EditIcon />
          </span>
        )}
        <span className="hover:text-white" onClick={handleDelete}>
          <TrashIcon />
        </span>
      </span>
    </Link>
  );
};

export default ChatRow;
