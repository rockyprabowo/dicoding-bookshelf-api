const { nanoid } = require('nanoid')

class Book {
  constructor ({ id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt }) {
    this.id = id ?? nanoid(16)
    this.name = name
    this.year = year
    this.author = author
    this.summary = summary
    this.publisher = publisher
    this.pageCount = pageCount
    this.readPage = readPage
    this.reading = reading
    this.insertedAt = insertedAt ?? new Date().toISOString()
    this.updatedAt = this.insertedAt
  }

  updateTimestamp () {
    this.updatedAt = new Date().toISOString()
  }

  get finished () { return this.pageCount === this.readPage }

  toJSON () {
    return {
      ...this,
      finished: this.finished
    }
  }
}

module.exports = Book
