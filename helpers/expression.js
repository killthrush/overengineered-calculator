/*
Encapsulates a simple arithmetic expression as a class
*/

class Expression {

  constructor(expressionString) {
    this.answer = null
    this.expression = expressionString
    this.isValid = this.isValid()
    if (this.isValid) {
      eval(`this.answer = ${this.expression}`)
      this.isValid = !isNaN(this.answer) && isFinite(this.answer)
    }
  }

  isValid() {
    if (!this.expression) {
      return false
    }
    const pattern = /^\d*\.?\d*[ ]*[\+\-\/\*\%][ ]*\d*\.?\d*$/
    const re = RegExp(pattern, 'g')
    return re.test(this.expression)
  }

  toObj() {
    if (!this.isValid) {
      return null
    }
    return {
      answer: this.answer,
      expression: this.expression,
      friendlyText: this.toString()
    }
  }

  toString() {
    if (!this.isValid) {
      return 'Invalid Expression'
    }
    return `${this.expression} is ${this.answer}`
  }
}

module.exports = Expression