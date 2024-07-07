"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Message } from "ai";
import { useChat } from "ai/react";

export default function ChatWindow() {
  const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, unknown>>({});

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    // isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: "api/chat",
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8")) : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({ ...sourcesForMessages, [messageIndexHeader]: sources });
      }
    },
    streamMode: "text",
    onError: (e) => {
      console.log(e.message);
    },
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e);
    setInput("");

    const messagesWithUserReply = messages.concat({ id: messages.length.toString(), content: input, role: "user" });

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

      const toolCallMessages = responseMessages.filter((responseMessage: Message) => {
        return (
          (responseMessage.role === "assistant" && !!responseMessage.tool_calls?.length) ||
          responseMessage.role === "tool"
        );
      });

      const intermediateStepMessages = [];
      for (let i = 0; i < toolCallMessages.length; i += 2) {
        const aiMessage = toolCallMessages[i];
        const toolMessage = toolCallMessages[i + 1];
        intermediateStepMessages.push({
          id: (messagesWithUserReply.length + i / 2).toString(),
          role: "system" as const,
          content: JSON.stringify({
            action: aiMessage.tool_calls?.[0],
            observation: toolMessage.content,
          }),
        });
      }

      const newMessages = messagesWithUserReply;
      for (const message of intermediateStepMessages) {
        newMessages.push(message);
        setMessages([...newMessages]);
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
      }

      setMessages([
        ...newMessages,
        {
          id: newMessages.length.toString(),
          content: responseMessages[responseMessages.length - 1].content,
          role: "assistant",
        },
      ]);
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Chat UI</h2>
      <div className="flex-1 p-4 bg-white border rounded-lg overflow-y-scroll">
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
                  {m.content}
                </p>
              );
            })
          : "Welcome to the chats!"}
      </div>
      <form onSubmit={sendMessage} className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button className="p-2 bg-black text-white rounded-r-lg">Send</button>
      </form>
    </div>
  );
}
