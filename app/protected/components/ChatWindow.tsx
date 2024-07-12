"use client";

import { useEffect, useState, useContext, useCallback, KeyboardEvent, useRef } from "react";
import type { FormEvent } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";
import { SessionContext } from "../contexts/SessionContext";
import { MessageTotalContext } from "../contexts/MessageTotalContext";
import WordCloudContainer from "./WordCloud";
import ChatMessages from "./ChatMessages";

type UIModeType = "chat" | "wordcloud";

export default function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [mode, setMode] = useState<UIModeType>("chat");
  const [isRetrievingChat, setIsRetrievingChat] = useState<boolean>(false);

  const { sessions, sessionId, sessionChangeDisabled, setSessionChangeDisabled, setSessions, addSession } =
    useContext(SessionContext);
  const { setMessageTotal } = useContext(MessageTotalContext);

  const { messages, input, setInput, handleInputChange, handleSubmit, setMessages, isLoading } = useChat({
    api: "api/chat",
    streamMode: "text",
    onError: (e) => {
      console.log(e.message);
    },
  });

  const retriveSession = useCallback(async () => {
    setIsRetrievingChat(true);
    const response = await fetch("api/retrieve-session", {
      method: "POST",
    });
    const json = await response.json();
    const sessions = json.data;
    setSessions(sessions);
    setIsRetrievingChat(false);
  }, [setSessions]);

  useEffect(() => {
    retriveSession();
  }, [retriveSession]);

  const retrieveChat = useCallback(async () => {
    try {
      // cancel any ongoing message retrieval from previously selected session
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsRetrievingChat(true);

      const response = await fetch("api/retrieve-chat", {
        method: "POST",
        body: JSON.stringify({ sessionId }),
        signal: controller.signal,
      });
      const json = await response.json();
      const messages = json.data;

      setMessages(messages);
      setMessageTotal(messages?.length || 0);

      setIsRetrievingChat(false);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;

      setIsRetrievingChat(false);
    }
  }, [sessionId, setMessageTotal, setMessages]);

  useEffect(() => {
    if (sessionId !== null) {
      retrieveChat();
    }
  }, [sessionId, retrieveChat]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const recordAIMessage = async () => {
      const aiMessage = messages[messages.length - 1];
      if (aiMessage) {
        await fetch("api/store-chat", {
          method: "POST",
          body: JSON.stringify({ sessionId, content: aiMessage.content, role: aiMessage.role }),
        });
      }
    };

    if (isLoading) {
      // prevent user changing active sessions before AI response completed
      setSessionChangeDisabled(true);
    }
    // AI completed its response
    if (!isLoading) {
      setSessionChangeDisabled(false);
      recordAIMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    if (sessionChangeDisabled || isRetrievingChat) return;

    handleSubmit(e);
    setInput("");

    // if there are no sessions, create a new session
    if (sessions?.length === 0) {
      addSession();
    }

    const currentSession = sessions?.length === 0 ? 0 : sessionId;
    const messageObject = { sessionId: currentSession, content: input, role: "user" };
    const messagesWithUserReply = messages.concat({ id: messages.length.toString(), ...messageObject } as Message);

    await fetch("api/store-chat", {
      method: "POST",
      body: JSON.stringify(messageObject),
    });

    const response = await fetch("api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: messagesWithUserReply,
        show_intermediate_steps: true,
      }),
    });

    const json = await response.json();
    if (response.status === 200) {
      const responseMessages: Message[] = json.messages;

      setMessages([
        ...messagesWithUserReply,
        {
          id: messagesWithUserReply.length.toString(),
          content: responseMessages[responseMessages.length - 1].content,
          role: "assistant",
        },
      ]);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const toggleUIMode = () => {
    setMode((prevMode) => (prevMode === "wordcloud" ? "chat" : "wordcloud"));
  };

  return (
    <div className="flex-1 flex flex-col p-4 pl-9 sm:pl-4">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold">Event Genius</h2>
        <button className="bg-slate-500 rounded-lg text-white p-2" onClick={toggleUIMode}>
          {mode === "chat" ? "Word Cloud" : "Go to Chat"}
        </button>
      </div>
      {mode === "chat" ? (
        <>
          <div ref={chatWindowRef} className="flex-1 p-4 bg-white border rounded-lg overflow-y-scroll">
            <ChatMessages messages={messages} loading={isRetrievingChat} />
          </div>
          <form onSubmit={sendMessage} className="flex mt-4">
            <textarea
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
              className="flex-1 p-2 border rounded-l-lg resize-none overflow-y-auto max-h-24"
            />
            <button
              disabled={sessionChangeDisabled || isRetrievingChat}
              className={`p-2 rounded-r-lg ${
                sessionChangeDisabled || isRetrievingChat
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black text-white"
              }`}>
              Send
            </button>
          </form>
        </>
      ) : (
        <div ref={chatWindowRef} className="flex-1">
          <WordCloudContainer />
        </div>
      )}
    </div>
  );
}
