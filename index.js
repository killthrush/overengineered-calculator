const express = require('express')

const app = express()
const port = 9002

app.get('/', (request, response) => {
  response.send('Hello world!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})