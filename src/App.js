import React from "react";
import { Route, Switch } from "react-router-dom";
import Search from "./components/Search.js";
import List from "./components/List.js";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    Books: []
  };

  componentDidMount() {
    this.getBookDetails();
  }

  shelfStatusChange = (newBook, shelf) => {
    newBook.shelf = shelf;
    this.setState(oldState => ({
      Books: oldState.Books.filter(book => book.id !== newBook.id).concat(
        newBook
      )
    }));
    BooksAPI.update(newBook, shelf);
  };

  getBookDetails = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <List
                books={this.state.Books}
                onChange={this.shelfStatusChange}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                onChange={this.shelfStatusChange}
                myBooks={this.state.Books}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
