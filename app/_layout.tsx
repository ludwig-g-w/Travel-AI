import { Link, Slot } from "expo-router";
import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Slot />
      <View
        style={{
          padding: 24,
          backgroundColor: "#f0f0f0",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="home" size={24} color="black" />
            <Text>Home</Text>
          </View>
        </Link>
        <Link href="/settings">
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="cog" size={24} color="black" />
            <Text>Settings</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
