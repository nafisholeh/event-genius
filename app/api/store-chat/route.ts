import { NextRequest, NextResponse } from "next/server";

import RecordMessageFactory from "@/factory/RecordMessageFactory";
import prisma from "@/providers/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, role, sessionId } = body;

  const recordMessageFactory = new RecordMessageFactory(prisma);

  try {
    const data = await recordMessageFactory.execute({ content, role, sessionId });

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
