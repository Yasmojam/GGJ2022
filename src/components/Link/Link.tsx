import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./Link.scss";

interface ButtonProps {
  text: string;
  nextPassageId: string;
}

const Link = ({ text, nextPassageId }: ButtonProps) => {
  const gameState = useContext(GameContext);
  return (
    <div className="Container">
      <a href={`${nextPassageId}`}>{gameState.username}</a>
      <a href={`${nextPassageId}`}>{text}</a>
    </div>
  );
};

export default Link;
