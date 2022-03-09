const Book = require('./book')
const { AddBookDataValidator, UpdateBookDataValidator } = require('../book/validator')
const { BookResult, BookOperationResult } = require('./result')

class BookCollection {
  #books

  constructor () {
    this.#books = []
  }

  #filterById (id) {
    return this.#books.filter((book) => book.id === id)
  }

  #indexById (id) {
    return this.#books.findIndex((book) => book.id === id)
  }

  #first (id) {
    return this.#filterById(id)[0]
  }

  // https://stackoverflow.com/questions/54114960/reconstruct-partial-deconstructed-object-es6
  // https://stackoverflow.com/a/54115176/12604639
  sanitizePayload = ({ name, year, author, summary, publisher, pageCount, readPage, reading }) =>
    ({ name, year, author, summary, publisher, pageCount, readPage, reading })

  getAllFieldMap = ({ id, name, publisher }) => ({ id, name, publisher })

  exists (id) {
    return this.#filterById(id).length > 0
  }

  getAll () {
    return this.#books
  }

  getById (id) {
    return new BookResult({
      exists: this.exists(id),
      book: this.#first(id),
      index: this.#indexById(id)
    })
  }

  add (bookData) {
    const bookDataValidator = new AddBookDataValidator(bookData)
    let added = false
    let newBook

    if (bookDataValidator.validate()) {
      newBook = new Book(bookData)
      this.#books.push(newBook)
    }

    added = this.exists(newBook?.id) && bookDataValidator.validated

    console.log(`Book${newBook ? ' dengan id ' + newBook.id : ''} ${added ? 'sukses' : 'gagal'} ditambahkan.`)

    return new BookOperationResult({
      success: added,
      id: newBook?.id,
      error: bookDataValidator.failures
    })
  }

  update (id, bookData) {
    const bookDataValidator = new UpdateBookDataValidator(bookData)
    const { exists, index, book } = this.getById(id)
    let updated = false

    if (exists && bookDataValidator.validate()) {
      const updatedBook = new Book({
        ...book,
        ...bookData
      })
      updatedBook.updateTimestamp()
      this.#books[index] = updatedBook
      updated = true
    }

    console.log(`Book dengan id ${id} ${updated ? 'sukses' : 'gagal'} diperbarui.`)

    return new BookOperationResult({
      success: updated,
      id,
      error: bookDataValidator.failures
    })
  }

  remove (id) {
    const { exists, index } = this.getById(id)
    let removed = false

    if (exists) {
      removed = this.#books.splice(index, 1).length > 0
    }

    console.log(`Book dengan id ${id} ${removed ? 'sukses' : 'gagal'} dihapus.`)

    return new BookOperationResult({
      success: removed,
      id
    })
  }
}

module.exports = BookCollection
