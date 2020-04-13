"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database")

class UserDetector {
  async handle({ request, response, params }, next) {
    /*
      Check if book has been found and if it's available
    */
    if(request.available === 0){
      response.status(409).send("Book is not currently available.");
      return;
    }
    /*
      Check if the user exists in the database.
    */
    const query = request.only(["checked_out_by"]);
    const user = await Database.table("users").where(
      "username",
      query.checked_out_by
    );
    if (user.length === 0) {
      response
        .status(500)
        .send(
          "Could not find the provided name. Registration is required before checking out books."
        );
      return;
    } else {
      // Append the gotten user ID to the request for future use.
      request.user_id = user[0].id;
    }

    /*
      Check whether the book has the maximum amount of books checked out.
    */
    const Env = use("Env");
    const maxBooks = Env.get("MAX_BOOKS_PER_USER");
    const books = await Database.table("books").where("user_id", user[0].id);
    if (books.length >= maxBooks) {
      response.status(409).send("User currently has three books checked out.");
      return;
    }
    
    await next();
  }
}

module.exports = UserDetector;
