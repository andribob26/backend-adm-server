const express = require("express");
const checkIsInRole = require("../middlewares/check-is-in-role.js");
const auth = require("../middlewares/auth.js");
const ROLES = require("../utils/roles.js");
const {
  addProduk,
  getAllProduk,
  deleteProduk,
  editProduk,
} = require("../controllers/produk-controllers");

const produkRouter = express.Router();

produkRouter.post("/add-produk", addProduk);
produkRouter.get("/get-all-produk", getAllProduk);
produkRouter.put("/edit-produk/:id", editProduk);
produkRouter.delete("/delete-produk/:id", deleteProduk);

module.exports = produkRouter;
