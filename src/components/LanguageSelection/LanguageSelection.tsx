import React from "react";
import { IContext } from "../../context/GameContext";
import "./LanguageSelection.scss";
import { localisationDictionary as ld } from "../../languageUiLocalisations";

interface LanguageSelectionProps {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  gameState: IContext;
}

const LanguageSelection = ({
  setLanguage,
  gameState,
}: LanguageSelectionProps) => {
  const list = ["RU", "EN", "AR"];
  return (
    <div className={"langSelectionCont"}>
      <div className={"langPrompt"}>{ld.chooseLang["EN"]}</div>
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
            {language}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSelection;
