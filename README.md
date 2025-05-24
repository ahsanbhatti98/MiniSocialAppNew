# MiniSocialApp 📱🔥

A lightweight social media application built with **React Native** that includes Firebase **Authentication**, **Firestore database**, and real-time **Chat** features. This app allows users to register, log in, view video reels, chat with other users, and manage their profile.

---

## 🚀 Features

- 🔐 Firebase Email/Password Authentication
- 📦 Firebase Firestore for storing user profiles and chat messages
- 🎥 Reels Feed (with playable video content)
- 💬 Real-time 1-on-1 Chat using `GiftedChat` and Firestore listeners
- 🧑‍💼 Redux state management for authenticated user data
- ✅ Firebase Auth + Firestore existence check on login

---

## 🧰 Tech Stack

- **React Native**
- **Firebase (Auth + Firestore)**
- **Redux Toolkit** (for global state management)
- **React Navigation**
- **GiftedChat** (for real-time chat UI)

---

## 🛠 Installation

```bash
# Clone the project
git clone https://github.com/your-username/minisocialapp.git

# Navigate to the project directory
cd minisocialapp

# Install dependencies
yarn install

# For iOS
cd ios && pod install && cd ..

# Run the app
npx react-native run-android
# or
npx react-native run-ios

# or
can run from  xcode or android studio