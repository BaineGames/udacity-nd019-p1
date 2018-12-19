import React from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfChanger from "./ShelfChanger";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.search}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResults.map((book, index) => (
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
            </div>
          </div>
        ) : (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
