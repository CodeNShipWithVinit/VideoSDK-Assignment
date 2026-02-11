import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { AUTH_TOKEN, ROOMS } from "./config";
import RoomView from "./components/RoomView";

export default function App() {
  const [meetingId, setMeetingId] = useState(null);

  return (
    <div>
      {!meetingId && (
        <>
          <h2>Join a Room</h2>
          <button onClick={() => setMeetingId(ROOMS.ROOM_A)}>
            Join Room A
          </button>
          <button onClick={() => setMeetingId(ROOMS.ROOM_B)}>
            Join Room B
          </button>
        </>
      )}

      {meetingId && (
        <MeetingProvider
          key={meetingId}
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "React User"
          }}
          token={AUTH_TOKEN}
          joinWithoutUserInteraction
        >
          <RoomView  meetingId={meetingId} onSwitchRoom={setMeetingId} />
        </MeetingProvider>
      )}
    </div>
  );
}
