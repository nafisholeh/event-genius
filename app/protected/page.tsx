import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white border-r">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Your Plan</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Beta User</p>
            <p className="text-sm text-gray-500">Expiry date is unavailable</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Chat Messages</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-2xl font-bold">0/50</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Chats</h2>
          <div className="space-y-2">
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">
              Chat with John Doe
            </button>
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">
              Chat with Jane Doe
            </button>
            <button className="w-full p-2 text-left bg-gray-100 rounded-lg">
              Chat with Test User
            </button>
            <button className="w-full p-2 text-left bg-black text-white rounded-lg">
              Start New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Chat UI</h2>
        <div className="flex-1 p-4 bg-white border rounded-lg">
          <p className="text-gray-500">Welcome to the chat!</p>
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg"
          />
          <button className="p-2 bg-black text-white rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
}
