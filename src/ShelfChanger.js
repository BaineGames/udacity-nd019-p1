import React, { Component } from "react";

class ShelfChanger extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.props.book.shelf}
          onChange={input =>
            this.props.onShelfChange(this.props.book, input.target.value)
          }
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
