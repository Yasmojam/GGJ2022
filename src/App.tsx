import React, {useContext} from "react";
import "./App.css";
import { GameContext, GameProvider } from "./context/GameContext";
import Link from "./components/Link";
import NarrativeText from "./components/NarrativeText";

function App() {

  const gameState = useContext(GameContext); 
  const options = gameState.currentPassage?.links ?? [];

  return (
      <div className="App">
        <header className="App-header">
          <NarrativeText text={gameState.currentPassage?.text} />

          {options.map((option:Link, index) => {
            return(
              <Link text={option.name} nextPassageId={option.pid} key={index}/>
            )
          })}
        </header>
      </div>
  );
}

export default App;
