"use client";
import { getUser } from "@src/actions/server-actions";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function DisplayUser() {
  const [id, setId] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser({ id }).then((user) => setUser(user ?? null));
  }, [id]);

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable onPress={() => setId(id - 1)}>
          <Text
            style={{
              color: "red",
            }}
          >
            Previous
          </Text>
        </Pressable>
        <Pressable onPress={() => setId(id + 1)}>
          <Text style={{ color: "blue" }}>Next</Text>
        </Pressable>
      </View>
      <View
        style={{
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>User</Text>
        <Text>{user?.email}</Text>
      </View>
    </View>
  );
}
