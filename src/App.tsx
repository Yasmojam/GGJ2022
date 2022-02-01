import React, { useContext, useState } from "react";
import { GameContext } from "./context/GameContext";
import "./App.scss";
import Game from "./components/Game/Game";
import LanguageSelection from "./components/LanguageSelection/LanguageSelection";
import {localisationDictionary as ld}  from "./languageUiLocalisations";

const App = () => {
  const gameState = useContext(GameContext);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  return (
    <div className="App">
      <div className={"headerWrapper"} style={gameState.language === "AR"? {flexDirection : "row-reverse"}:{}}>{gameState.language? ld.title[gameState.language]: ld.title.EN}</div>
      <div className={"gameContentWrapper"}>
      {selectedLanguage === "" || !gameState.loaded ? (

        <LanguageSelection
          gameState={gameState}
          setLanguage={setSelectedLanguage}
        />

      ) : (
        <Game />
      )}
      </div>
    </div>
  );
};

export default App;
