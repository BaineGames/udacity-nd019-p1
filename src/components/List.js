import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";
class List extends Component {
  render() {
    const books = this.props.books;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Stuff to Learn</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              books={books.filter(book => book.shelf === "wantToRead")}
              title="I should look into:"
              bookShelfUpdate={this.props.onChange}
            />
            <Shelf
              books={books.filter(book => book.shelf === "currentlyReading")}
              title="I am looking into:"
              bookShelfUpdate={this.props.onChange}
            />
            <Shelf
              books={books.filter(book => book.shelf === "read")}
              title="I already know:"
              bookShelfUpdate={this.props.onChange}
            />
          </div>
        </div>
        <div className="open-search pulsate-fwd">
          <Link to="/search">
            <button>Look into new thing</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default List;
