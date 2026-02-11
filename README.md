# 🎥 VideoSDK --- Room Switching & Media Relay Demo

This project demonstrates two approaches using the VideoSDK React SDK:

✅ Normal Room Switching → Leave one room and join another\
✅ Media Relay Mode → Stay in a source room and relay audio/video to a
second room simultaneously

Built with React + Vite + VideoSDK.

------------------------------------------------------------------------

# 🚀 Project Setup

## 1️⃣ Prerequisites

-   Node.js ≥ 16
-   VideoSDK account
-   VideoSDK Auth Token
-   Two valid VideoSDK Meeting IDs

------------------------------------------------------------------------

## 2️⃣ Install Dependencies

npm install

------------------------------------------------------------------------

## 3️⃣ Configure Token and Rooms

Open: src/config.js

Add:

export const AUTH_TOKEN = "YOUR_VIDEOSDK_TOKEN";

export const ROOMS = { ROOM_A: "your-meeting-id-1", ROOM_B:
"your-meeting-id-2" };

⚠️ Meeting IDs must be valid meetings generated from VideoSDK.

------------------------------------------------------------------------

## 4️⃣ Run the Application

npm run dev

Open: http://localhost:5173

------------------------------------------------------------------------

# 🔄 Normal Room Switching --- Implementation

Normal switching follows a leave → join lifecycle.

Flow: 1. User joins a room using MeetingProvider 2. When switching: -
Current meeting is left - State updates with new meetingId - New meeting
connection is created

Core Logic:

const switchRoom = (roomId) =\> { leave(); setTimeout(() =\>
onSwitchRoom(roomId), 500); };

Characteristics: ✔ Only one active meeting\
✔ Camera and mic reinitialize\
✔ Lightweight and stable

------------------------------------------------------------------------

# 🔁 Media Relay Mode --- Implementation

Media Relay allows a user to:

👉 Stay in one room (source)\
👉 Broadcast the same audio/video to another room\
👉 See both rooms simultaneously

Flow: 1. Select source room 2. Publish camera/mic 3. Start relay 4. Join
relay room with second meeting connection 5. Both rooms visible
side-by-side

Architecture: Two independent MeetingProvider instances run
simultaneously.

Why two providers? Browsers cannot reuse one WebRTC stream across
meetings. Each meeting needs its own encoder.

Stability optimization: encoderConfig: "h360p_15fps"

------------------------------------------------------------------------

# ⚠️ Limitations & Challenges

Browser WebRTC constraint: Media must be encoded twice → Higher CPU
usage

Performance impact: Two encoders run simultaneously

Common issues solved: - Camera Off → Provider lifecycle fix - Green
video → Lower encoder config - Relay not visible → Webcam enabled in
both meetings - Empty meetingId → Conditional rendering

------------------------------------------------------------------------

# 🔍 Switching vs Relay

Normal Switching: • One meeting at a time • Leave to join another • Low
CPU usage

Media Relay: • Two meetings simultaneously • Same media in both • Higher
CPU usage

------------------------------------------------------------------------

# 📦 Tech Stack

-   React
-   Vite
-   VideoSDK React SDK
-   WebRTC

------------------------------------------------------------------------

# ✅ Summary

The project demonstrates: ✔ Standard room navigation\
✔ Simultaneous multi-room broadcasting

It highlights architecture and performance considerations when relaying
live media across meetings.
