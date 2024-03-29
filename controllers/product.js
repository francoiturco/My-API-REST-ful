'use strict'

const Product = require('../models/product');

function getProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) =>{
        if (err){
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        }else if (!product){
            return res.status(404).send({message: 'El producto no existe'});
        }else{
            return res.status(200).send({ product });
        };
    });
};

function getProducts(req, res) {
    Product.find({}, (err, products) =>{
        if (err){
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        }else if (!products){
            return res.status(404).send({message: 'No existen productos'});
        }else{
            return res.status(200).send({ products });
        };
    });
};

function updateProduct(req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) =>{
        if (err){
            res.status(500).send({message: `Error al modificar el producto: ${err}`});
        }else{
            res.status(200).send({ product: productUpdate })
        };
    });
}

function saveProduct(req, res) {
    console.log('POST/api/product');
    console.log(req.body);

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) =>{
        if (err) {
            return res.status(500).send({message: `Error al guardar en base de datos ${err}`})
        }else{
            return res.status(200).send({message:'Producto Guardado'})
        };
    });
};

function deleteProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) =>{
        if (err){
            res.status(500).send({message: `Error al borrar el producto: ${err}`});
        }else{
            product.remove(err => {
                if (err){
                    res.status(500).send({message: `Error al borrar el producto: ${err}`});
                }else{
                    res.status(200).send({message: 'Producto Borrado'});
                };
            });
        };
    });
};

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
};
