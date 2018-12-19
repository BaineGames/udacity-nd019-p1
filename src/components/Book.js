import React, { Component } from "react";

class Book extends Component {
  bookUpdateShelf = e => {
    this.props.onUpdate(e.target.value);
  };

  render() {
    const book = this.props.book;
    return (
      <li>
        <div className="book roll-in-left">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.smallThumbnail : null
                })`
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={this.bookUpdateShelf} value={book.shelf}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
