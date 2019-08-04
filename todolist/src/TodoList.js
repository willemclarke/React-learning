import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class todoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentValue: ""
    };

    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      /*event.target.value --> event is a type*/
      currentValue: event.target.value
    });
  }

  addItem(e) {
    if (this.state.currentValue !== "") {
      const newItem = {
        text: this.state.currentValue,
        key: Date.now()
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });

      this.state.currentValue = "";
    }

    console.log(this.state.items);
    e.preventDefault();
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form>
            <input
              onChange={this.onChange}
              placeholder="enter task"
              value={this.state.currentValue}
            />
            <button type="submit" onClick={this.addItem}>
              add
            </button>
          </form>
        </div>
        <TodoItems entries={this.state.items} />
      </div>
    );
  }
}

export default todoList;
