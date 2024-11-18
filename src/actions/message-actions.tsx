"use server";
import { Citation, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function createMessage({
  input,
  userId = 1,
  type = "none",
  citations = [],
}: {
  input: string;
  userId?: number;
  type: "none" | "events";
  citations?: { url: string }[];
}) {
  try {
    const message = await db.message.create({
      data: {
        input,
        type,
        userId,
        citations: {
          create: citations,
        },
      },
    });

    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
