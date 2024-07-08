"use client";

import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ChatSessions from "./ChatSessions";

export default function SideBar() {
  const { sessions } = useContext(SessionContext);
  const hasNoSessions = sessions.length === 0;

  return (
    <div className={`${hasNoSessions ? "hidden" : "block"} w-1/4 p-4 bg-white border-r`}>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Chat Messages</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-2xl font-bold">0/50</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        <ChatSessions />
      </div>
    </div>
  );
}
