🎥 VideoSDK — Room Switching & Media Relay Demo

This project demonstrates two different approaches to handling multi-room participation using the VideoSDK React SDK:

✅ Normal Room Switching → Leave one room and join another
✅ Media Relay Mode → Stay in a source room and relay audio/video to a second room simultaneously

The app is built using React + Vite + VideoSDK.

🚀 Project Setup
1️⃣ Prerequisites

Node.js ≥ 16

A VideoSDK account

VideoSDK Auth Token

Two valid VideoSDK Meeting IDs

2️⃣ Install Dependencies
npm install

3️⃣ Configure Token and Rooms

Open:

src/config.js


Add your credentials:

export const AUTH_TOKEN = "YOUR_VIDEOSDK_TOKEN";

export const ROOMS = {
  ROOM_A: "your-meeting-id-1",
  ROOM_B: "your-meeting-id-2"
};


⚠️ Meeting IDs must be valid meetings generated from VideoSDK.

4️⃣ Run the Application
npm run dev


Open in browser:

http://localhost:5173

🔄 Normal Room Switching — Implementation

Normal switching follows a leave → join lifecycle.

Flow

User joins a room using MeetingProvider

When switching is requested:

Current meeting is left

State updates with new meetingId

A new meeting connection is created

Core Logic
const switchRoom = (roomId) => {
  leave();
  setTimeout(() => onSwitchRoom(roomId), 500);
};

Characteristics

✔ Only one active meeting at a time
✔ Camera and mic reinitialize on join
✔ Lightweight and stable
✔ Typical meeting navigation behavior

This approach simulates how users normally move between meetings in video platforms.

🔁 Media Relay Mode — Implementation

Media Relay allows a user to:

👉 Stay in one room (source)
👉 Broadcast the same audio/video to another room
👉 See both rooms simultaneously

Flow

1️⃣ User selects a source room
2️⃣ Camera and microphone publish to source
3️⃣ User starts relay to second room
4️⃣ App joins relay room using a second meeting connection
5️⃣ Both rooms display video side-by-side

Architecture

Two independent MeetingProvider instances are mounted:

Source Room Connection
        +
Relay Room Connection


Both publish media from the same device.

Why Two MeetingProviders?

Browsers cannot share a single encoded WebRTC track across multiple meetings.
Therefore, each meeting requires its own encoder and connection.

Stability Optimization

To prevent video corruption during relay, a lower encoder profile is used:

encoderConfig: "h360p_15fps"


This reduces CPU load and improves relay stability.

⚠️ Limitations & Challenges
1. Browser WebRTC Constraint

Browsers do not allow one camera track to be reused across multiple peer connections via the SDK.

Impact:

Media must be encoded twice

Higher CPU usage

Possible artifacts on low-performance systems

2. Performance Overhead

Media relay increases system load:

Factor	Impact
Two active encoders	Higher CPU usage
High resolution video	Frame drops possible
Low-end devices	Video instability

Mitigation implemented:
✔ Reduced encoder resolution
✔ Stable provider lifecycle
✔ Independent meeting connections

3. Common Issues Faced During Development
Issue: Camera Off in source room

Cause: MeetingProvider remounted or webcam disabled
Fix: Persistent provider + explicit webcam enable

Issue: Green patches or broken video

Cause: Encoder overload when publishing twice
Fix: Lower encoder configuration

Issue: Relay room not showing video

Cause: Webcam not enabled in relay connection
Fix: Enable webcam in both meetings

Issue: Meeting ID empty error

Cause: Provider mounted before room selection
Fix: Conditional rendering after room selection

🔍 Key Differences — Normal room switching and media relay differ mainly in how meetings and media streams are handled. In normal switching, only one meeting is active at a time, so the user must leave the current room before joining another. This keeps CPU usage low and the implementation simple, but media is visible in only one room and real-time presence in multiple rooms is not possible. In contrast, media relay keeps two meetings active simultaneously, allowing the user’s audio and video to appear in both rooms at the same time. This enables real-time presence across rooms, but it increases CPU usage and adds implementation complexity because the application must manage multiple connections and stream forwarding.


🧠 Conceptual Difference
Normal Switching- User moves between rooms.

Media Relay-User acts like a broadcaster sending the same stream to multiple rooms.

This demonstrates multi-room publishing behavior under browser WebRTC limitations.

📦 Tech Stack

React

Vite

VideoSDK React SDK

WebRTC (via VideoSDK)

✅ Summary

This project showcases two real-time communication patterns:

✔ Standard room navigation
✔ Simultaneous multi-room broadcasting

It highlights the architectural and performance considerations required when relaying live media across multiple meetings in a browser environment.
