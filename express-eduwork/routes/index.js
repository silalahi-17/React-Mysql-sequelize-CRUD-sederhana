const express = require("express");
const router = express.Router();
// const userRoutes = require('./user.route');
const productRoutes = require('./product.route');

router.use("/", productRoutes);

module.exports = router;
