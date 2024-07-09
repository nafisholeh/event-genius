"use client";

import { useContext } from "react";
import { MessageTotalContext } from "../contexts/MessageTotalContext";

export default function MessageTotal() {
  const { messageTotal } = useContext(MessageTotalContext);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">Chat Messages</h2>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-2xl font-bold">{messageTotal}</p>
      </div>
    </div>
  );
}
