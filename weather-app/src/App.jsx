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

  updateWeather() {
    const { cityName } = this.state;

    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${WEATHER_KEY}`;
    axios
      .get(URL)
      .then(res => {
        // Api returns 40 arrays per request, thus trim to 5 arrays for each day
        const data = res.data.list.filter((value, index, Arr) => {
          return index % 8 === 0;
        });
        return data;
      })
      .then(data => {
        const text = data[0].weather[0].description;
        const textCapitalised = text.charAt(0).toUpperCase() + text.slice(1);
        const temps = data.map(item => {
          return {
            text: item.weather[0].description,
            temp: item.main.temp,
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          };
        });
        console.log(temps);

        this.setState({
          isLoading: false,
          temps: temps
        });
      })
      .catch(err => {
        if (err) {
          console.error("Cannot fetch Weather Data from API ", err);
        }
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  renderTopSection() {
    const { isLoading, temps, cityName } = this.state;
    if (isLoading) {
      return null;
    } else {
      const { text, temp, icon } = temps[0];
      return (
        <TopSection
          location={cityName}
          mainTemp={temp}
          text={text}
          iconURL={icon}
          eventEmitter={this.props.eventEmitter}
        />
      );
    }
  }

  renderBottomSection() {
    const { isLoading, temps } = this.state;
    if (isLoading) {
      return null;
    } else {
      return <BottomSection temps={temps} />;
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading && <div className="top-section">{this.renderTopSection()}</div>}
          <div className="bottom-section">{this.renderBottomSection()}</div>
        </div>
      </div>
    );
  }
}

export default App;
