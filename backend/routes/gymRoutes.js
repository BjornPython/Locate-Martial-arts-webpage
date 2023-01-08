const express = require("express")
const router = express.Router()

const {registerGym, loginGym } = require("../controllers/gymControllers")

router.post("/register", registerGym)
router.post("/", loginGym)

module.exports = router