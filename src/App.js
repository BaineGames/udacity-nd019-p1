import React from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfChanger from "./ShelfChanger";
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

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => this.setState({ books }));
    });
  };

  reset = () => {
    this.setState({ searchResults: [] });
  };

  search = e => {
    if (e.target.value.length > 0) {
      BooksAPI.search(e.target.value).then(searchResults =>
        this.setState({ searchResults })
      );
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      onChange={this.search}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  {this.state.searchResults.length > 0 ? (
                    <ol className="books-grid">
                      {this.state.searchResults.map((book, index) => (
                        <li key={index}>
                          <div className="book roll-in-left">
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
                                onShelfChange={this.updateBook}
                              />
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors
                              ? book.authors.map((author, index) => (
                                  <div className="book-authors" key={index}>
                                    {author}
                                  </div>
                                ))
                              : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p id="noResults">No results found</p>
                  )}
                </div>
              </div>
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
                                        onShelfChange={this.updateBook}
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
