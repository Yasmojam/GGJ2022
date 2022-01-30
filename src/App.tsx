import React, {useContext} from "react";
import "./App.scss";
import { GameContext } from "./context/GameContext";
import Link from "./components/Link";
import NarrativeText from "./components/NarrativeText";
import BackgroundImage from "./components/BackgroundImage";
import { AnimateOnChange } from 'react-animation';
import ReactAudioPlayer from "react-audio-player";

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

        <AnimateOnChange
            animationIn="fadeIn"
            animationOut="fadeOut"
            durationOut={500}
        >
          <NarrativeText text={gameState.currentPassage?.text} />

          <div className="LinksContainer">
            {options.map((option:Link, index) => {
              return(
                <Link text={option.name} nextPassageId={option.pid} key={index} />
              )
            })}
          </div>
        </AnimateOnChange>
      </div>
  );
}

export default App;
