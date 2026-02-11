import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantTile from "./ParticipantTile";
import { ROOMS } from "../config";

export default function RoomView({ onSwitchRoom, meetingId }) {
  const { participants, leave } = useMeeting();

  const switchRoom = (roomId) => {
    leave();
    setTimeout(() => onSwitchRoom(roomId), 500);
  };

  return (
    <div>
      <h3>Meeting Room: {meetingId}</h3>

      <button onClick={() => switchRoom(ROOMS.ROOM_A)}>
        Go to Room A
      </button>

      <button onClick={() => switchRoom(ROOMS.ROOM_B)}>
        Go to Room B
      </button>

      <div>
        {[...participants.keys()].map((participantId) => (
          <ParticipantTile
            key={participantId}
            participantId={participantId}
            currentRoom={meetingId}
          />
        ))}
      </div>
    </div>
  );
}
