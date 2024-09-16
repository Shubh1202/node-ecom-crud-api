const express = require("express")
const route = express.Router()

const productController = require("../Controllers/productController")

route.get("/", productController.listProduct)
route.post("/add", productController.createProduct)
route.put("/update", productController.updateProduct)
route.delete("/delete", productController.deleteProduct)
route.get("/:id", productController.getProductById)
route.get("/fetaured-product/:count", productController.featuredProduct)


module.exports = route
