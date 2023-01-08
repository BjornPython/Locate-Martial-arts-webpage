const express = require("express")
const router = express.Router()

const { registerUser, loginUser } = require("../controllers/userControllers")
const {registerGym, loginGym, getGyms } = require("../controllers/gymControllers")



router.post("/users/register", registerUser)
router.post("/users/", loginUser)
router.post("/gym/register", registerGym)
router.post("/gym/", loginGym)
router.get("/gym/getgyms", getGyms)

module.exports = router