import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import TodoList from "./TodoList";


const destination = document.querySelector("#container");

ReactDOM.render(
  <div>
    <TodoList/>
  </div>,
  destination
);