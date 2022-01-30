import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Link from "../Link";
import NarrativeText from "../NarrativeText";
// @ts-ignore
import BackgroundImage from "../BackgroundImage";
// @ts-ignore
import { AnimateOnChange } from "react-animation";
import files from "../../assets/files.json";
import "./Game.scss";
import ReactAudioPlayer from "react-audio-player";
import { localisationDictionary } from "../../languageUiLocalisations";

export default function Game() {
  const gameState = useContext(GameContext);
  const options = gameState.currentPassage?.links ?? [];
  const worldImgName = `${gameState.backgroundImage}.png`;
  const worldImgLocation = `./art/backgrounds/${worldImgName}`;
  const animalImgName = `${gameState.currentPassage?.name}.png`;
  const animalImgLocation = `./art/animals/${animalImgName}`;

  console.log("worldImgName: " + worldImgName);
  console.log("animalImgName: " + animalImgName);
  console.log("Current passage: " + JSON.stringify(gameState.currentPassage));
  return (
    <div className={"gameCont"}>
      {gameState.currentPassage?.pid !== gameState.startNode && (
        <ReactAudioPlayer
          src="sound/music/godcomplex.mp3"
          autoPlay
          loop
          volume={0.015}
        />
      )}
      <ReactAudioPlayer
        src={"sound/voiceover/" + gameState.currentPassage?.name + ".m4a"}
        autoPlay
        volume={1.0}
      />

      <div className="night">
        {[...Array(30).keys()].map((_) => (
          <div className="shooting_star" />
        ))}
      </div>

      {worldImgName !== "empty.png" &&
      !animalImgName.includes("Menu Screen") ? (
        <div className="images">
          {worldImgName !== "empty.png" ? (
            <div className="world">
              {files.backgrounds.includes(worldImgName) && (
                <BackgroundImage src={worldImgLocation} />
              )}
            </div>
          ) : null}

          {!animalImgName.includes("Menu Screen") ? (
            <div className="animal">
              {files.animals.includes(animalImgName) && (
                <BackgroundImage src={animalImgLocation} />
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      <AnimateOnChange
        animationIn="fadeIn"
        animationOut="fadeOut"
        durationOut={500}
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <NarrativeText
          language={gameState.language}
          text={gameState.currentPassage?.text}
        />

        {!animalImgName.includes("Menu Screen") &&
        gameState.currentPassage.links.length === 2 ? (
          <div className={"playerPrompt"}>
            {localisationDictionary.choose[gameState.language]}
          </div>
        ) : null}

        {!animalImgName.includes("Menu Screen") &&
        gameState.currentPassage.links.length < 2 ? (
          <div className={"playerPrompt"}>
            {localisationDictionary.ending[gameState.language]} {" : "}
            {gameState.currentPassage?.name}
          </div>
        ) : null}

        <div className="LinksContainer">
          {options.map((option: Link, index) => {
            return (
              <Link text={option.name} nextPassageId={option.pid} key={index} />
            );
          })}
        </div>
      </AnimateOnChange>
    </div>
  );
}
