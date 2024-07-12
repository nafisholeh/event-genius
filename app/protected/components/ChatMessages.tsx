import { Message } from "ai";
import Markdown from "markdown-to-jsx";

type ChatMessagesType = {
  messages: Message[];
  loading: boolean;
};

export default function ChatMessages({ messages = [], loading = false }: ChatMessagesType) {
  if (loading) {
    return "Loading...";
  }

  if (messages.length === 0) {
    return "Your event planning assistant is here. How can I help you?";
  }

  return (
    <>
      {[...messages].map((m, i) => {
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
      })}
    </>
  );
}
