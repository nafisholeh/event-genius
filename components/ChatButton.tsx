"use client";

import { useRouter } from "next/navigation";

export default function ChatButton() {
  const router = useRouter();

  const gotToChat = () => {
    router.push("/protected");
  };

  return (
    <button
      onClick={gotToChat}
      className="py-2 px-4 min-w-[100px] sm:min-w-[300px] mb-16 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Let&apos;s Chat
    </button>
  );
}
