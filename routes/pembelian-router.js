const express = require("express");
const checkIsInRole = require("../middlewares/check-is-in-role.js");
const auth = require("../middlewares/auth.js");
const ROLES = require("../utils/roles.js");
const {
  getDateRangePembelian,
  getAllPembelian,
  addPembelian,
} = require("../controllers/pembelian-controlles");

const pembelianRouter = express.Router();

pembelianRouter.post("/add-pembelian", addPembelian);
pembelianRouter.get("/get-all-pembelian", getAllPembelian);
pembelianRouter.get("/get-all-pembelian-by-range", getDateRangePembelian);

module.exports = pembelianRouter;
