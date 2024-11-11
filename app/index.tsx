/// <reference types="react/canary" />

import OpenAI from "openai";
import React, { Suspense } from "react";
import Chat from "@/src/components/Chat";
import RecursiveText from "@/src/components/RecursiveText";
import { ChatCompletionMessageParam } from "openai/resources/chat";

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

const msgs = [
  {
    role: "system",
    content: "make the shortest possible response",
  },
] as ChatCompletionMessageParam[];

export default async function Index() {
  // @ts-expect-error
  return <Chat sendMessage={sendMessage} />;
}

export async function sendMessage(message: string) {
  "use server";

  const response = await openai.chat.completions.create({
    model: "llama-3.1-sonar-small-128k-online",
    messages: [...msgs, { role: "user", content: message }],
    stream: true,
  });
  const stream = response.toReadableStream();
  const reader = stream.getReader();

  return (
    <Suspense>
      <RecursiveText buffer={reader} />
    </Suspense>
  );
}
