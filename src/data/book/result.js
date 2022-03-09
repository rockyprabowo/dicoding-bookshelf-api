class BookResult {
  constructor ({ exists, book, index, error }) {
    this.exists = exists
    this.book = book
    this.index = index
    this.error = error
  }
}

class BookOperationResult {
  constructor ({ success, id, error }) {
    this.success = success
    this.id = id
    this.error = error
  }
}

module.exports = { BookResult, BookOperationResult }
