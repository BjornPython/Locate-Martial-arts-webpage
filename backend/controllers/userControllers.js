const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



// REGISTER USER // REGISTER USER // REGISTER USER // REGISTER USER // REGISTER USER 

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        coach,
        lfspartner
    } = req.body


    if (!name || !email || !password) {
        res.status(400).json({message: "Please include all fields."})
    }

    let isCoach
    if (!coach) {isCoach = false} else { isCoach = true }

    let islfSparner
    if (!lfspartner) {islfSparner = false} else { islfSparner = true}

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)


    const user = await User.create({
        name, email, password: hashedPass, coach: isCoach, lfspartner: islfSparner
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

// Generate token for Users
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "7d"})
}




// GETTING USER DATA // GETTING USER DATA // GETTING USER DATA // GETTING USER DATA 

const getSparringUsers = asyncHandler(async (req, res) => {
    console.log("IN GETSPARRINGUSERS");
    console.log(req.body);
    let { lat, long } = req.body
    let searchLoc = false
    if (!lat || !long) { searchLoc = false} else {console.log("IN ELSE"); lat = 0.3 + parseFloat(lat); long = 0.3 + parseFloat(long); searchLoc=true}
    console.log(lat, long);
    const sparringUsers = await User.find(
    !searchLoc 
    ? {lfspar: true}
    : {$and: [{lfspar: true}, {"location.lat": {$lt: lat}}, {"location.long": {$lt: long}}]}
    )


    console.log("sparringUsers: ", sparringUsers);
    if (sparringUsers) {
        res.status(200).json(sparringUsers)
    } 
    else {
        res.status(401).json({message: "FAILED TO GET DATA FROM USER DATABASE."})
    }
})

const getCoaches = asyncHandler(async (req, res) => {
    console.log("IN GET COACHES");

})


module.exports = {registerUser, loginUser, getSparringUsers}
