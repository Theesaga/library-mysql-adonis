import React from "react";
import { axiosInstance } from "./axiosInstance";

// Header Component present on all pages
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    // Bind the input functions 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle input change
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Call checkin API when submit is clicked
  handleSubmit(event) {
    axiosInstance.put("/books/checkin/"+this.state.value).then(res => {
          this.props.getBooks();
        }, error => {
          console.log(error);
        }
        ); 
    event.preventDefault();
  }

  render() {
    return (
      <div className="bg-white">
        <div className="container">
          <nav className="navbar navbar-light text-center">
            <span className="navbar-brand mb-0 h1 blue">Learning Library</span>
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSubmit}
            >
              <input
                className="form-control mr-sm-2"
                type="book"
                placeholder="Book Name"
                aria-label="Book Name"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Check In Book
              </button>
            </form>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
