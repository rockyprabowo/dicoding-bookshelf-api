const { addBookHandler, getAllBookHandler, getBookHandler, updateBookHandler, removeBookHandler } = require('./handler')

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookHandler
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: removeBookHandler
  }
]

module.exports = routes
