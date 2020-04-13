import React from "react";
import { axiosInstance } from "./axiosInstance";
import "./App.css";
import Header from "./Header";
import Book from "./Book";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    axiosInstance.get("/books").then(res => {
      this.setState({ books: res.data });
    });
  };

  checkOutBook = (id) => {
    axiosInstance.put("/books/checkout/"+id, {
      checked_out_by: "Ryan Sager"
    }).then(res => {
        this.getBooks();
      }
      );  
  }
  

  render() {
    return (
      <div className="App container-fluid d-flex flex-column p-0 bg-light">
        <Header getBooks={this.getBooks}/>
        <div className="container pb-4">
          <div className="row">
            <div className="col">
              <ul className="list-group text-left">
                {this.state.books.map(book => (
                  <Book checkOutBook={this.checkOutBook} book={book} key={book.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
