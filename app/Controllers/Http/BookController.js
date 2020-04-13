"use strict";

const Database = use("Database");

class BookController {
  /*
    GET - Retrieve all books
    */
  async getBooks({ request, response }) {
    return await Database.table("books").select("*");
  }
  /*
        GET - Retrieve a specific book
        params:
         id - id of book
    */
  async getBook({ request, response, params }) {
    const query = params.id;
    return await Database.table("books").where("id", query);
  }
  /*
    POST - Add a new book into the system
    request:
     title - title of book
     summary - summary of book
     author - author of book
    */
  async addBook({ request, response }) {
    const query = request.only(["title", "summary", "author"]);
    query.available = true;
    query.user_id = 0;
    const bookId = await Database.insert(query).into("books");
    return bookId;
  }
  /*
    PUT - Change available field and user_id to 'check out' book
    params:
     id - id of book
    request:
     checked_out_by - the name of the user that is attempting to check out book
    */
  async checkOutBook({ request, response, params }) {
    const id = params.id;
    const data = { available: 0, user_id: request.user_id };
    const affectedRows = await Database.table("books")
        .where("id", id)
        .update(data);
    return affectedRows;
  }
  /*
    PUT - Change available and user_id to 'check in' book
    params:
     name - name of book
    */
  async checkInBook({ request, response, params }) {
    const data = { available: 1, user_id: 0 };
    const affectedRows = await Database.table("books")
      .where("title", params.name)
      .update(data);
    return affectedRows;
  }
  /*
    POST - Update a certain field of a book entry
    params:
     id - id of book
    request:
     title - title of book
     summary - summary of book
     author - author of book
     available - whether or not the book is available
     user_id - user id of user who currently has book 
    */
  async updateBook({ request, response, params }) {
    const id = params.id;
    const data = request.only([
      "title",
      "summary",
      "author",
      "available",
      "user_id"
    ]);
    const affectedRows = await Database.table("books")
      .where("id", id)
      .update(data);
    return affectedRows;
  }
}

module.exports = BookController;
