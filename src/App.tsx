import React, {useContext, useState} from "react";
import { GameContext } from "./context/GameContext";
import "./App.css";
import GameComponent from "./components/GameComponent";

import files from './assets/files.json';

function App() {
  const gameState = useContext(GameContext);
  const worldImgName = `${gameState.backgroundImage}.png`;
  const worldImgLocation = `./art/backgrounds/${worldImgName}`;
  const animalImgName = `${gameState.currentPassage?.name}.png`;
  const animalImgLocation = `./art/animals/${animalImgName}`;

  const options = gameState.currentPassage?.links ?? [];

  return (
      <div className="App">
        {gameState.currentPassage?.pid != gameState.startNode && <ReactAudioPlayer src="sound/music/godcomplex.mp3" autoPlay loop volume={0.015} />}
        <ReactAudioPlayer src={"sound/voiceover/english/"+ gameState.currentPassage?.name + ".m4a"} autoPlay volume={1.0} />

        <div className="night">
          {[...Array(30).keys()].map(_ =>
            <div className="shooting_star"></div>
          )}
        </div>
        
        <div className="images">
          <div className="world">
            {
              files.backgrounds.includes(worldImgName) && 
              <BackgroundImage
                src={worldImgLocation}
                height={500}
              />
            }
          </div>

          <div className="animal">
            {
              files.animals.includes(animalImgName) &&
              <BackgroundImage
                src={animalImgLocation}
                height={100}
              />
            }
          </div>
        </div>

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
