class Rule {
  id
  expression
  failureMessage
  priority = 0

  constructor ({ id, expression, failureMessage, priority }) {
    this.id = id
    this.expression = expression
    this.failureMessage = failureMessage
    this.priority = priority
  }
}

class Validator {
  input
  #failureBag = []
  #hasResult = false
  get failures () { return this.#failureBag }
  get validated () { return this.#hasResult && this.#failureBag.length === 0 }

  constructor (input) {
    this.input = input
  }

  rules () {
    return []
  }

  validate () {
    if (!this.#hasResult) {
      this.#failureBag = []
      const rulesBag = this.rules()
      for (const rule of rulesBag) {
        if (!rule.expression) {
          this.#failureBag.push(rule)
        }
      }
      this.#failureBag.sort((a, b) => a.priority - b.priority)
      this.#hasResult = true
    }
    return this.#failureBag.length === 0
  }
}

module.exports = { Rule, Validator }
