const express = require('express')
const checkIsInRole = require('../middlewares/check-is-in-role.js')
const auth = require('../middlewares/auth.js')
const ROLES = require('../utils/roles.js')
const {
  getAllUser,
  deleteUser,
  getUserById,
  resetPassword,
  editUser,
  changePassword
} = require('../controllers/user-controllers.js')

const userRouter = express.Router()

userRouter.get('/get-all-user', getAllUser)
userRouter.get('/get-user-by-id/:id', getUserById)
userRouter.delete('/delete-user/:id', deleteUser)
userRouter.put('/reset-password/:id', resetPassword)
userRouter.put('/edit-user/:id', editUser)
userRouter.put('/change-password/:id', changePassword)
// userRouter.get('/get-all-user', auth, checkIsInRole(ROLES.Admin), getAllUser)

module.exports = userRouter
