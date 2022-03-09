const Book = require('./book')
const { BookResult, BookOperationResult } = require('./result')

class BookCollection {
  #books

  constructor () {
    this.#books = []
  }

  // TODO: For optional challenge completion, extend filtering capability to any Book properties (not just id)

  #filterById (id) {
    return this.#books.filter((book) => book.id === id)
  }

  #indexById (id) {
    return this.#books.findIndex((book) => book.id === id)
  }

  #first (id) {
    return this.#filterById(id)[0]
  }

  exists (id) {
    return this.#filterById().length > 0
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

  add (validatedBookData) {
    const newBook = new Book(validatedBookData)

    this.#books.push(newBook)

    const added = this.exists(newBook.id)

    console.log(`Book dengan id ${newBook.id} ${added ? 'sukses' : 'gagal'} ditambahkan.`)

    return new BookOperationResult({
      success: added,
      id: newBook.id
    })
  }

  update (id, validatedBookData) {
    const { exists, index, book } = this.getById(id)
    let updated = false

    if (exists) {
      const updatedBook = new Book({
        ...book,
        ...validatedBookData
      })
      updatedBook.updateTimestamp()
      this.#books[index] = updatedBook
      updated = true
    }

    console.log(`Book dengan id ${id} ${updated ? 'sukses' : 'gagal'} diperbarui.`)

    return new BookOperationResult({
      success: updated,
      id
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
