import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { AUTH_TOKEN, ROOMS } from "../config";
import RoomView from "./RoomView";

export default function NormalMode({ goBack }) {
  const [meetingId, setMeetingId] = useState(null);

  if (!meetingId) {
    return (
      <div>
        <h3>Normal Mode</h3>

        <button onClick={() => setMeetingId(ROOMS.ROOM_A)}>
          Join Room A
        </button>

        <button onClick={() => setMeetingId(ROOMS.ROOM_B)}>
          Join Room B
        </button>

        <button onClick={goBack}>Back</button>
      </div>
    );
  }

  return (
    <>
      <MeetingProvider
        key={meetingId}
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "Normal User"
        }}
        token={AUTH_TOKEN}
        joinWithoutUserInteraction
      >
        <RoomView
          meetingId={meetingId}
          onSwitchRoom={setMeetingId}
        />
      </MeetingProvider>

      <button onClick={goBack}>Exit</button>
    </>
  );
}
