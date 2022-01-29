import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

interface ButtonProps {
  text: string;
  nextPassageId: string;
}

const Link = ({ text, nextPassageId }: ButtonProps) => {
  const gameState = useContext(GameContext);
  return (
    <div>
      <a href={`${nextPassageId}`}>{gameState.username}</a>
      <a href={`${nextPassageId}`}>{text}</a>
    </div>
  );
};

export default Link;
