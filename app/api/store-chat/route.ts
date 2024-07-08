import { NextRequest, NextResponse } from "next/server";

import RecordMessageFactory from "@/factory/RecordMessageFactory";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, role, sessionId } = body;

  const prismaClient = new PrismaClient();
  const recordMessageFactory = new RecordMessageFactory(prismaClient);

  try {
    const data = await recordMessageFactory.execute({ content, role, sessionId });

    return NextResponse.json({ data });
  } catch (e) {
    console.log("e: ", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
