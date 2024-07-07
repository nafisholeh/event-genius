import ValidateUserAuthFactory from "@/factory/ValidateUserAuthFactory";
import { redirect } from "next/navigation";
import ChatWindow from "./components/ChatWindow";

export default async function ProtectedPage() {
  const validateUserAuthFactory = new ValidateUserAuthFactory();
  const isValidAuth = validateUserAuthFactory.execute();

  if (!isValidAuth) {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white border-r">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Chat Messages</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-2xl font-bold">0/50</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Chats</h2>
          <div className="space-y-2">
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">Chat with John Doe</button>
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">Chat with Jane Doe</button>
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">Chat with Test User</button>
            <button className="w-full p-2 text-left bg-black text-white rounded-lg">Start New Chat</button>
          </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <ChatWindow />
    </div>
  );
}
