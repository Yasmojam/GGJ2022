import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../local storage/functions";
import StoryManager from "../twison/StoryManager";

interface IContext {
  username: string;
  currentPassage: Passage | null;
  setUsername?: (username: string) => void;
  goToPassageId: (passage: string) => void;
  goBack?: () => void;
}

export const GameContext = createContext<IContext>({
  username: "",
  currentPassage: null,
  goToPassageId: () => {}
});

const story = new StoryManager();

export const GameProvider: React.FC = ({ children }) => {

  const [username, setUsername] = useState<string>(
    getLocalStorage("username", "")
  );

  const [currentPassageId, setCurrentPassageId] = useState<string>(story.getCurrentPid());

  // Todo: Add updates to the story manager instance
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
