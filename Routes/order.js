const express = require("express")
const route = express.Router()
const orderController = require("../Controllers/orderController")

route.post("/add", orderController.createOrder)
route.put("/update", orderController.updateOrder)
route.get("/", orderController.listOrder)
route.get("/:id", orderController.getByIdOrder)
route.delete("/:id", orderController.deleteOrder)
route.get("/get/total-sales", orderController.getTotalSales)
route.get("/get/user-order/:userid", orderController.getUserOrder)
route.get("/get/order-count", orderController.getCountOrder)

module.exports = route