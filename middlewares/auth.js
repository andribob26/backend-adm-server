const { verifyToken } = require('../utils/jwt.js')
const getBearerToken = require('../utils/get-bearer-token.js')
const auth = (req, res, next) => {
  try {
    const token = getBearerToken(req)

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token tidak ada',
        data: null
      })
    } else {
      verifyToken(token, async (error, user) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: error
          })
        }

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'Token data tidak ditemukan'
          })
        } else {
          next()
        }
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error
    })
  }
}

module.exports = auth
