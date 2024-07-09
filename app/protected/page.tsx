import ValidateUserAuthFactory from "@/factory/ValidateUserAuthFactory";
import { redirect } from "next/navigation";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import { SessionContextProvider } from "./contexts/SessionContext";
import { MessageTotalContextProvider } from "./contexts/MessageTotalContext";

export default async function ProtectedPage() {
  const validateUserAuthFactory = new ValidateUserAuthFactory();
  const isValidAuth = validateUserAuthFactory.execute();

  if (!isValidAuth) {
    return redirect("/login");
  }

  return (
    <SessionContextProvider>
      <MessageTotalContextProvider>
        <div className="flex h-screen w-full bg-gray-100">
          <SideBar />
          <ChatWindow />
        </div>
      </MessageTotalContextProvider>
    </SessionContextProvider>
  );
}
