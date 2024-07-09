"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface MessageTotalContextType {
  messageTotal: number;
  setMessageTotal: Dispatch<SetStateAction<number>>;
}

const defaultMessageTotalContext: MessageTotalContextType = {
  messageTotal: 0,
  setMessageTotal: () => {},
};

export const MessageTotalContext = createContext<MessageTotalContextType>(defaultMessageTotalContext);

export const MessageTotalContextProvider = ({ children }: { children: ReactNode }) => {
  const [messageTotal, setMessageTotal] = useState<number>(0);

  return (
    <MessageTotalContext.Provider value={{ messageTotal, setMessageTotal }}>{children}</MessageTotalContext.Provider>
  );
};
