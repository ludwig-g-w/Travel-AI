"use server";
import OpenAI from "openai";
import React, { Suspense } from "react";
import RecursiveText from "@/src/components/RecursiveText";
import { Text, View } from "react-native";
import EventCard from "@/src/components/EventCard";
const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
}

function parseEventsFromText(text: string): Event[] {
  const events: Event[] = [];
  const eventRegex =
    /\*\*(.*?)\*\*\s*-\s*\*\*Date:\*\*\s*(.*?)\s*-\s*\*\*Location:\*\*\s*(.*?)\s*-\s*\*\*Description:\*\*\s*(.*?)(?=\n\n|$)/gs;

  let match;
  while ((match = eventRegex.exec(text)) !== null) {
    events.push({
      title: match[1],
      date: match[2],
      location: match[3],
      description: match[4],
    });
  }
  return events;
}

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
  const response = await openai.chat.completions.create({
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      {
        role: "user",
        content:
          "Search on https://www.eventbrite.fr/d/france--nice/events--today/ to suggest 3 events that would fit the following description: " +
          userDescription,
      },
    ],
  });

  const text = response.choices[0].message.content ?? "";
  const events = parseEventsFromText(text);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={{ gap: 8 }}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </View>
    </Suspense>
  );
}
