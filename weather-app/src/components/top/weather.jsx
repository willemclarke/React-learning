import React from "react";

import SunImg from "../../resources/images/sun-icon.png";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location, mainTemp, text, iconURL } = this.props;

    return (
      <div className="weather-container">
        <div className="header">{location}</div>
        <div className="inner-container">
          <div className="image">
            <img src={iconURL} />
          </div>
          <div className="current-weather">{mainTemp}°</div>
        </div>
        <div className="footer">{text}</div>
      </div>
    );
  }
}
