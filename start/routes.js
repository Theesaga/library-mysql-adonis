'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
const Database = use('Database')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', async () => {
  return await Database.table('books').select('*')
})

/* Books */
Route.get('/books', 'BookController.getBooks')

Route.get('/books/:id', 'BookController.getBook').middleware(['book'])

Route.put('/books/:id', 'BookController.updateBook').middleware(['book'])

Route.put('/books/checkout/:id', 'BookController.checkOutBook').middleware(['book','user'])

Route.put('/books/checkin/:name', 'BookController.checkInBook').middleware(['book'])

Route.post('/books', 'BookController.addBook')


