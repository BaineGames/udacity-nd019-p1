import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import ShelfChanger from "../ShelfChanger";
class SearchPage extends Component {
  state = {
    searchResults: this.props.searchResults,
    books: this.props.books
  };

  search = e => {
    if (e.target.value.length > 0) {
      BooksAPI.search(e.target.value).then(searchResults =>
        this.setState({ searchResults: searchResults })
      );
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    const searchResults = this.props.searchResults;
    return (
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
                        // onShelfChange={this.updateBook}
                        books={this.state.books}
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
    );
  }
}

export default SearchPage;
