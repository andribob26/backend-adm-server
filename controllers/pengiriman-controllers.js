const { sequelize } = require("../models/index.js");
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPagingData,
} = require("../utils/paginationHandler.js");

const addPengiriman = async (req, res) => {
  const list = req.body.detailPengiriman;
  try {
    db.Pengiriman.create({
      no: req.body.no,
      nama: req.body.nama,
      noPolisi: req.body.noPolisi,
      totalHarga: req.body.totalHarga,
    })
      .then((pengiriman) => {
        const listResult = list.map((item) => {
          return {
            idPengiriman: pengiriman.id,
            nama: item.nama,
            harga: item.harga,
            qty: item.qty,
            subTotal: item.subTotal,
          };
        });
        db.DetailPengiriman.bulkCreate(listResult)
          .then(async (result) => {
            Array.from(list).forEach((e) => {
              db.Produk.update(
                { stok: sequelize.literal(`stok - ${e.qty}`) },
                { where: { id: e.id } }
              );
            });

            return res.status(200).json({
              success: true,
              message: "Berhasil tambah pengiriman",
              data: pengiriman,
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

const getAllPengiriman = async (req, res) => {
  let condition = req.query.search
    ? {
        [Op.or]: [
          { pembeli: { [Op.iLike]: `%${req.query.search}%` } },
          { no: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      }
    : null;

  const { limit, offset } = getPagination(req.query.page, req.query.size);

  try {
    const pengiriman = await db.Pengiriman.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.DetailPengiriman,
          as: "detailPengiriman",
        },
      ],
      distinct: true,
    });
    if (!pengiriman) {
      return res.json({ success: false, message: "Gagal mendapatkan data" });
    } else {
      const data = getPagingData(pengiriman, req.query.page, limit);
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

const penyesuaianPengiriman = async (req, res) => {
  try {
    await Promise.all(
      Array.from(req.body.produks).map(async (e) => {
        try {
          await db.DetailPengiriman.update(
            {
              harga: e.harga,
              subTotal: sequelize.literal(`qty * ${e.harga}`),
            },
            { where: { id: e.id }, returning: true }
          );
        } catch (error) {
          console.log("error" + error);
        }
      })
    );

    const result = await db.Pengiriman.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.DetailPengiriman,
          as: "detailPengiriman",
        },
      ],
    });

    let sum = 0;
    result.detailPengiriman.forEach((e) => {
      sum += parseInt(e.subTotal);
    });

    if (sum > 0) {
      db.Pengiriman.update(
        {
          totalHarga: sum,
          pembeli: req.body.pembeli,
        },
        { where: { id: req.params.id } }
      ).then((rslt) => {
        return res.status(200).json({
          success: true,
          message: "Berhasil merubah data",
          data: rslt,
        });
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

const getDateRangePengiriman = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.size);
  try {
    const pengiriman = await db.Pengiriman.findAndCountAll({
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
          model: db.DetailPengiriman,
          as: "detailPengiriman",
        },
      ],
      distinct: true,
    });
    if (!pengiriman) {
      return res.json({ success: false, message: "Gagal mendapatkan data" });
    } else {
      const data = getPagingData(pengiriman, req.query.page, limit);
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
  addPengiriman,
  getAllPengiriman,
  penyesuaianPengiriman,
  getDateRangePengiriman,
};
