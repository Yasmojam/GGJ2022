import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../local storage/functions";
import StoryManager from "../twison/StoryManager";

interface IContext {
  username: string;
  currentStory: Story | null;
  currentPassage: Passage | null;
  setUsername?: (username: string) => void;
  setCurrentStory?: (story: Story | null) => void;
  setCurrentPassage?: (passage: Passage | null) => void;
}

export const GameContext = createContext<IContext>({
  username: "",
  currentStory: null,
  currentPassage: null,
});

export const GameProvider: React.FC = ({ children }) => {
  const story = new StoryManager();

  const [username, setUsername] = useState<string>(
    getLocalStorage("username", "")
  );
  const [currentStory, setCurrentStory] = useState<Story | null>(
    getLocalStorage("story", null)
  );
  const [currentPassage, setCurrentPassage] = useState<Passage | null>(
    getLocalStorage("passage", null)
  );

  // Todo: Add updates to the story manager instance
  useEffect(() => {
    setLocalStorage("username", username);
  }, [username]);

  useEffect(() => {
    setLocalStorage("story", currentStory);
  }, [currentStory]);

  useEffect(() => {
    setLocalStorage("currentPassage", currentPassage);
  }, [currentPassage]);

  return (
    <GameContext.Provider
      value={{
        username,
        currentStory,
        currentPassage,
        setUsername: (username: string) => setUsername(username),
        setCurrentStory: (story: Story | null) => setCurrentStory(story),
        setCurrentPassage: (passage: Passage | null) =>
          setCurrentPassage(passage),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
