import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";

export default function ParticipantTile({ participantId, currentRoom }) {
  const { webcamStream, displayName } = useParticipant(participantId);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!webcamStream || !videoRef.current) return;

    const mediaStream = new MediaStream([webcamStream.track]);
    videoRef.current.srcObject = mediaStream;

    videoRef.current.play().catch(() => {});
  }, [webcamStream]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <p><strong>{displayName || "Participant"}</strong></p>
      <p>📍 Room: {currentRoom}</p>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="250"
      />
    </div>
  );
}
