import React from "react";
import "./ClearButton.css";

// using only parentheses enables not using return
export const ClearButton = props => (
  <div className="clear-button" onClick={props.handleClear}>
    {props.children}
  </div>
);
