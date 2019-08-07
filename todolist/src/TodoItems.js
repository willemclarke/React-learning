import React, { Component } from "react";

class todoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentValue: ""
    };
    this.renderTask = this.renderTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onChange(event) {
    this.setState({
      /*event is a type - reasons for color all being blue - js doesnt recognise event types*/
      currentValue: event.target.value
    });
  }

  onClick(item) {
    this.props.delete(item.key);
  }

  onDoubleClick(e, item) {
    this.props.edit(e, item.key);
  }

  renderTask(item) {
    if (item.editing) {
      return (
        <form key={item.key}>
          <input
            onChange={this.onChange}
            value={this.state.currentValue}
            key={item.key}
          />
        </form>
      );
    } else {
      return (
        <li
          // onClick={() => this.onClick(item)}
          onDoubleClick={e => this.onDoubleClick(e, item)}
          key={item.key}
        >
          {item.text}
        </li>
      );
    }
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(entry => {
      return this.renderTask(entry);
    });

    return <ul className="theList">{listItems}</ul>;
  }
}

export default todoItems;
