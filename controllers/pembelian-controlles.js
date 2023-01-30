const { sequelize } = require("../models/index.js");
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPagingData,
} = require("../utils/paginationHandler.js");

const addPembelian = async (req, res) => {
  const list = req.body.detailPembelian;
  try {
    db.Pembelian.create({
      no: req.body.no,
      nama: req.body.nama,
      pemasok: req.body.pemasok,
      alamat: req.body.alamat,
      totalHarga: req.body.totalHarga,
    })
      .then((pembelian) => {
        const listResult = list.map((item) => {
          return {
            idPembelian: pembelian.id,
            nama: item.nama,
            harga: item.harga,
            qty: item.qty,
            subTotal: item.subTotal,
          };
        });
        db.DetailPembelian.bulkCreate(listResult)
          .then(async (result) => {
            Array.from(list).forEach((e) => {
              db.BahanBaku.update(
                { stok: sequelize.literal(`stok + ${e.qty}`) },
                { where: { id: e.id } }
              );
            });

            return res.status(200).json({
              success: true,
              message: "Berhasil tambah pembelian",
              data: pembelian,
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

const getAllPembelian = async (req, res) => {
  let condition = req.query.search
    ? {
        [Op.or]: [{ nama: { [Op.iLike]: `%${req.query.search}%` } }],
      }
    : null;

  const { limit, offset } = getPagination(req.query.page, req.query.size);

  try {
    const pembelian = await db.Pembelian.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.DetailPembelian,
          as: "detailPembelian",
        },
      ],
      distinct: true,
    });
    if (!pembelian) {
      return res.json({ success: false, message: "Gagal mendapatkan data" });
    } else {
      const data = getPagingData(pembelian, req.query.page, limit);
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

const getDateRangePembelian = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.size);
  try {
    const pembelian = await db.Pembelian.findAndCountAll({
      where: {
        createdAt: {
          [Op.between]: [`${req.query.start}`, `${req.query.end}`],
        },
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.DetailPembelian,
          as: "detailPembelian",
        },
      ],
      distinct: true,
    });
    if (!pembelian) {
      return res.json({ success: false, message: "Gagal mendapatkan data" });
    } else {
      const data = getPagingData(pembelian, req.query.page, limit);
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

module.exports = {
  getDateRangePembelian,
  getAllPembelian,
  addPembelian,
};
