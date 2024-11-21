import React from "react";
import { FlatList, Dimensions, View } from "react-native";
import EventCard from "./EventCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface EventCardStackProps {
  events: Array<{
    title: string;
    date: string;
    location: string;
    description: string;
  }>;
  onSwipeComplete?: (index: number) => void;
}

export default function EventCardStack({
  events,
  onSwipeComplete,
}: EventCardStackProps) {
  return (
    <FlatList
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ flexGrow: 0, flexShrink: 0 }}
      data={events}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={SCREEN_WIDTH}
      decelerationRate="fast"
      onMomentumScrollEnd={(event) => {
        const index = Math.round(
          event.nativeEvent.contentOffset.x / SCREEN_WIDTH
        );
        onSwipeComplete?.(index);
      }}
      renderItem={({ item }) => (
        <View
          key={item.title}
          style={{
            width: SCREEN_WIDTH,
            paddingHorizontal: 16,
          }}
        >
          <EventCard event={item} />
        </View>
      )}
    />
  );
}
