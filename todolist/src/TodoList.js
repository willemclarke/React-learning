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
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  onChange(event) {
    this.setState({
      /*event is a type - reasons for color all being blue - js doesnt recognise event types*/
      currentValue: event.target.value
    });
  }

  addItem(e) {
    if (this.state.currentValue !== "") {
      const newItem = {
        text: this.state.currentValue,
        key: Date.now(),
        editing: false
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

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems
    });
  }

  editItem(value, key) {
    const updatedItems = this.state.items.map(item => {
      if (item.key === key) {
        return {
          text: value,
          key: Date.now(),
          editing: true
        };
      } else {
        return item;
      }
    });

    this.setState(() => {
      return {
        items: updatedItems
      };
    });
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
        <TodoItems
          entries={this.state.items}
          delete={this.deleteItem}
          edit={this.editItem}
        />
      </div>
    );
  }
}

export default todoList;
