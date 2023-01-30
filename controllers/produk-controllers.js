const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPagingData,
} = require("../utils/paginationHandler.js");

const addProduk = async (req, res) => {
  try {
    db.Produk.create({
      nama: req.body.nama,
    })
      .then((produk) => {
        return res.status(200).json({
          success: true,
          message: "Berhasil tambah data Bahan Baku",
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
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

const getAllProduk = async (req, res) => {
  let condition = req.query.search
    ? {
        [Op.or]: [{ nama: { [Op.iLike]: `%${req.query.search}%` } }],
      }
    : null;

  const { limit, offset } = getPagination(req.query.page, req.query.size);

  try {
    const produk = await db.Produk.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    if (!produk) {
      return res.json({ success: false, message: "Gagal mendapatkan data" });
    } else {
      const data = getPagingData(produk, req.query.page, limit);
      if (data.totalItems < 1) {
        if (req.query.search === "" || req.query.search === undefined) {
          return res.status(200).json({
            success: true,
            message: "Tidak ada data",
            data: data,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Tidak ada data yang cocok ditemukan",
            data: data,
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
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

const editProduk = async (req, res) => {
  try {
    const result = await db.Produk.update(
      {
        nama: req.body.nama,
        stok: req.body.stok,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: "Berhasil ubah data",
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Gagal ubah data",
        data: null,
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

const deleteProduk = async (req, res) => {
  try {
    const result = await db.Produk.destroy({
      where: { id: req.params.id },
    });
    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: "Berhasil menghapus data",
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Gagal menghapus data",
        data: null,
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
  addProduk,
  getAllProduk,
  editProduk,
  deleteProduk,
};
