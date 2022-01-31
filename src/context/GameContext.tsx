import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../localStorage/functions";
import StoryManager from "../twison/StoryManager";

export interface IContext {
  language: Language | null;
  username: string;
  currentPassage: Passage | null;
  setUsername?: (username: string) => void;
  goToPassageId: (passage: string) => void;
  goBack?: () => void;
  startNode: string;
  backgroundImage: string | null;
  setLanguage: (language: Language) => void;
  loaded: boolean;
}

export const GameContext = createContext<IContext>({
  language: "EN", // English by default but will get chosen by user
  username: "",
  currentPassage: null,
  backgroundImage: null,
  goToPassageId: () => {},
  startNode: "",
  loaded: false,
  setLanguage: (language: Language) => {},
});

let storyManager: StoryManager;

export const GameProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<Language | null>(null);

  const [username, setUsername] = useState<string>(
    getLocalStorage("username", "")
  );

  const [currentPassageId, setCurrentPassageId] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (language !== null) {
      storyManager = new StoryManager(language);
      setCurrentPassageId(storyManager.getCurrentPid());
      setLocalStorage("language", language);
      setLoaded(true);
    }
  }, [language]);

  useEffect(() => {
    setLocalStorage("username", username);
  }, [username, loaded]);

  useEffect(() => {
    setLocalStorage("currentPassageId", currentPassageId);
  }, [currentPassageId, loaded]);

  return (
    <GameContext.Provider
      value={{
        language,
        username,
        loaded,
        currentPassage: storyManager?.currentPassage(),
        setUsername: (username: string) => setUsername(username),
        goToPassageId: (pid: string) =>
          setCurrentPassageId(storyManager?.goToLink(pid)),
        goBack: () => setCurrentPassageId(storyManager?.goBack()),
        startNode: storyManager?.getStartNode(),
        backgroundImage: storyManager?.getChoices().join("_"),
        setLanguage: (language: Language) => setLanguage(language),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
