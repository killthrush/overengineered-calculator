const express = require('express')
const bodyParser = require('body-parser')
const cache = require('memory-cache')
const Expression = require('./helpers/expression')
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
    console.error(`Expression not supplied - body is: ${request.body}`)
    response.sendStatus(400)
    return next()
  }

  const expressionString = request.body.expression
  let expressionObj = cache.get(expressionString) // Kinda silly, but suppose this was an expensive function?
  const isNewExpression = (expressionObj === null)
  if (isNewExpression) {
    expressionObj = new Expression(expressionString)
    cache.put(expressionString, expressionObj)
    console.log(`Cached expression ${expressionString}.`)
  }

  if (!expressionObj.isValid) {
    console.error(`Expression not valid: ${expressionString}`)
    response.sendStatus(400)
    return next()
  }

  const returnValue = expressionObj.toObj()
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
