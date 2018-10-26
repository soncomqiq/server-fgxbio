const { version } = require('../../package.json')
const { Router } = require('express')
const jwt = require('jsonwebtoken')
const util = require('util')

const child_proc = require('child_process')

const searchRoute = require('./search')
const resourceRoute = require('./resource')
const adminRoute = require('./admin')
const constant = require('../config/constant')
const con = constant.con

const authServ = require('../services/auth')

const _ = require('lodash')

let api = Router()

api.use('/search', searchRoute)
api.use('/resource', resourceRoute)
api.use('/admin', adminRoute)

api.post('/auth', (req, res, next) => {
  const { username, password } = req.body
  con.query(
    `SELECT * FROM admins WHERE Username = '${username}' && Pass = '${password}'`,
    function(err, rows) {
      if (err) throw err
      if (rows.length > 0) {
        var token = jwt.sign(
          { User_ID: rows[0].User_ID },
          constant.SECRET_KEY,
          {
            expiresIn: 4000
          }
        )
        res.json({ token: token })
      } else res.send('Not Found')
    }
  )
  //should have finished
})

api.post('/signout', (req, res, next) => {
  console.log(req.body)
  res.send('signout successful')
})

api.get('/', (req, res) => {
  res.json({ version })
})

api.post('/excel', (req, res, next) => {
  if (req.files) {
    console.log(req.files)
  }
})

api.get('/python', (req, res, next) => {
  console.log(__dirname)
  child_proc.exec(`python3 ${__dirname}/test.py`, function(err) {
    if (err) {
      console.log('child process failed with error : ' + err)
      res.status(400).send('error')
    }
    console.log('PROCESS DONE')
    res.send('complete')
  })
})

api.get('/try', async (req, res, next) => {
  console.log('try')
  var res1 = await con.query(`SELECT DISTINCT Locus FROM ngs_data; `, function(
    err,
    result
  ) {
    if (err) throw err

    console.log(result)
    res.json({ Locus: result, Amount: 'hello' })
  })
  res.send(locus)
})

module.exports = api
