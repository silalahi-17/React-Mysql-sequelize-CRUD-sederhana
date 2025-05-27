const express = require("express");
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, updateProductImage } = require("../controllers/product.controller");
const multer = require("multer");
const router = express.Router();
const upload = require('../middlewares/multerConfig')
const { uploadProductImage } = require("../controllers/product.controller");


router.get('/', getAllProducts);
router.post('/',upload.single('images'),createProduct);
router.get('/:id', getProductById);
router.put('/:id',upload.single('images') , updateProduct);
router.patch('/:id/', upload.single('images'), uploadProductImage);
router.delete('/:id', deleteProduct)

module.exports= router;
