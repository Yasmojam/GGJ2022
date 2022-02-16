import React from "react";
import { IContext } from "../../context/GameContext";
import EmojiFlags from "emoji-flags";
import "./LanguageSelection.scss";

interface LanguageSelectionProps {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  gameState: IContext;
}


const flags = {
  EN: EmojiFlags.countryCode("GB").emoji,
  RU: EmojiFlags.countryCode("RU").emoji,
  AR: EmojiFlags.countryCode("AE").emoji,
}

const LanguageSelection = ({
  setLanguage,
  gameState,
}: LanguageSelectionProps) => {
  const list = ["RU", "EN", "AR"];
  return (
    <div className={"langSelectionCont"}>
      {list.map((language: String, index: number) => {
        return (
          <div
            className={"langOption"}
            key={index}
            onClick={() => {
              setLanguage(language as Language);
              gameState.setLanguage(language as Language);
            }}
          >
            {flags[language]}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSelection;
