class BookResult {
  constructor ({ exists, book, index }) {
    this.exists = exists
    this.book = book
    this.index = index
  }
}

class BookOperationResult {
  constructor ({ success, id }) {
    this.success = success
    this.id = id
  }
}

module.exports = { BookResult, BookOperationResult }
