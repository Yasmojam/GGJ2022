import React, {useContext, useState} from "react";
import "./App.css";
import { GameContext } from "./context/GameContext";
import Link from "./components/Link";
import NarrativeText from "./components/NarrativeText";
import BackgroundImage from "./components/BackgroundImage";
import { AnimateOnChange } from 'react-animation';

import LocalisationManager from "./localisationModel/localisation";

import binary from "./assets/art/backgrounds/single.png";
import ReactAudioPlayer from "react-audio-player";

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
