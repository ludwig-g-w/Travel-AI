/// <reference types="react/canary" />

import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";

export default function Index() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
      // Here you would typically send the input to your backend or API
      // and receive a response to add to the messages.
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ flex: 1, marginBottom: 16 }}>
        {messages.map((message, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <Text>{message}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 8,
          paddingHorizontal: 8,
        }}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}
