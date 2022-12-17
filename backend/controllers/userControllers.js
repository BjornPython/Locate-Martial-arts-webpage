const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        nickname,
        email,
        password, 
        ma
    } = req.body


    console.log("BEFORE: ", ma);
    console.log("TYPE: ", typeof(ma));
    martialArts = JSON.parse(ma)
    console.log("AFTER: ", martialArts);


    if (!name || !nickname || !email || !password) {
        res.status(400)
        throw new Error("Please include name, nickname, email, and password Fields.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)


    const user = await User.create({
        name, nickname, email, password: hashedPass,
        ma: martialArts
    })


    res.status(200).json({sentinfo: req.body, user})
})




const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user) {
        res.status(400).json({message: "User email does not exist."})
    }
    console.log(await bcrypt.compare(password, user.password));
    if ( ! await bcrypt.compare(password, user.password)) {
        res.status(400).json({message: "Wrong password"})
    }
    
    res.status(200).json({message: "its WORKING!"})
})

module.exports = {registerUser, loginUser}