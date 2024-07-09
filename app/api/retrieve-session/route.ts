import { NextResponse } from "next/server";

import RetrieveSessionFactory from "@/factory/RetrieveSessionFactory";
import prisma from "@/providers/db";

export async function POST() {
  const retrieveSessionFactory = new RetrieveSessionFactory(prisma);

  try {
    const data = await retrieveSessionFactory.execute();

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
