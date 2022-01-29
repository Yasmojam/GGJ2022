import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../localStorage/functions";
import StoryManager from "../twison/StoryManager";

interface IContext {
  username: string;
  currentPassage: Passage | null;
  setUsername?: (username: string) => void;
  goToPassageId: (passage: string) => void;
  goBack?: () => void;
  startNode: string;
  backgroundImage: string | null; 
}

export const GameContext = createContext<IContext>({
  username: "",
  currentPassage: null,
  backgroundImage: null,
  goToPassageId: () => {},
  startNode: ""
});

const story = new StoryManager();

export const GameProvider: React.FC = ({ children }) => {

  const [username, setUsername] = useState<string>(
    getLocalStorage("username", "")
  );

  const [currentPassageId, setCurrentPassageId] = useState<string>(story.getCurrentPid());

  useEffect(() => {
    setLocalStorage("username", username);
  }, [username]);

  useEffect(() => {
    setLocalStorage("currentPassageId", currentPassageId);
  }, [currentPassageId]);

  return (
    <GameContext.Provider
      value={{
        username,
        currentPassage: story.currentPassage(),
        setUsername: (username: string) => setUsername(username),
        goToPassageId: (pid: string) => setCurrentPassageId(story.goToLink(pid)),
        goBack: () => setCurrentPassageId(story.goBack()),
        startNode: story.getStartNode(),
        backgroundImage: story.getChoices().join("_"),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
