import React from "react";
import "./App.css";
import { GameProvider } from "./context/GameContext";
import NarrativeText from "./components/NarrativeText";

function App() {
  return (
    <GameProvider>
      <div className="App">
        <NarrativeText text="Story Begin..." />
      </div>
    </GameProvider>
  );
}

export default App;
