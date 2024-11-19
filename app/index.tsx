/// <reference types="react/canary" />

import EventCardSkeleton from "@/src/components/EventCardSkeleton";
import { PrismaClient } from "@prisma/client";
import Chat from "@src/components/Chat";
import React, { Suspense } from "react";
import { View } from "react-native";

const db = new PrismaClient();

export default async function Index() {
  const dbMessages = await db.message.findMany({
    where: { userId: 1 },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { citations: true },
  });

  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <EventCardSkeleton />
        </View>
      }
    >
      <Chat messages={dbMessages} />
    </Suspense>
  );
}
