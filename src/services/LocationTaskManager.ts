"use client";

import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/locationUtils";
import { searchForEventsTodayWithPerplexity } from "../actions/ai";

const LOCATION_TASK_NAME = "background-location-task";
let lastKnownLocation: Location.LocationObject | null = null;

// Define the task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  console.log("Location task triggered");
  if (error) {
    console.error(error);
    return;
  }
  if (!data) {
    return;
  }

  const { locations } = data as { locations: Location.LocationObject[] };
  const newLocation = locations[0];

  // Check if we have a last known location and calculate distance
  if (lastKnownLocation) {
    const distance = calculateDistance(
      lastKnownLocation.coords,
      newLocation.coords
    );

    // If distance is greater than 1km (1000m)
    if (distance > 1000) {
      console.log("Distance is greater than 1km, updating location");
      // Make your API call here
      try {
        // Example API call to a public weather API
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${newLocation.coords.latitude}&longitude=${newLocation.coords.longitude}&current=temperature_2m`
        );
        const data = await response.json();
        // Send a notification with the current temperature
        await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME).then(
          async (isRegistered) => {
            if (isRegistered) {
              await Location.setBackgroundForegroundServiceAsync({
                notificationTitle: "Weather Update",
                notificationBody: `Current temperature: ${data.current.temperature_2m}°C`,
              });
            }
          }
        );

        console.log("Weather data at new location:", data);
      } catch (error) {
        console.error("Failed to update location:", error);
      }

      // Update last known location
      lastKnownLocation = newLocation;
    }
  } else {
    // First time getting location
    lastKnownLocation = newLocation;
  }
});
