import React from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfChanger from "./ShelfChanger";
import SearchPage from "./components/Search.js";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    shelfs: [
      { name: "currentlyReading", dispName: "Currently Reading" },
      { name: "wantToRead", dispName: "Want to Read" },
      { name: "read", dispName: "Read" }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateBook = (newBook, shelf) => {
    newBook.shelf = shelf;
    this.setState(oldState => ({
      books: oldState.books
        .filter(book => book.id !== newBook.id)
        .concat(newBook)
    }));
    BooksAPI.update(newBook, shelf);
  };

  reset = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={props => (
              <SearchPage
                {...props}
                books={this.state.books}
                searchResults={this.state.searchResults}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.shelfs.map((shelf, index) => (
                      <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{shelf.dispName}</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {this.state.books
                              .filter(book => book.shelf === shelf.name)
                              .map((book, index) => (
                                <li key={index}>
                                  <div className="book">
                                    <div className="book-top">
                                      <div
                                        className="book-cover"
                                        style={{
                                          width: 128,
                                          height: 193,
                                          backgroundImage: `url(${
                                            book.imageLinks
                                              ? book.imageLinks.smallThumbnail
                                              : null
                                          })`
                                        }}
                                      />
                                      <ShelfChanger
                                        book={book}
                                        books={this.state.books}
                                      />
                                    </div>
                                    <div className="book-title">
                                      {book.title}
                                    </div>
                                    {book.authors
                                      ? book.authors.map((author, index) => (
                                          <div
                                            className="book-authors"
                                            key={index}
                                          >
                                            {author}
                                          </div>
                                        ))
                                      : null}
                                  </div>
                                </li>
                              ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search" onClick={this.reset}>
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
