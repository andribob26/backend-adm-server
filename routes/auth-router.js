const express = require('express')

const {
  register,
  logIn,
  logOut,
  getSession,
  refreshToken
} = require('../controllers/auth-controllers.js')

const authRouter = express.Router()

authRouter.post('/add-user', register)
authRouter.post('/login', logIn)
authRouter.get('/logout', logOut)
authRouter.get('/get-session', getSession)
authRouter.get('/refresh-token', refreshToken)

module.exports = authRouter
