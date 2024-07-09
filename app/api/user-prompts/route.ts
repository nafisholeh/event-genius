import { NextResponse } from "next/server";

import RetrieveUserPromptFactory from "@/factory/RetrieveUserPromptFactory";
import prisma from "@/providers/db";

export async function POST() {
  const retrieveUserPromptFactory = new RetrieveUserPromptFactory(prisma);

  try {
    const data = await retrieveUserPromptFactory.execute();

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
