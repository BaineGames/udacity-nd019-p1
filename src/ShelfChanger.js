import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class ShelfChanger extends Component {
  state = {
    books2: this.props.books
  };

  updateBook = (newBook, shelf) => {
    newBook.shelf = shelf;
    this.setState(oldState => ({
      books2: oldState.books2
        .filter(book => book.id !== newBook.id)
        .concat(newBook)
    }));
    BooksAPI.update(newBook, shelf);
  };

  render() {
    let setShelf = "none";

    for (let b of this.props.books) {
      if (b.id === this.props.book.id) {
        setShelf = b.shelf;
      }
    }

    return (
      <div className="book-shelf-changer">
        <select
          value={setShelf}
          onChange={input =>
            this.updateBook(this.props.book, input.target.value)
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
