import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import RetrieveChatFactory from "@/factory/RetrieveChatFactory";

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId } = body;

  const retrieveChatFactory = new RetrieveChatFactory(prismaClient);

  try {
    const data = await retrieveChatFactory.execute({ sessionId: sessionId });

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
