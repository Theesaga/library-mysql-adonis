import React from "react";

// Component for displaying a singular book
const Book = ({ book, checkOutBook }) => (
  <li className="list-group-item  border-0 mt-4">
    <h5 className="card-title">{book.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
    <div className="book-summary">{book.summary}</div>
    {book.available ? (
      <button
        className="btn btn-primary mt-2"
        onClick={() => checkOutBook(book.id)}
      >
        Check Out Book
      </button>
    ) : null}
  </li>
);

export default Book;
