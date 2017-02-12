const Expression = require('../../helpers/expression')

describe('Expression class', () => {

  it('can perform simple integer addition', () => {
    const expression = new Expression('1 + 1')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(2)
  })

  it('can perform simple integer subtraction', () => {
    const expression = new Expression('1 - 1')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(0)
  })

  it('can perform simple integer multiplication', () => {
    const expression = new Expression('2 * 2')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(4)
  })

  it('can perform simple integer division', () => {
    const expression = new Expression('10 / 5')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(2)
  })

  it('can perform simple integer modulus', () => {
    const expression = new Expression('4 % 3')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(1)
  })

  it('can perform decimal addition', () => {
    const expression = new Expression('1.2 + 1.3')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(2.5)
  })

  it('can perform decimal subtraction', () => {
    const expression = new Expression('1.1 - .1')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(1)
  })

  it('can perform decimal multiplication', () => {
    const expression = new Expression('2. * 2.2')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(4.4)
  })

  it('can perform decimal division', () => {
    const expression = new Expression('100 / .1')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.equal(1000)
  })

  it('can perform decimal modulus', () => {
    const expression = new Expression('4.2 % 1.2')
    expect(expression.isValid).to.be.equal(true)
    expect(expression.answer).to.be.within(.59, .61)
  })

  it('does not care about spaces before and after operators', () => {
    const expression1 = new Expression('1+1')
    expect(expression1.isValid).to.be.equal(true)
    expect(expression1.answer).to.be.equal(2)
    const expression2 = new Expression('1   +    1')
    expect(expression2.isValid).to.be.equal(true)
    expect(expression2.answer).to.be.equal(2)
  })

  it('does not allow alphas', () => {
    const expression = new Expression('1a + 1b')
    expect(expression.isValid).to.be.equal(false)
  })

  it('does not allow tabs', () => {
    const expression = new Expression('1\t+\t1')
    expect(expression.isValid).to.be.equal(false)
  })

  it('does not allow more than one operator', () => {
    const expression = new Expression('1 + 1 - 2')
    expect(expression.isValid).to.be.equal(false)
  })

  it('does not allow multiple decimal points', () => {
    const expression = new Expression('1..1 + 1.1.1')
    expect(expression.isValid).to.be.equal(false)
  })

  it('can return a string representation', () => {
    const expression1 = new Expression('1 + 1')
    expect(expression1.toString()).to.be.equal('1 + 1 is 2')
    const expression2 = new Expression('foobar')
    expect(expression2.toString()).to.be.equal('Invalid Expression')
  })

  it('can return an object representation', () => {
    const expression1 = new Expression('1 + 1')
    expect(expression1.toObj()).to.deep.equal({
      answer: 2,
      expression: '1 + 1',
      friendlyText: '1 + 1 is 2'
    })
    const expression2 = new Expression('foobar')
    expect(expression2.toObj()).to.be.equal(null)
  })

  it('requires an input expression', () => {
    const expression = new Expression()
    expect(expression.isValid).to.be.equal(false)
  })

  it('deals with division by zero appropriately', () => {
    const expression = new Expression('1/0')
    expect(expression.isValid).to.be.equal(false)
  })
})
