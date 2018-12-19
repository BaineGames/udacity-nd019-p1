import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends Component {
  state = {
    Books: [],
    query: ""
  };

  handleChange = event => {
    var value = event.target.value;
    this.setState(() => {
      return { query: value };
    });
    this.startSearch(value);
  };

  changeBookShelf = books => {
    let bookCollection = this.props.myBooks;

    for (let book of books) {
      book.shelf = "none";
      for (let item of bookCollection) {
        if (item.id === book.id) {
          book.shelf = item.shelf;
        }
      }
    }
    return books;
  };

  startSearch = input => {
    if (input.length !== 0) {
      BooksAPI.search(input).then(books => {
        if (books.length > 0) {
          books = this.changeBookShelf(books);
          this.setState(() => {
            return { Books: books };
          });
        }
      });
    } else {
      this.setState({ Books: [], query: "" });
    }
  };

  addToShelf = (book, shelf) => {
    this.props.onChange(book, shelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search  fade-out-left">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.Books.length > 0 ? (
            <ol className="books-grid">
              {this.state.query.length > 0 &&
                this.state.Books.map((book, index) => (
                  <Book
                    book={book}
                    key={index}
                    onUpdate={shelf => {
                      this.addToShelf(book, shelf);
                    }}
                  />
                ))}
            </ol>
          ) : (
            <p id="noResults">No results found</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
