import { Link } from "expo-router";
import { Text, View } from "react-native";

export const unstable_settings = {
  render: "static",
};

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Link href="/">
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Settings
        </Text>
      </Link>
    </View>
  );
}
