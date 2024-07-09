import { NextRequest, NextResponse } from "next/server";

import RetrieveChatFactory from "@/factory/RetrieveChatFactory";
import prisma from "@/providers/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId } = body;

  const retrieveChatFactory = new RetrieveChatFactory(prisma);

  try {
    const data = await retrieveChatFactory.execute({
      sessionId: sessionId,
    });

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
