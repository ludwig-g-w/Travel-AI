import React from "react";
import { View } from "react-native";

export default function EventCardSkeleton() {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Title skeleton */}
      <View
        style={{
          height: 24,
          width: "70%",
          backgroundColor: "#E0E0E0",
          borderRadius: 4,
          marginBottom: 8,
        }}
      />

      <View style={{ gap: 4 }}>
        {/* Date skeleton */}
        <View
          style={{
            height: 20,
            width: "40%",
            backgroundColor: "#E0E0E0",
            borderRadius: 4,
          }}
        />

        {/* Location skeleton */}
        <View
          style={{
            height: 20,
            width: "60%",
            backgroundColor: "#E0E0E0",
            borderRadius: 4,
          }}
        />

        {/* Description skeleton */}
        <View
          style={{
            height: 20,
            width: "90%",
            backgroundColor: "#E0E0E0",
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
