import React from "react";

import { EventEmitter } from "events";

export default class Store extends React.Component {
  constructor(props) {
    super();
    // Main App State

    this.eventEmitter = new EventEmitter();

    this.state = {
      appName: "Weather App"
    };
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...this.state,
        eventEmitter: this.eventEmitter
      });
    });
  }
}
