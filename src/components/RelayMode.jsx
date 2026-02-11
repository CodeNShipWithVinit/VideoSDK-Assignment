import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { AUTH_TOKEN, ROOMS } from "../config";
import RoomView from "./RoomView";
import RelayParticipant from "./RelayParticipant";
import { useEffect } from "react";
import { initSharedMedia } from "../mediaStore";


export default function RelayMode() {
  const [sourceRoom, setSourceRoom] = useState(null);
  const [relayRoom, setRelayRoom] = useState(null);

  useEffect(() => {
  initSharedMedia();
}, []);


  const getTargetRoom = () => {
    if (!sourceRoom) return null;
    return sourceRoom === ROOMS.ROOM_A
      ? ROOMS.ROOM_B
      : ROOMS.ROOM_A;
  };

  return (
    <div>
      {!sourceRoom && (
        <div>
          <h2>Select Source Room</h2>
          <button onClick={() => setSourceRoom(ROOMS.ROOM_A)}>
            Join Room A
          </button>
          <button onClick={() => setSourceRoom(ROOMS.ROOM_B)}>
            Join Room B
          </button>
        </div>
      )}

      {sourceRoom && (
        <div>
          {!relayRoom && (
            <button onClick={() => setRelayRoom(getTargetRoom())}>
              Relay to {getTargetRoom()}
            </button>
          )}

          <div style={{ display: "flex", gap: 20 }}>
            <MeetingProvider
              config={{
                meetingId: sourceRoom,
                micEnabled: true,
                webcamEnabled: true,
                name: "Source User"
              }}
              token={AUTH_TOKEN}
              joinWithoutUserInteraction
            >
              <RoomView
                meetingId={sourceRoom}
                isRelayView={true}
              />
            </MeetingProvider>

            {relayRoom && (
              <RelayParticipant targetRoom={relayRoom} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
