const express = require("express")
const gymRouter = express.Router()

const {registerGym, loginGym } = require("../controllers/gymControllers")

gymRouter.post("/register", registerGym)
gymRouter.post("/", loginGym)

module.exports = gymRouter