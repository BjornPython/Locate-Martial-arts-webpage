const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



// REGISTER USER // REGISTER USER // REGISTER USER // REGISTER USER // REGISTER USER 

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body


    if (!name || !email || !password) {
        res.status(400).json({message: "Please include all fields."})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)


    const user = await User.create({
        name, email, password: hashedPass,
    })

    if (user) {
        const token = generateToken(user.id)
        res.status(200).json(token)

    } else {
        res.status(400).json({error: "Failed to create User."})

    }

})


// LOGIN USER // LOGIN USER // LOGIN USER // LOGIN USER // LOGIN USER // LOGIN USER 

const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user) {
        res.status(400).json({message: "Wrong Email or Password."})
    }
    console.log(await bcrypt.compare(password, user.password));
    if ( ! await bcrypt.compare(password, user.password)) {
        res.status(400).json({message: "Wrong password"})
    }
    
    const token = generateToken(user.id)
    res.status(200).json(token) 
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "7d"})
}


module.exports = {registerUser, loginUser}