const checkIsInRole = (...roles) => (req, res, next) => {
  console.log('====================================')
  console.log('masuk sini')
  console.log('====================================')
  if (!req.session.user) {
    return res.status(404).json({
      success: false,
      message: 'Belum login'
    })
  }

  const hasRole = roles.find(role => req.session.user.role === role)

  if (!hasRole) {
    return res.status(404).json({
      success: false,
      message: 'User tidak memiliki izin'
    })
  }

  next()
}

module.exports = checkIsInRole
