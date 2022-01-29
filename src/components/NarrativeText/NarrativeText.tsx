import React from "react";
import ReactMarkdown from "react-markdown";
import "./NarrativeText.scss";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

interface NarrativeTextProps {
  text: string;
}

const NarrativeText = ({ text }: NarrativeTextProps) => {
  return (
    <div className="NarrativeText">
      <ReactMarkdown
        children={text}
        // turn this into tooltips
        components={{
          a: (props: any) => (
            <Tooltip
              placement="top"
              overlay={
                <div className="tooltip-overlay">
                  {props.href.replace(/_/g, ' ')}
                </div>
              }
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <span className="tooltip">{props.children}</span>
            </Tooltip>
          ),
        }}
      />
    </div>
  );
};

export default NarrativeText;
