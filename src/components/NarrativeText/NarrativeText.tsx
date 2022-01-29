import React from "react";
import ReactMarkdown from "react-markdown";
import "./NarrativeText.scss";

interface NarrativeTextProps {
  text: string;
}

const NarrativeText = ({ text }: NarrativeTextProps) => {
  return (
    <div className="NarrativeText">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default NarrativeText;
