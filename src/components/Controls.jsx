export default function Controls({ joinRoomA, switchToRoomB }) {
  return (
    <div className="controls">
      <button onClick={joinRoomA}>Join Room A</button>
      <button onClick={switchToRoomB}>Switch to Room B</button>
    </div>
  );
}
