import React, {useContext} from "react";
import "./App.css";
import { GameContext, GameProvider } from "./context/GameContext";
import Link from "./components/Link";

function App() {

  const gameState = useContext(GameContext); 
  const options = gameState.currentPassage?.links ?? [];

  return (
    <GameProvider>
      <div className="App">
        <header className="App-header">
          <p>{gameState.currentPassage?.text}</p>

          {options.map((option:Link, index) => {
            return(
              <Link text={option.name} nextPassageId={option.pid} key={index}/>
            )
          })}
        </header>
      </div>
    </GameProvider>
  );
}

export default App;
