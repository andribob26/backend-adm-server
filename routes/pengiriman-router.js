const express = require("express");
const checkIsInRole = require("../middlewares/check-is-in-role.js");
const auth = require("../middlewares/auth.js");
const ROLES = require("../utils/roles.js");
const {
  addPengiriman,
  getAllPengiriman,
  penyesuaianPengiriman,
  getDateRangePengiriman,
} = require("../controllers/pengiriman-controllers.js");

const pengirimanRouter = express.Router();

pengirimanRouter.post("/add-pengiriman", addPengiriman);
pengirimanRouter.get("/get-all-pengiriman", getAllPengiriman);
pengirimanRouter.get("/get-all-pengiriman-by-range", getDateRangePengiriman);
pengirimanRouter.put("/penyesuaian-pengiriman/:id", penyesuaianPengiriman);

module.exports = pengirimanRouter;
