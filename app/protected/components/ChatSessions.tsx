"use client";

import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function ChatSessions() {
  const { sessions, setSessionId, addSession } = useContext(SessionContext);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Chats</h2>
      <div className="space-y-2">
        {sessions.map((session) => (
          <button
            key={session}
            className="w-full p-2 text-left bg-gray-100 rounded-lg"
            onClick={() => setSessionId(session)}>
            Chat with Session {session}
          </button>
        ))}
        <button className="w-full p-2 text-left bg-black text-white rounded-lg" onClick={addSession}>
          Start New Chat
        </button>
      </div>
    </div>
  );
}
