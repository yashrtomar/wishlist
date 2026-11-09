# Wishlist

Wishlist is a small, offline-first mobile app for saving product and other item links in one place. It creates a preview from each link, keeps saved items on the device, and lets you browse them as a list or a two-column grid.

## Features

- Add an item by pasting a URL.
- Fetch link metadata on iOS and Android to show a title, description, and image when available. If preview fetching fails or a field is missing, the item still saves with fallback text.
- Switch between list and grid layouts, and delete items from the action menu.
- Persist wishlist data locally with AsyncStorage. There is no account or cloud sync in the current implementation.

## Requirements

- Node.js and npm
- The Expo development tooling used by the project
- For native development builds: Xcode for iOS and Android Studio/Android SDK for Android

## Run the app

Install dependencies:

```sh
npm install
```

Start the Expo development server:

```sh
npx expo start
```

This project includes a custom native link-preview module (`modules/linkPreview`) for iOS and Android. Because Expo Go does not include this project-specific native module, use a development build to run the complete app. With the native toolchains installed, you can build and launch locally:

```sh
npx expo run:ios
npx expo run:android
```

The project also defines `npm run web`, but the custom preview module is registered only for iOS and Android; web support for that feature is not implemented.

## Project layout

```text
src/
  App.tsx                         App entry point
  HomeScreen.tsx                  Wishlist state, storage, and list/grid view
  types.ts                        Wishlist item type
  components/
    Fab.tsx                       Add-item button
    InputModal.tsx                URL entry and preview request
    wishlistItems/                List/grid cards and item actions
modules/
  linkPreview/                    Expo native module (iOS and Android)
assets/                            App icons and splash assets
```

The app stores its wishlist using the AsyncStorage. Each item contains an ID, URL, title, description, and image URL. Preview lookup is implemented separately on each platform: iOS uses Apple's LinkPresentation framework, while Android reads Open Graph and page metadata.

## Useful scripts

```sh
npm run start       # Start the Expo development server
npm run ios         # Build and launch on an iOS simulator/device
npm run android     # Build and launch on an Android emulator/device
npm run web         # Start the web target
npm run lint        # Run Expo's lint command
npm run reset-project # Run the included starter reset script
```

## Tech stack

- Expo SDK 58 and React Native 0.88
- TypeScript and React 19
- AsyncStorage for on-device persistence
- Expo Modules API for the custom native link-preview bridge
- Apple's LinkPresentation on iOS and Jsoup metadata parsing on Android
- Lucide React Native icons
