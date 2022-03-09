const { Rule, Validator } = require('../../lib/validator')

class BookDataValidator extends Validator {
  nameRequired = new Rule({
    id: 'nameRequired',
    expression: this.input.name,
    failureMessage: 'Gagal menambahkan buku. Mohon isi nama buku',
    priority: 1
  })

  pageReadMustLessThanPageCount = new Rule({
    id: 'pageReadMustLessThanPageCount',
    expression: (this.input.readPage <= this.input.pageCount),
    failureMessage: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    priority: 2
  })

  rules () {
    return [this.nameRequired, this.pageReadMustLessThanPageCount]
  }
}

module.exports = BookDataValidator
