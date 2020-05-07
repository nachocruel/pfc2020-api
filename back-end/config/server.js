const port = 3003
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
var logger = require('morgan')
var path = require('path')

server.use(logger('dev'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())
server.use(express.static(path.join(__dirname, 'client/build')))


server.listen(process.env.PORT || port, function() {
  console.log(`Servidor executando...`)
})

module.exports = server
