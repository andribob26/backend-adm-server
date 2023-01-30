const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const { sequelize } = require("../models/index.js");
const {
  getPagination,
  getPagingData,
} = require("../utils/paginationHandler.js");

const addProduksi = async (req, res) => {
  try {
    db.BahanBaku.update(
      { stok: sequelize.literal(`stok - ${req.body.qtyBahanBaku}`) },
      { where: { id: req.body.idBahanBaku } }
    )
      .then((bahanbaku) => {
        db.Produk.update(
          { stok: sequelize.literal(`stok + ${req.body.qtyProduk}`) },
          { where: { id: req.body.idProduk } }
        )
          .then((produk) => {
            return res.status(200).json({
              success: true,
              message: "Berhasil tambah data",
              data: produk,
            });
          })
          .catch((error) => {
            return res.status(404).json({
              success: false,
              message: error.errors[0].message,
              data: null,
            });
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

module.exports = {
  addProduksi,
};
