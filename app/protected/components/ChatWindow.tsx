"use client";

import { useEffect, useContext, useCallback, KeyboardEvent, useRef } from "react";
import type { FormEvent } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";
import Markdown from "markdown-to-jsx";
import { SessionContext } from "../contexts/SessionContext";
import { MessageTotalContext } from "../contexts/MessageTotalContext";

export default function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { sessions, sessionId, setSessions, addSession } = useContext(SessionContext);
  const { setMessageTotal } = useContext(MessageTotalContext);

  const { messages, input, setInput, handleInputChange, handleSubmit, setMessages, isLoading } = useChat({
    api: "api/chat",
    streamMode: "text",
    onError: (e) => {
      console.log(e.message);
    },
  });

  const retriveSession = useCallback(async () => {
    const response = await fetch("api/retrieve-session", {
      method: "POST",
    });
    const json = await response.json();
    const sessions = json.data;
    setSessions(sessions);
  }, [setSessions]);

  useEffect(() => {
    retriveSession();
  }, [retriveSession]);

  const retrieveChat = useCallback(async () => {
    const response = await fetch("api/retrieve-chat", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
    const json = await response.json();
    const messages = json.data;
    setMessageTotal(messages.length);
    setMessages(messages);
  }, [sessionId, setMessages, setMessageTotal]);

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

    // AI completed its response
    if (!isLoading) {
      recordAIMessage();
    }
  }, [isLoading]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e);
    setInput("");

    // if there are no sessions, create a new session
    if (sessions.length === 0) {
      addSession();
    }

    const currentSession = sessions.length === 0 ? 0 : sessionId;
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

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Event Genius</h2>
      <div ref={chatWindowRef} className="flex-1 p-4 bg-white border rounded-lg overflow-y-scroll">
        {messages.length > 0
          ? [...messages].map((m, i) => {
              return (
                <p
                  key={i}
                  className={`mb-2 ${
                    m.role === "user"
                      ? "table px-5 py-4 max-w-xl rounded-3xl bg-gray-300 text-black self-end ml-auto"
                      : "whitespace-pre-wrap p-3 w-full text-black self-start leading-snug"
                  }`}>
                  <Markdown
                    options={{
                      overrides: {
                        p: {
                          props: {
                            className: "mb-4",
                          },
                        },
                      },
                    }}>
                    {m.content}
                  </Markdown>
                </p>
              );
            })
          : "Your event planning assistant is here. How can I help you?"}
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
        <button className="p-2 bg-black text-white rounded-r-lg">Send</button>
      </form>
    </div>
  );
}
