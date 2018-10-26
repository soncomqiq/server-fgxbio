const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
//const fileUpload = require("express-fileupload");

const config = require('./config')
const api = require('./api')

const authServ = require('./services/auth')

let app = express()
app.server = http.createServer(app)

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
)

app.use(morgan('dev'))
//morgan is a logger when request is coming in

app.use(cookieParser())
//app.use(fileUpload());

//load static object from dir 'src'
app.use(express.static(path.join(__dirname, 'src/public')))
// middleware

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, token'
  )
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use('/api', api)

app.use((err, req, res, next) => {
  res.status(err.status)
  res.json({ error: err.message })
})

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app
