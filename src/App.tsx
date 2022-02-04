import React, { useContext, useState } from "react";
import { GameContext } from "./context/GameContext";
import "./App.scss";
import Game from "./components/Game/Game";
import LanguageSelection from "./components/LanguageSelection/LanguageSelection";
import { getLanguage } from "./localStorage/functions";

const App = () => {
  const gameState = useContext(GameContext);
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguage());
  return (
    <div className="App">
      <LanguageSelection
        gameState={gameState}
        setLanguage={setSelectedLanguage}
      />
      { gameState.loaded && <Game />}
    </div>
  );
};

export default App;
