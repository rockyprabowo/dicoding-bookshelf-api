const { Rule, Validator } = require('../../lib/validator')

const _nameRequired = new Rule({
  id: 'nameRequired',
  priority: 1
})

const _pageReadMustLessThanPageCount = new Rule({
  id: 'pageReadMustLessThanPageCount',
  priority: 2
})

class AddBookDataValidator extends Validator {
  nameRequired = {
    ..._nameRequired,
    expression: this.input.name,
    failureMessage: 'Gagal menambahkan buku. Mohon isi nama buku'
  }

  pageReadMustLessThanPageCount = {
    ..._pageReadMustLessThanPageCount,
    expression: (this.input.readPage <= this.input.pageCount),
    failureMessage: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
  }

  rules () {
    return [this.nameRequired, this.pageReadMustLessThanPageCount]
  }
}

class UpdateBookDataValidator extends Validator {
  nameRequired = {
    ..._nameRequired,
    expression: this.input.name,
    failureMessage: 'Gagal memperbarui buku. Mohon isi nama buku'
  }

  pageReadMustLessThanPageCount = {
    ..._pageReadMustLessThanPageCount,
    expression: (this.input.readPage <= this.input.pageCount),
    failureMessage: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
  }

  rules () {
    return [this.nameRequired, this.pageReadMustLessThanPageCount]
  }
}

module.exports = { AddBookDataValidator, UpdateBookDataValidator }
