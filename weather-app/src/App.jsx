import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import "./sass/app.scss";

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

import axios from "axios";

const WEATHER_KEY = "f4406833aa13ba04e0ea552ad5454c6b";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "London",
      forecastDays: 5
    };
  }

  componentDidMount() {
    const { cityName, forecastDays } = this.state;
    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY} &query=${cityName} &forecast_days=${forecastDays}`;
    axios
      .get(URL)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err) {
          console.error("Failed to recieve API data ", err);
        }
      });
  }

  render() {
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="top-section">
            <TopSection />
          </div>
          <div className="bottom-section">
            <BottomSection />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
