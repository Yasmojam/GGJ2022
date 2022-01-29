import React, { useContext, useRef } from "react";
import { GameContext } from "../../context/GameContext";
import "./Link.scss";

interface ButtonProps {
  text: string;
  nextPassageId: string;
}

const Link = ({ text, nextPassageId }: ButtonProps) => {
  const gameState = useContext(GameContext);

  const onClick = () => {
    gameState.goToPassageId(nextPassageId);
  };

  return (
    <div className="Link" onClick={onClick}>
      {text}
    </div>
  );
};

export default Link;
