const db = require('../models/index.js')
const Op = db.Sequelize.Op
const {
  getPagination,
  getPagingData
} = require('../utils/paginationHandler.js')
const comparePassword = require('../utils/compare-password.js')

const getAllUser = async (req, res) => {
  let condition = req.query.search
    ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${req.query.search}%` } },
          { nama: { [Op.iLike]: `%${req.query.search}%` } },
          { noHp: { [Op.iLike]: `%${req.query.search}%` } },
          { role: { [Op.iLike]: `%${req.query.search}%` } }
        ]
      }
    : null

  const { limit, offset } = getPagination(req.query.page, req.query.size)

  try {
    const user = await db.User.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']]
    })
    if (!user) {
      return res.json({ success: false, message: 'Gagal mendapatkan data' })
    } else {
      const userData = getPagingData(user, req.query.page, limit)
      if (userData.totalItems < 1) {
        if (req.query.search === '' || req.query.search === undefined) {
          return res.status(200).json({
            success: true,
            message: 'Tidak ada data',
            data: userData
          })
        } else {
          return res.status(200).json({
            success: true,
            message: 'Tidak ada data yang cocok ditemukan',
            data: userData
          })
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan data',
        data: userData
      })
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Gagal mendapatkan data',
        data: null
      })
    } else {
      return res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan data',
        data: {
          id: user.id,
          username: user.username,
          nama: user.nama,
          noHp: user.noHp,
          role: user.role
        }
      })
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await db.User.destroy({
      where: { id: req.params.id }
    })
    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: 'Berhasil menghapus data',
        data: null
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Gagal menghapus data',
        data: null
      })
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null
    })
  }
}

const editUser = async (req, res) => {
  try {
    const result = await db.User.update(
      {
        username: req.body.username,
        nama: req.body.nama,
        noHp: req.body.noHp,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )

    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: 'Berhasil ubah data',
        data: null
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Gagal ubah data',
        data: null
      })
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const result = await db.User.update(
      {
        password: '123456'
      },
      {
        where: {
          id: req.params.id
        }
      }
    )

    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: 'Berhasil reset password',
        data: null
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Gagal reset password',
        data: null
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error,
      data: null
    })
  }
}

const changePassword = async (req, res) => {
  try {
    if (req.body.password === req.body.newPassword) {
      return res.status(404).json({
        success: false,
        message: 'Password baru tidak boleh sama dengan password lama'
      })
    } else {
      const user = await db.User.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Gagal mendapatkan data',
          data: null
        })
      } else {
        comparePassword(
          req.body.password,
          user.password,
          async (error, isMatch) => {
            if (error) {
              return res.status(404).json({
                success: false,
                message: error,
                data: null
              })
            }

            if (!isMatch) {
              return res.status(404).json({
                success: false,
                message: 'Password lama salah',
                data: null
              })
            } else {
              if (req.body.cmprNewPass !== req.body.newPassword) {
                return res.status(404).json({
                  success: false,
                  message: 'Confirm Password baru salah',
                  data: null
                })
              } else {
                const result = await db.User.update(
                  {
                    password: req.body.newPassword
                  },
                  {
                    where: {
                      id: req.params.id
                    }
                  }
                )

                if (result > 0) {
                  return res.status(200).json({
                    success: true,
                    message: 'Berhasil ubah password',
                    data: null
                  })
                } else {
                  return res.status(404).json({
                    success: false,
                    message: 'Gagal ubah password',
                    data: null
                  })
                }
              }
            }
          }
        )
      }
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null
    })
  }
}

module.exports = {
  getAllUser,
  getUserById,
  deleteUser,
  editUser,
  resetPassword,
  changePassword
}
