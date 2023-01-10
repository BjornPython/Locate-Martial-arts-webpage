const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getSparringUsers } = require("../controllers/userControllers")
const {registerGym, loginGym, getGyms } = require("../controllers/gymControllers")



router.post("/users/register", registerUser)
router.post("/users/login", loginUser)
router.get("/users/sparringusers", getSparringUsers)
router.post("/gym/register", registerGym)
router.post("/gym/login", loginGym)
router.post("/gym/getgyms", getGyms)

module.exports = router