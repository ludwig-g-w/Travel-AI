import { View } from "react-native";
import EventCard from "@/src/components/EventCard";
import EventCardStack from "../components/EventCardStack";
import { MessageWithCitations } from "@/src/components/Chat";

export function formatEventResponse(message: MessageWithCitations) {
  const events = parseEventsFromText(message);

  return <EventCardStack events={events} />;
}

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  url?: string;
}

export function parseEventsFromText(message: MessageWithCitations): Event[] {
  const events: Event[] = [];
  const eventRegex =
    /\d+\.\s+\*\*(.*?)\*\*:\s*\n\s*-\s*\*\*Location\*\*:\s*(.*?)\n\s*-\s*\*\*Time\*\*:\s*(.*?)\n\s*-\s*\*\*Description\*\*:\s*(.*?)\[(\d+)\]\.(?=\n\n|\n\d+\.|$)/gs;

  let match;
  while ((match = eventRegex.exec(message.input)) !== null) {
    const citationNumber = match[5] ? parseInt(match[5]) : -1;
    const citation = message.citations?.find((c) => c.id === citationNumber);

    events.push({
      title: match[1],
      date: match[3],
      location: match[2],
      description: match[4].trim(),
      url: citation?.url,
    });
  }
  return events;
}
