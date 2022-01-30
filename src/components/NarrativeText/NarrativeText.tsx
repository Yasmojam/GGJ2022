import React from "react";
import ReactMarkdown from "react-markdown";
import "./NarrativeText.scss";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

interface NarrativeTextProps {
  text?: string;
  language: Language | null;
}

const NarrativeText = ({ text, language }: NarrativeTextProps) => {
  return text ? (
    <div className="NarrativeText">
      <ReactMarkdown
        className={language === "AR" ? "innerTextRtL" : "innerText"}
        children={text}
        // turn this into tooltips
        components={{
          a: (props: any) => (
            <Tooltip
              placement="top"
              overlay={
                <div className="tooltip-overlay">
                  {props.href.replace(/_/g, " ")}
                </div>
              }
              arrowContent={<div className="rc-tooltip-arrow-inner" />}
            >
              <span className="tooltip">{props.children}</span>
            </Tooltip>
          ),
        }}
      />
    </div>
  ) : null;
};

export default NarrativeText;
