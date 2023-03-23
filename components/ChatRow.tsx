import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import ChatIcon from "./icons/ChatIcon";
import SaveEditIcon from "./icons/SaveEdit";
import EditIcon from "./icons/EditIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import SaveEdit from "./icons/SaveEdit";
import useClickOutside from "../lib/useClickOutside";

interface ChatRowProps {
  id: string;
  name: string;
}

const ChatRow = ({ id, name }: ChatRowProps) => {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const docRef = doc(db, "users", session?.user?.email!, "chats", id);

  useEffect(() => {
    const getName = async () => {
      const chatSnap = await getDoc(docRef);
      const chatData = chatSnap.data();

      if (chatData && !chatData.name) {
        const q = query(
          collection(
            db,
            "users",
            session?.user?.email!,
            "chats",
            id,
            "messages"
          ),
          orderBy("createdAt", "asc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.docs.length) return;
        const newName = querySnapshot.docs[0].data().text.trim();
        await updateDoc(docRef, { name: newName });
      }
    };
    getName();
  }, [docRef, name]);

  const [edit, setEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!path) return;
    setActive(path.includes(id));
  }, [path]);

  const handler = () => {
    console.log("click");
    setEdit(false);
  };

  useClickOutside(inputRef, handler);
  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     // e.stopPropagation();
  //     console.log("click");
  //     if (inputRef.current && !inputRef.current.contains(e.target as Node))
  //       setEdit(false);
  //   };
  //   document.addEventListener("click", handleClick, true);

  //   return () => document.removeEventListener("click", handleClick, true);
  // }, [inputRef]);

  const editName = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setEdit(true);
  };

  const deleteChat = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    if (active) {
      router.push("/");
    }
  };

  const saveName = async () => {
    const name = inputRef.current?.value;
    if (name) await updateDoc(docRef, { name: name });
    setEdit(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") saveName();
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
            <p className="text-ellipsis overflow-hidden break-all max-h-5 table-cell px-1">
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
          <span className="hover:text-white" onClick={saveName}>
            <SaveEdit />
          </span>
        ) : (
          <span className="hover:text-white" onClick={editName}>
            <EditIcon />
          </span>
        )}
        <span className="hover:text-white" onClick={deleteChat}>
          <TrashIcon />
        </span>
      </span>
    </Link>
  );
};

export default ChatRow;
