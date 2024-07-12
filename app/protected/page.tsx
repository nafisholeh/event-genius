import ValidateUserAuthFactory from "@/factory/ValidateUserAuthFactory";
import { redirect } from "next/navigation";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import { SessionContextProvider } from "./contexts/SessionContext";
import { MessageTotalContextProvider } from "./contexts/MessageTotalContext";
import { ChatContextProvider } from "./contexts/ChatContext";

export default async function ProtectedPage() {
  const validateUserAuthFactory = new ValidateUserAuthFactory();
  const isValidAuth = validateUserAuthFactory.execute();

  if (!isValidAuth) {
    return redirect("/login");
  }

  return (
    <SessionContextProvider>
      <MessageTotalContextProvider>
        <ChatContextProvider>
          <div className="flex h-screen w-full bg-gray-100">
            <SideBar />
            <ChatWindow />
          </div>
        </ChatContextProvider>
      </MessageTotalContextProvider>
    </SessionContextProvider>
  );
}
