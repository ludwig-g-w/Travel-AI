"use server";
import OpenAI from "openai";
import React, { Suspense } from "react";
import RecursiveText from "@/src/components/RecursiveText";

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export async function sendMessage(message: string) {
  const response = await openai.chat.completions.create({
    model: "llama-3.1-sonar-small-128k-online",
    messages: [{ role: "user", content: message }],
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
