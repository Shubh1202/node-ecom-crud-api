const express = require("express")
const route = express.Router()
const categoryController = require("../Controllers/categoryController")

route.get("/", categoryController.categoriesList)
route.post("/add", categoryController.createCategory)
route.put("/update", categoryController.updateCategory)
route.delete("/delete", categoryController.deleteCategory)
route.get("/:id", categoryController.getCategoryById)

module.exports = route