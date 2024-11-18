"use client";
import { Message, Citation } from "@prisma/client";
import { searchForEventsTodayWithPerplexity } from "@src/actions/ai";
import { createMessage } from "@src/actions/message-actions";
import React, { useMemo, useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatEventResponse } from "../utils";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type MessageWithCitations = Message & { citations: Citation[] };

function Chat({ messages }: { messages: MessageWithCitations[] }) {
  const ref = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const formattedMessages = useMemo(
    () =>
      messages.map((message) => {
        if (message.type === "events") {
          return formatEventResponse(message);
        }
        return (
          <Text
            style={{
              marginRight: 16,
              alignSelf: "flex-end",
              fontSize: 16,
              padding: 8,
              backgroundColor: "lightblue",
              borderRadius: 8,
              flex: 0,
              marginBottom: 8,
            }}
          >
            {message.input}
          </Text>
        );
      }),
    [messages]
  );

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: insets.top }}
        behavior={"padding"}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ScrollView style={{ flex: 1, marginBottom: 16, gap: 8 }}>
            {formattedMessages}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              padding: 16,
            }}
          >
            <TextInput
              ref={ref}
              onSubmitEditing={async (event) => {
                if (!event.nativeEvent.text.trim()) return;
                await createMessage({
                  input: event.nativeEvent.text,
                  type: "none",
                });
                ref.current?.clear();
                router.reload();
              }}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 8,
                borderColor: "gray",
                borderWidth: 1,

                paddingHorizontal: 8,
              }}
              placeholder="Type your message..."
            />
            <TouchableOpacity
              onPress={async () => {
                await searchForEventsTodayWithPerplexity(DESCRIPTION);
                ref.current?.clear();
                router.reload();
              }}
            >
              <Text>Search events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

export default React.memo(Chat);

const DESCRIPTION = "young girl, find friends, instagrammable";
