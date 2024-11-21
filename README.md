# Event App

## Description

This is a simple event app that allows you to view events and add new events.

## Tech Stack

- React Native Server Components
- Expo
- TypeScript
- Perplexity API

## Vision

Have you ever been lost and unsure how to get the most out of your vacation? Often we search online and you find generic tourist traps, this app wants you to spend less time searching, instead configure what you are looking for and it will provide you with timely suggestions through notifications.

- Reduce time searching online
- Get relevant & timely suggestions
- Complete experience

## Features

- When standing close to a landmark, get notified with relevant information
- When landing at the airport, get notified with relevant information
- Things to do(they should up to date & relevant):
  - Restaurants
  - Events
  - Attractions
  - Activities
  - Shopping
  - Transportation

## Notes

- on prebuild clean don't forget to check that info.plist has:

  <key>UIBackgroundModes</key>
  <array>
  <string>fetch</string>
  <string>location</string>
  </array>
