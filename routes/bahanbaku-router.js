const express = require("express");
const checkIsInRole = require("../middlewares/check-is-in-role.js");
const auth = require("../middlewares/auth.js");
const ROLES = require("../utils/roles.js");
const {
  addBahanBaku,
  getAllBahanBaku,
  editBahanBaku,
  deleteBahanBaku,
} = require("../controllers/bahanbaku-controllers.js");

const bahanBakuRouter = express.Router();

bahanBakuRouter.post("/add-bahan-baku", addBahanBaku);
bahanBakuRouter.get("/get-all-bahan-baku", getAllBahanBaku);
bahanBakuRouter.put("/edit-bahan-baku/:id", editBahanBaku);
bahanBakuRouter.delete("/delete-bahan-baku/:id", deleteBahanBaku);

module.exports = bahanBakuRouter;
