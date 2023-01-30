const express = require("express");
const checkIsInRole = require("../middlewares/check-is-in-role.js");
const auth = require("../middlewares/auth.js");
const ROLES = require("../utils/roles.js");
const { addProduksi } = require("../controllers/produksi-controllers");

const produksiRouter = express.Router();

produksiRouter.post("/add-produksi", addProduksi);

// userRouter.get('/get-all-user', auth, checkIsInRole(ROLES.Admin), getAllUser)

module.exports = produksiRouter;
