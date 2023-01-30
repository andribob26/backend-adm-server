const db = require("../models/index.js");
const comparePassword = require("../utils/compare-password.js");
const getBearerToken = require("../utils/get-bearer-token.js");
const { createToken, verifyToken } = require("../utils/jwt.js");

const register = async (req, res) => {
  try {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      nama: req.body.nama,
      noHp: req.body.noHp,
      role: req.body.role,
    })
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "Berhasil register",
          data: user,
        });
      })
      .catch((error) => {
        return res.status(404).json({
          success: false,
          message: error.errors[0].message,
          data: null,
        });
      });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User username salah!",
        data: null,
      });
    } else {
      comparePassword(req.body.password, user.password, (error, isMatch) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: error,
            data: null,
          });
        }

        if (!isMatch) {
          return res.status(404).json({
            success: false,
            message: "User password salah!",
            data: null,
          });
        } else {
          db.User.update(
            {
              lastLogin: new Date(),
            },
            {
              where: {
                id: user.id,
              },
            }
          )
            .then(async () => {
              const newUser = await db.User.findOne({
                where: {
                  id: user.id,
                },
              });

              if (newUser) {
                createToken(newUser.username, (error, token) => {
                  if (error) {
                    return res.status(404).json({
                      success: false,
                      message: error,
                      data: null,
                    });
                  } else {
                    req.session.user = {
                      id: newUser.id,
                      auth: true,
                      username: newUser.username,
                      nama: newUser.nama,
                      role: newUser.role,
                      token: token,
                    };
                    return res.status(200).json({
                      success: true,
                      message: "Berhasil login",
                      data: newUser,
                    });
                  }
                });
              }
            })
            .catch((error) => {
              return res.status(404).json({
                success: false,
                message: error,
                data: null,
              });
            });
        }
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error,
      data: null,
    });
  }
};

const logOut = async (req, res) => {
  try {
    const result = await req.session.destroy();
    if (!result.user) {
      return res.status(404).json({
        success: false,
        message: "Sudah logout",
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Logout berhasil",
        data: null,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

const getSession = async (req, res) => {
  const result = await req.session;
  try {
    if (!req.session.user) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada session",
        data: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Berhasil get session",
        data: req.session.user,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = getBearerToken(req);

    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        message: "Token tidak ada",
        data: null,
      });
    } else {
      verifyToken(refreshToken, async (error, user) => {
        if (error) {
          if (req.session.user !== undefined) {
            const user = await db.User.findOne({
              where: {
                username: req.session.user.username,
              },
            });

            createToken(user.username, (error, token) => {
              if (error) {
                return res.status(404).json({
                  success: false,
                  message: error,
                  data: null,
                });
              } else {
                req.session.user = {
                  id: user.id,
                  auth: true,
                  username: user.username,
                  name: user.name,
                  telephone: user.telephone,
                  email: user.email,
                  role: user.role,
                  token: token,
                };
                return res.status(200).json({
                  success: true,
                  message: "Berhasil refresh token",
                  data: req.session.user,
                });
              }
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "Belum login",
              data: null,
            });
          }
        }

        if (user) {
          return res.status(200).json({
            success: true,
            message: "Token belum expired",
            data: req.session.user,
          });
        }
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

module.exports = {
  register,
  logIn,
  logOut,
  getSession,
  refreshToken,
};
