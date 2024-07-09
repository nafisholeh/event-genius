"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface SessionContextType {
  sessionChangeDisabled: boolean;
  sessions: number[];
  sessionId: number | null;
  setSessionChangeDisabled: Dispatch<SetStateAction<boolean>>;
  setSessions: Dispatch<SetStateAction<number[]>>;
  setSessionId: Dispatch<SetStateAction<number | null>>;
  addSession: () => void;
}

const defaultSessionContext: SessionContextType = {
  sessionChangeDisabled: false,
  sessions: [],
  sessionId: null,
  setSessionChangeDisabled: () => {},
  setSessions: () => {},
  setSessionId: () => {},
  addSession: () => {},
};

export const SessionContext = createContext<SessionContextType>(defaultSessionContext);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<number[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [sessionChangeDisabled, setSessionChangeDisabled] = useState<boolean>(false);

  const addSession = () => {
    const newSessionId = sessions?.length || 0;
    setSessions((prevSessions) => [...prevSessions, newSessionId]);
    setSessionId(newSessionId);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionChangeDisabled,
        sessions,
        sessionId,
        setSessionChangeDisabled,
        setSessions,
        setSessionId,
        addSession,
      }}>
      {children}
    </SessionContext.Provider>
  );
};
