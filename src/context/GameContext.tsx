import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../local storage/functions";
import StoryManager from "../twison/StoryManager";

interface IContext {
  username: string;
  currentPassage: Passage | null;
  setUsername?: (username: string) => void;
  goToPassageId?: (passage: string) => void;
  goBack?: () => void;
}

export const GameContext = createContext<IContext>({
  username: "",
  currentPassage: null,
});

export const GameProvider: React.FC = ({ children }) => {
  const [story] = useState<StoryManager>(new StoryManager());

  const [username, setUsername] = useState<string>(
    getLocalStorage("username", "")
  );
  // getLocalStorage("currentPassageId", story.getCurrentPid())
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
