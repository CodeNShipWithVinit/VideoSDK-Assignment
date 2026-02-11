import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantTile from "./ParticipantTile";
import { ROOMS } from "../config";

export default function RoomView({
  meetingId,
  onSwitchRoom,
  isRelayView = false
}) {
  const { participants, leave } = useMeeting({
    onMeetingJoined: () => {
      console.log("Joined room:", meetingId);
    }
  });

  const switchRoom = (roomId) => {
    if (!onSwitchRoom) return;
    leave();
    setTimeout(() => onSwitchRoom(roomId), 400);
  };

  return (
    <div>
      <h4>Current Room: {meetingId}</h4>

      {!isRelayView && onSwitchRoom && (
        <>
          <button onClick={() => switchRoom(ROOMS.ROOM_A)}>
            Go to Room A
          </button>

          <button onClick={() => switchRoom(ROOMS.ROOM_B)}>
            Go to Room B
          </button>
        </>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {[...participants.keys()].map((id) => (
          <ParticipantTile
            key={id}
            participantId={id}
            currentRoom={meetingId}
          />
        ))}
      </div>
    </div>
  );
}
