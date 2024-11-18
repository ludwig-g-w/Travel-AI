"use server";
import "server-only";

import RecursiveText from "@/src/components/RecursiveText";
import OpenAI from "openai";
import React, { Suspense } from "react";
import { createMessage } from "./message-actions";
const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export async function sendCustomMessage(message: string) {
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

export async function searchForEventsTodayWithPerplexity(
  userDescription: string
) {
  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.1-sonar-small-128k-online",
      return_citations: true,
      search_domain_filter: ["eventbrite.com", "meetup.com"],
      messages: [
        {
          role: "system",
          content: `You are an event finder assistant. Always format your responses exactly like this example, with exactly 3 events:

1. **Event Title**:
   - **Location**: Place name
   - **Time**: Time of event
   - **Description**: Brief description[1]

2. **Event Title**:
   - **Location**: Place name
   - **Time**: Time of event
   - **Description**: Brief description[2]

3. **Event Title**:
   - **Location**: Place name
   - **Time**: Time of event
   - **Description**: Brief description[3]`,
        },
        {
          role: "user",
          content: `Search on https://www.eventbrite.com/d/france--nice/events--today/?page=1 and https://www.meetup.com/find/?location=fr--Nice&source=EVENTS&dateRange=today&eventType=inPerson to suggest 3 events that would fit the following description and make sure it is happening today which is ${new Date().toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}: ${userDescription}`,
        },
      ],
    });

    const citations: string[] = (response as any).citations;
    console.log(JSON.stringify(response, null, 2));

    await createMessage({
      input: response.choices[0].message.content ?? "",
      citations: citations.map((citation: string) => ({
        url: citation,
      })),
      type: "events",
      userId: 1,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
