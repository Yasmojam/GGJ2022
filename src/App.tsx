import React, {useContext} from "react";
import "./App.scss";
import { GameContext } from "./context/GameContext";
import Link from "./components/Link";
import NarrativeText from "./components/NarrativeText";
import BackgroundImage from "./components/BackgroundImage";
import { AnimateOnChange } from 'react-animation';
import ReactAudioPlayer from "react-audio-player";


function App() {
  const gameState = useContext(GameContext);
  const worldImgLocation = `./art/backgrounds/${gameState.backgroundImage}.png`;
  const animalImgLocation = `./art/animals/${gameState.currentPassage?.name}.png`;

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
            <BackgroundImage
              src={worldImgLocation}
            />
          </div>

          <div className="animal">
            <BackgroundImage
              src={animalImgLocation}
            />
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
