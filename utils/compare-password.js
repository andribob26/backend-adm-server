const bcrypt = require('bcrypt')

const comparePassword = (candidatePass, hash, callBack) => {
  bcrypt.compare(candidatePass, hash, (error, isMatch) => {
    if (error) {
      return callBack(error)
    }
    callBack(null, isMatch)
  })
}

module.exports = comparePassword
