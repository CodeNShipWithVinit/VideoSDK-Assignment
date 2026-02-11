import { MeetingProvider } from "@videosdk.live/react-sdk";
import RoomView from "./RoomView";
import { AUTH_TOKEN } from "../config";

export default function RelayParticipant({ targetRoom }) {
  return (
    <MeetingProvider
      config={{
        meetingId: targetRoom,
        micEnabled: true,     
        webcamEnabled: true,  
        name: "Relayed User"
      }}
      token={AUTH_TOKEN}
      joinWithoutUserInteraction
    >
      <RoomView meetingId={targetRoom} isRelayView />
    </MeetingProvider>
  );
}
