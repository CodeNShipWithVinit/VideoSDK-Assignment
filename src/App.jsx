import { useState } from "react";
import NormalMode from "./components/NormalMode";
import RelayMode from "./components/RelayMode";

export default function App() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return (
      <div style={{ padding: 20 }}>
        <h2>VideoSDK Room Switching Demo</h2>

        <button onClick={() => setMode("normal")}>
          Normal Room Switching
        </button>

        <button onClick={() => setMode("relay")}>
          Media Relay Mode
        </button>
      </div>
    );
  }

  if (mode === "normal") {
    return <NormalMode goBack={() => setMode(null)} />;
  }

  return <RelayMode goBack={() => setMode(null)} />;
}
