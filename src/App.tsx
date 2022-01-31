import React, { useContext, useState } from "react";
import { GameContext } from "./context/GameContext";
import "./App.scss";
import Game from "./components/Game/Game";
import LanguageSelection from "./components/LanguageSelection/LanguageSelection";

const App = () => {
  const gameState = useContext(GameContext);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  return (
    <div className="App">
      {selectedLanguage == "" || !gameState.loaded ? (
        <LanguageSelection
          gameState={gameState}
          setLanguage={setSelectedLanguage}
        />
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;
