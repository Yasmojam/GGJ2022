import React, {useContext, useState} from "react";
import { GameContext } from "./context/GameContext";
import "./App.scss";
import GameComponent from "./components/GameComponent";


function App() {

  const gameState = useContext(GameContext);
  const [selectedLanguage, setSelectedLanguage]=useState("");
  const list = ["RU", "EN", "AR"];

  return selectedLanguage == "" || !gameState.loaded ? (
    <div className="App">
      {(list.map((language: String, index: number) => {
        return (
          <div key={index} onClick={()=>{
            setSelectedLanguage(language as Language);
            gameState.setLanguage(language as Language)
          }}>{language}</div>
        )}))}
    </div>
  ) :
   (
    <div className="App">
      <GameComponent />
    </div>
  );
}

export default App;
