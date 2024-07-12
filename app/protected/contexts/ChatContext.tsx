"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ChatContextType {
  isRetrievingChat: boolean;
  setIsRetrievingChat: Dispatch<SetStateAction<boolean>>;
}

const defaultChatContext: ChatContextType = {
  isRetrievingChat: false,
  setIsRetrievingChat: () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultChatContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [isRetrievingChat, setIsRetrievingChat] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        isRetrievingChat,
        setIsRetrievingChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
