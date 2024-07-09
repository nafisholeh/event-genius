"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface SessionContextType {
  sessions: number[];
  sessionId: number | null;
  setSessions: Dispatch<SetStateAction<number[]>>;
  setSessionId: Dispatch<SetStateAction<number | null>>;
  addSession: () => void;
}

const defaultSessionContext: SessionContextType = {
  sessions: [],
  sessionId: null,
  setSessions: () => {},
  setSessionId: () => {},
  addSession: () => {},
};

export const SessionContext = createContext<SessionContextType>(defaultSessionContext);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<number[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const addSession = () => {
    const newSessionId = sessions?.length || 0;
    setSessions((prevSessions) => [...prevSessions, newSessionId]);
    setSessionId(newSessionId);
  };

  return (
    <SessionContext.Provider value={{ sessions, sessionId, setSessions, setSessionId, addSession }}>
      {children}
    </SessionContext.Provider>
  );
};
