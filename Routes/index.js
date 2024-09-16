const express = require("express")
const app = express();


const categories = require("./category")
const products = require("./product")
const users = require("./user")
const orders = require("./order")

app.use("/categories", categories)
app.use("/products", products)
app.use("/users", users)
app.use("/orders", orders)


module.exports = app