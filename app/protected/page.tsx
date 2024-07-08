import ValidateUserAuthFactory from "@/factory/ValidateUserAuthFactory";
import { redirect } from "next/navigation";
import ChatWindow from "./components/ChatWindow";
import { SessionContextProvider } from "./contexts/SessionContext";
import SideBar from "./components/SideBar";

export default async function ProtectedPage() {
  const validateUserAuthFactory = new ValidateUserAuthFactory();
  const isValidAuth = validateUserAuthFactory.execute();

  if (!isValidAuth) {
    return redirect("/login");
  }

  return (
    <SessionContextProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <SideBar />
        <ChatWindow />
      </div>
    </SessionContextProvider>
  );
}
