"use client";

import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function ChatSessions() {
  const { sessionChangeDisabled, sessions, sessionId, setSessionId, addSession } = useContext(SessionContext);

  return (
    <div>
      <div className="flex flex-row justify-between items-end mb-4">
        <div>
          <h2 className="text-lg font-bold">Chats</h2>
        </div>
        <button
          className={`${sessionChangeDisabled ? "bg-slate-100 pointer-events-none" : "bg-black"} text-2xl text-white rounded-full w-[40px] h-[40px]`}
          onClick={() => {
            if (!sessionChangeDisabled) {
              addSession();
            }
          }}>
          +
        </button>
      </div>
      <div className="space-y-2">
        {sessions?.length
          ? sessions.map((session) => (
              <button
                key={session}
                className={`${sessionId === session ? "bg-black text-white" : "bg-gray-100"} ${sessionChangeDisabled ? "bg-slate-100 pointer-events-none text-white" : ""} w-full p-2 text-left rounded-lg`}
                onClick={() => {
                  if (!sessionChangeDisabled) {
                    setSessionId(session);
                  }
                }}>
                Chat with Session {session}
              </button>
            ))
          : null}
      </div>
    </div>
  );
}
