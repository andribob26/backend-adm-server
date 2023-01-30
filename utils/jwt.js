require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models/index.js')

const createToken = (username, callBack) => {
  const token = jwt.sign({ data: username }, process.env.SECRET, {
    expiresIn: '1m'
  })
  if (!token) {
    callBack('Gagal membuat token')
  } else {
    callBack(null, token)
  }
}

const createRefreshToken = (userId, callBack) => {}

const verifyToken = (token, callBack) => {
  jwt.verify(token, process.env.SECRET, async (error, decode) => {
    if (!decode) {
      return callBack(error)
    } else {
      const user = await db.User.findOne({
        where: {
          username: decode.data
        }
      })
      callBack(null, user)
    }
  })
}

module.exports = { createToken, createRefreshToken, verifyToken }
