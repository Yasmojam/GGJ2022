import React, {useContext} from "react";
import "./App.css";
import { GameContext } from "./context/GameContext";
import Link from "./components/Link";
import NarrativeText from "./components/NarrativeText";
import BackgroundImage from "./components/BackgroundImage";
import { AnimateOnChange } from 'react-animation';

import ReactAudioPlayer from "react-audio-player";

function App() {

  const gameState = useContext(GameContext); 
  const options = gameState.currentPassage?.links ?? [];

  return (
      <div className="App">
        {gameState.currentPassage.pid != gameState.startNode && <ReactAudioPlayer src="sound/music/godcomplex.mp3" autoPlay loop volume={0.015} />}
        <ReactAudioPlayer src={"sound/voiceover/"+ gameState.currentPassage?.name + ".m4a"} autoPlay volume={1.0} />

        <div className="night">
          {[...Array(30).keys()].map(_ =>
            <div className="shooting_star"></div>
          )}
        </div>

        <BackgroundImage
          src={`./art/backgrounds/${gameState.backgroundImage}.png`}
        />

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
