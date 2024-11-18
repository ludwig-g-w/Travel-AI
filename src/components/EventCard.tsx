import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

interface EventCardProps {
  event: {
    title: string;
    date: string;
    location: string;
    description: string;
    url?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <TouchableOpacity
      onPress={() => event.url && Linking.openURL(event.url)}
      disabled={!event.url}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          {event.title}
        </Text>
        <View style={{ gap: 4 }}>
          <Text style={{ fontWeight: "bold" }}>
            Date: <Text style={{ fontWeight: "normal" }}>{event.date}</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Location:{" "}
            <Text style={{ fontWeight: "normal" }}>{event.location}</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Description:{" "}
            <Text style={{ fontWeight: "normal" }}>{event.description}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
