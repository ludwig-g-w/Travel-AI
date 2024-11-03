/// <reference types="react/canary" />

import CreateUserInput from "@/components/CreateUserInput";
import DisplayUser from "@/components/DisplayUser";
import React from "react";
import { View } from "react-native";

export default async function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <CreateUserInput />
      <DisplayUser />
    </View>
  );
}
