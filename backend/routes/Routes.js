const express = require("express")
const router = express.Router()

const { registerUser, loginUser, getSparringUsers, getCoachUsers, getUserInfo, updateUserInfo } = require("../controllers/userControllers")
const {registerGym, loginGym, getGyms } = require("../controllers/gymControllers")


router.get("/users", getUserInfo)
router.post("/users/register", registerUser)
router.post("/users/login", loginUser)
router.post("/users/sparringusers", getSparringUsers)
router.post("/users/coachusers", getCoachUsers)
router.post("/users/update", updateUserInfo)
router.post("/gym/register", registerGym)
router.post("/gym/login", loginGym)
router.post("/gym/getgyms", getGyms)

module.exports = router