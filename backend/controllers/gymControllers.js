const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Gym = require("../models/gymModel")




// REGISTER GYM // REGISTER GYM // REGISTER GYM // REGISTER GYM // REGISTER GYM 

const registerGym = asyncHandler(async (req, res) => {
    console.log("IN REGISTER GYM");
    const {
        name,
        email,
        password,
        location,
        marts
    } = req.body


    if (!name || !email || !password || !location || !marts ) {
        res.status(400).json({message: "Please include all fields."})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)


    const gym = await Gym.create({
        name, email, password: hashedPass, location, marts
    })

    if (gym) {
        const token = generateToken(user.id)
        res.status(200).json(token)

    } else {
        res.status(400).json({error: "Failed to create Gym user."})

    }

})


// LOGIN GYM // LOGIN GYM // LOGIN GYM // LOGIN GYM // LOGIN GYM // LOGIN GYM 

const loginGym = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const gym = await Gym.findOne({email})

    if (!gym) {
        res.status(400).json({message: "Wrong Email or Password."})
    }
    console.log(await bcrypt.compare(password, gym.password));
    if ( ! await bcrypt.compare(password, gym.password)) {
        res.status(400).json({message: "Wrong password"})
    }
    
    const token = generateToken(user.id)
    res.status(200).json(token) 
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "7d"})
}


module.exports = {registerGym, loginGym}