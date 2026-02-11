const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2NmEyY2M2Mi1jZWEwLTQ5ZDktOWUxOS1iNmRmYTFhZmZiNTciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc3MDgzNDk0MSwiZXhwIjoxNzcwOTIxMzQxfQ.bFAm_375AyTSmPvB6lgmtgkuVtscD--XFpSbaVdfQzY";

async function createRoom() {
  const response = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  console.log("Response:", data);

  const roomId =
    data.roomId ||
    data.meetingId ||
    data.data?.roomId ||
    data.data?.meetingId;

  console.log("\nROOM ID:", roomId);
}

createRoom();
