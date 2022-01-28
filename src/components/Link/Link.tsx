import React from "react";

interface ButtonProps {
  text: string;
  nextPassageId: string;
}

const Link = ({ text, nextPassageId }: ButtonProps) => {
  return (
    <div>
      <a href={`${nextPassageId}`}>{text}</a>
    </div>
  );
};

export default Link;
