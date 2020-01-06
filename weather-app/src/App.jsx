import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import "./sass/app.scss";

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

import axios from "axios";

const WEATHER_KEY = "b5872ed0b424ff4407a9675d2502f7ec";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Toowoomba",
      isLoading: true
    };
  }

  componentDidMount() {
    const { cityName } = this.state;

    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${WEATHER_KEY}`;
    axios
      .get(URL)
      .then(res => {
        const city = res.data.city;
        const data = res.data.list.filter((value, index, Arr) => {
          return index % 8 == 0;
        });
        console.log(city);
        console.log(data);
        return data, city;
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
