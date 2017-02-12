const express = require('express')
const bodyParser = require('body-parser')
const cache = require('memory-cache');
const util = require('util')

const app = express()
const port = 9002

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (err, request, response, next) {
  console.error(err.stack)
  response.sendStatus(500)
})

app.get('/expressions/:expression', (request, response) => {
  const expression = request.params.expression
  console.log(`Hit route ${request.path}`)
  response.send(expression)
})

app.put('/expressions', (request, response, next) => {
  console.log(`Hit route ${request.path}`)
  if (!request.body || !request.body.expression) {
    console.log(`Expression not supplied - body is: ${request.body}`)
    response.sendStatus(400)
    return next()
  }
  const expression = request.body.expression
  if (!expressionIsValid(expression)) {
    console.log(`Expression not valid: ${expression}`)
    response.sendStatus(400)
    return next()
  }

  let answer = cache.get(expression) // Kinda silly, but suppose this was an expensive function?
  const isNewExpression = (answer === null)
  if (isNewExpression) {
    // A bit dangerous perhaps...this could overflow or div/0 or worse
    eval(`answer = ${expression}`)
    cache.put(expression, answer) // TODO: make sure we normalize all equivalent expressions
    console.log(`Cached expression ${expression}.`)
  }
  const returnValue = {
    expression: expression,
    answer: answer,
    friendlyText: `${expression} is ${answer}`
  }
  console.log(returnValue)
  let returnCode = 200
  if (isNewExpression) {
    returnCode = 201
  }
  response.status(returnCode).send(returnValue)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

function expressionIsValid(expression) {
  // Built here: https://regex101.com/r/eqXHW0/1
  // TODO: move these unit tests here?
  // https://regex101.com/delete/aMbEoFI9ZJQu7cOq3JOyEdia
  const pattern = /^\d+\.?\d*[ ]*[\+\-\/\*\%][ ]*\d+\.?\d*$/
  const re = RegExp(pattern, 'g')
  return expression && re.test(expression)
}

