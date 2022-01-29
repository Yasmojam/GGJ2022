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
              overlay={props.href}
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <a href="#">{props.children}</a>
            </Tooltip>
          ),
        }}
      />
    </div>
  );
};

export default NarrativeText;
