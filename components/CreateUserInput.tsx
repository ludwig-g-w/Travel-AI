"use client";

import { createUser } from "@/actions/render-info";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import { useState } from "react";

function CreateUserInput() {
  const [email, setEmail] = useState("");

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <TextInput
        style={{
          borderWidth: 1,
        }}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity onPress={() => createUser({ email })}>
        <Text>Create User</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateUserInput;
