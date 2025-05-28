const {Product} = require('../models/');

const getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json({
        status: "Successfully",
        messege: "berhasil mengambil data",
        data: products
    });
}

const createProduct = async (req, res ) => {
  try {

    const { name, code, price, quantity } = req.body;
    const images = req.file ? req.file.name : null;
    if(!name || !code || !price || !quantity) {
        return res.status(401).json({
            status: "error",
            messege: "tidak berhasil membuat data",
        });
    }
        const product = await Product.create({
            name,
            code,
            price,
            quantity,
            images
        });
        res.status(201).json({
            status: "success",
            messege: "berhasil membuat data",
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            messege: "tidak berhasil membuat data",
        });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({
                status: "error",
                messege: "product tidak ditemukan"
            })
        }
        res.status(201).json({
            status: "success",
            messege: "data product berhasil diambil",
            data: product
        });
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {name, code, price, quantity } = req.body;
    const images = req.file ? req.file.name : null;

    // if(!name || !code || !price || !quantity) {
    //     return res.status(401).json({
    //         status: "error",
    //         messege: "tidak berhasil mengubah data",
    //     });
    // }

    const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({
                status: "error",
                messege: "product tidak ditemukan"
            })
        }
        
        
        // Update hanya field yang dikirim
        if (name !== undefined) product.name = name;
        if (code !== undefined) product.code = code;
        if (price !== undefined) product.price = parseInt(price);
        if (quantity !== undefined) product.quantity = parseInt(quantity); 
        if (req.file !== undefined) product.images = images;

        await product.save();
        res.status(200).json({
            status: "success",
            messege: "data product berhasil diubah",
            data: product
        });
}
const uploadProductImage = async (req, res) => {
    const { id } = req.params;
    const imagesPath = req.file.name;
    const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({
                status: "error",
                messege: "product tidak ditemukan"
            })
        }

        await product.update({
            images: imagesPath
        });
        res.status(200).json({
            status: "success",
            messege: "data product berhasil diubah",
            data: product
        });
    
        
} 

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({
                status: "error",
                messege: "product tidak ditemukan"
            })
        }
        await product.destroy();
        res.status(200).json({
            status: "success",
            messege: "data product berhasil dihapus",
            data: product
        });
}

module.exports = { 
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage
 };