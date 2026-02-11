import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";

export default function ParticipantTile({ participantId, currentRoom }) {
  const { webcamStream, webcamOn, displayName } =
    useParticipant(participantId);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!webcamOn || !webcamStream) {
      videoRef.current.srcObject = null;
      return;
    }

    const mediaStream = new MediaStream([webcamStream.track]);
    videoRef.current.srcObject = mediaStream;

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play().catch(() => {});
    };
  }, [webcamStream, webcamOn]);

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <p>{displayName}</p>
      <p>Room: {currentRoom}</p>

      {webcamOn ? (
        <video ref={videoRef} autoPlay playsInline muted width={250} />
      ) : (
        <p>Camera Off</p>
      )}
    </div>
  );
}
