"use client";

/// <reference types="react/canary" />
import React from "react";

import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { sendMessage } from "../actions/ai";

export default function Chat() {
  const [messages, setMessages] = useState<React.JSX.Element[]>([]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View
        style={{
          flex: 1,
          padding: 16,
          justifyContent: "center",
        }}
      >
        <ScrollView style={{ flex: 1, marginBottom: 16 }}>
          <View>{messages}</View>
        </ScrollView>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            onSubmitEditing={async ({ nativeEvent: { text } }) => {
              const message = await sendMessage(text);

              setMessages((prev) => [...prev, message]);
            }}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 8,
              paddingHorizontal: 8,
            }}
            placeholder="Type your message..."
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
