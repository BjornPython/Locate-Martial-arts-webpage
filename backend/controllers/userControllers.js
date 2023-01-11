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
    console.log("IN GET SPARRING USERS");
    const { marts } = req.body
    let { lat, long } = req.body

    // If location is not sent,
    if (!lat || !long) {
        // If martial arts are sent, get users with lfspar = true and has one of the martial arts.
        if (marts) {
            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const user = await User.find({$and: [{"lfspar": true}, {$or: searchMarts}]});
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            
        // if martial arts are not sent, get users with lfspar = true
        } else {
            const user = await User.find({"lfspar": true});
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    
        // if location is sent,
    } else {

        // if martial arts are sent, get users with lfspar = true, near the location, and has one of the martial arts.
        if (marts) {
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const user = await User.find(
                {$and: 
                    [
                    {"lfspar": true},
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}, 
                    {$or: searchMarts}
                    ]
                }
            );
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts are not sent, return users with lfspar = true and near the location.
        } else {
            const user = await User.find(
                {$and: 
                    [{"lfspar": true},
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}
                    ]
            });
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    }
}
)

const getCoachUsers = asyncHandler(async (req, res) => {
    console.log("IN GET COACHES");
    const { marts } = req.body
    let { lat, long } = req.body
    // if location is not sent, 
    if (!lat || !long) {
        // if martial arts are given, get users with coach = true, and has one of the martial arts.
        if (marts) {
            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const user = await User.find({$and: [{coach: true}, {$or: searchMarts}]});
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts are not given, get users with coach = true.
        } else {
            const user = await User.find({coach: true});
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
        // if location is given, 
    } else {
        // if martial arts are given, get users with coach = true, near the location, and has one of the martial arts.
        if (marts) {
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const user = await User.find(
                {$and: 
                    [
                    {coach: true},
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}, 
                    {$or: searchMarts}
                    ]
                }
            );
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts is not given, get users with coach = true, and near the location.
        } else {
            const user = await User.find(
                {$and: 
                    [
                    {coach: true},
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}
                    ]
            });
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    }
}
)


module.exports = {registerUser, loginUser, getSparringUsers, getCoachUsers}
