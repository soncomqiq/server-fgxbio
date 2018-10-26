const constant = require('../config/constant')
const jwt = require('jsonwebtoken')

async function authenticateAdmin(values) {
  const result = await con.query(
    `SELECT * FROM admins WHERE Username = '${values.username}' && Pass = '${
      values.password
    }'`
  )
  if (result.error) {
    throw error
  }
  console.log(JSON.stringify(result))
  console.log('userfound logging in')

  return JSON.parse(JSON.stringify(result))
}

function isAuthenticatedAdmin(req, res, next) {
  var token = req.body.token || req.headers['token']
  if (token) {
    console.log('we have token herre : ', token)
    jwt.verify(token, constant.SECRET_KEY, function(err, decode) {
      if (err) {
        res.status(401).send('Invalid Token')
      } else {
        next()
      }
    })
  } else {
    res.status(401).send('Unauthorize Access')
  }
}

module.exports = {
  authenticateAdmin,
  isAuthenticatedAdmin
}
