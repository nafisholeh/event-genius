"use client";

import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ChatSessions from "./ChatSessions";
import ChatTotal from "./MessageTotal";

export default function SideBar() {
  const { sessions } = useContext(SessionContext);
  const hasNoSessions = sessions.length === 0;

  return (
    <div className={`${hasNoSessions ? "hidden" : "block"} w-1/4 p-4 bg-white border-r`}>
      <ChatTotal />

      <div>
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        <ChatSessions />
      </div>
    </div>
  );
}