import React from "react";

import "./style.scss";

const renderDay = ({ temp, icon, text }) => {
  return (
    <div className="forcastday-container">
      <div className="image">
        <img src={icon} />
      </div>
      <div className="text">{temp}</div>
      <div className="muted-text">{text}</div>
    </div>
  );
};

export default props => {
  const { temps } = props;
  const days = temps.map(temp => {
    return renderDay(temp);
  });
  return <div className="bottom-container">{days}</div>;
};
