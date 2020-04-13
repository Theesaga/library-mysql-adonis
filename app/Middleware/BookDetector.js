'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");

class BookDetector {
  async handle({ request, response, params }, next) {
    /*
      Check if the book exists and if it's checked out.
    */
   if(params.id != null){
    const book = await Database.table("books").where("id", params.id)
    if (book.length === 0) {
      response.status(404).send("We could not find a book with that ID.");
      return;
    } else {
      request.available = book[0].available;
    }
    
  }
  else {
    const title = decodeURI(params.name)
    const book = await Database.table("books").where("title", title)
    if (book.length === 0) {
      response.status(404).send("We could not find a book with that title.");
      return;
    } else {
      params.name = title;
    }
  }
  await next();
}

};

module.exports = BookDetector;
