const Books = require('../data/book')

const addBookHandler = (request, h) => {
  const newBook = Books.sanitizePayload(request.payload)
  const { success, id, error } = Books.add(newBook)

  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  if (error.length > 0) {
    const response = h.response({
      status: 'fail',
      message: `${error[0].failureMessage}`
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: Books.getAll().map(Books.getAllFieldMap)
    }
  })
  response.code(200)
  return response
}

const getBookHandler = (request, h) => {
  const { id } = request.params
  const { exists, book } = Books.getById(id)

  if (exists) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const updateBookHandler = (request, h) => {
  const { id } = request.params
  const bookData = Books.sanitizePayload(request.payload)

  const { success, error } = Books.update(id, bookData)

  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(201)
    return response
  }

  if (error.length > 0) {
    const response = h.response({
      status: 'fail',
      message: `${error[0].failureMessage}`
    })
    response.code(400)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const removeBookHandler = (request, h) => {
  const { id } = request.params

  const { success } = Books.delete(id)

  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookHandler, getAllBookHandler, getBookHandler, updateBookHandler, removeBookHandler }
