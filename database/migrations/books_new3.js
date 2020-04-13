'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('title', 60).notNullable().unique()
      table.boolean('available')
      table.integer('user_id')
      table.string('summary', 256).notNullable()
      table.string('author', 60).notNullable()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
