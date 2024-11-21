"use client";

import { useEffect } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

export function useLocationTracker() {
  useEffect(() => {
    const startLocationTracking = async () => {
      try {
        const { status: foregroundStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== "granted") {
          console.error("Foreground location permission denied");
          return;
        }

        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== "granted") {
          console.error("Background location permission denied");
          return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 600000, // 10 minutes
          distanceInterval: 100, // meters
          foregroundService: {
            notificationTitle: "Location Tracking",
            notificationBody: "Tracking your location in background",
          },
        });

        console.log("Location tracking started");
      } catch (err) {
        console.error("Error starting location tracking:", err);
      }
    };

    startLocationTracking();

    return () => {
      const stopTracking = async () => {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          LOCATION_TASK_NAME
        );
        if (isRegistered) {
          await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        }
      };
      stopTracking();
    };
  }, []);
}
