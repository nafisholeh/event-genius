"use client";

import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ChatSessions from "./ChatSessions";
import MessageTotal from "./MessageTotal";

export default function SideBar() {
  const { sessions } = useContext(SessionContext);
  const hasSessions = sessions.length > 0;
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (hasSessions) {
      setIsCollapsed(false);
    }
  }, [hasSessions]);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isCollapsed ? "-translate-x-full sm:w-1 pr-5" : "translate-x-0 sm:w-1/4 p-5 pr-8"
        } bg-white border-r transition-transform duration-300 ease-in-out sm:static sm:block`}>
        {!isCollapsed && (
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <MessageTotal />
              <ChatSessions />
            </div>
            <div
              className="absolute top-0 right-0 h-full w-6 bg-slate-50 flex items-center justify-center cursor-pointer text-slate-400"
              onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? ">" : "<"}
            </div>
          </div>
        )}
      </div>

      <div
        className={`${isCollapsed ? "visible" : "hidden"} fixed inset-y-0 left-0 h-full w-6 bg-slate-50 flex items-center justify-center cursor-pointer text-slate-400 transition-transform duration-300 ease-in-out ${
          isCollapsed ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? ">" : "<"}
      </div>
    </>
  );
}
