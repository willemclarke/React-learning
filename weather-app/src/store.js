import React from "react";

export default class Store extends React.Component {
  constructor(props) {
    super();
    // Main App State
    this.state = {
      appName: "Weather Up"
    };
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { ...this.state });
    });
  }
}
