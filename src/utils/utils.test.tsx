import { MessageWithCitations } from "../components/Chat";
import { parseEventsFromText } from "@src/utils";

const testMessage: MessageWithCitations = {
  id: 1,
  input:
    "Based on the provided sources, here are three events that might fit the description and are happening today, Monday, November 18, 2024:\n\n1. **Afterwork Blindtest MSHS**:\n   - **Location**: 25 Av. François Mitterrand\n   - **Time**: 5:30 PM\n   - **Description**: An afterwork event where participants can meet new people and enjoy a blind test activity, potentially making it an Instagrammable moment[4].\n\n2. **Festival du cinéma social - 20 nov. soirée - cinéma Belmondo**:\n   - **Location**: Cinéma Jean-Paul Belmondo\n   - **Time**: 8:00 PM (though it's scheduled for November 20, it might be a recurring event or have a special screening today)\n   - **Description**: A film festival event that could attract a young audience and offer opportunities to meet new people, possibly with Instagrammable moments[4].\n\n3. **Les Cafés Business - Chez Paulette - Nice**:\n   - **Location**: Chez Paulette\n   - **Time**: 8:30 AM\n   - **Description**: A business café event where young professionals might gather, providing a setting for networking and potentially meeting new friends, which could be documented on Instagram[4].",
  citations: [
    { id: 1, messageId: 1, url: "www.testurl.com" },
    { id: 2, messageId: 1, url: "www.testurl2.com" },
    { id: 3, messageId: 1, url: "www.testurl3.com" },
    { id: 3, messageId: 1, url: "www.testurl3.com" },
  ],
  type: "events",
  userId: 1,
  createdAt: new Date(),
};

test("parseEventsFromText", () => {
  const events = parseEventsFromText(testMessage);

  expect(events[0].url).toEqual("www.testurl.com");
});
