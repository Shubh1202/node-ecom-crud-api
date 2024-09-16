const express = require("express")
const route = express.Router()
const userController = require("../Controllers/userController")

route.get("/", userController.listUser)
route.get("/:id", userController.getByIdUser)
route.post("/add", userController.createUser)
route.post("/login", userController.loginUser)
route.put("/update", userController.updateUser)
route.delete("/delete", userController.deleteUser)


module.exports = route