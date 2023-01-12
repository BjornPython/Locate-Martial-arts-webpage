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
    let { marts } = req.body
    let { lat, long } = req.body.location
    if (marts === "[]") {marts = null}
    // If location is not sent,
    if (!lat || !long || lat === null || long === null) {
        // If martial arts are sent, get users with lfspar = true and has one of the martial arts.
        if (marts) {
            console.log("IN SPAR 1");
            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: true}
            })
            let query = {lfspar: true, $or: []}
            query.$or = query.$or.concat(searchMarts.map(val => val)) 
            const user = await User.find(query);
            console.log("USER: ", user);
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            
        // if martial arts are not sent, get users with lfspar = true
        } else {
            console.log("IN SPAR 2");

            const user = await User.find({lfspar: true});
            console.log("USER: ", user);

            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    
        // if location is sent,
    } else {

        // if martial arts are sent, get users with lfspar = true, near the location, and has one of the martial arts.
        if (marts) {
            console.log("IN SPAR 3");

            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: true}
            })
            let query = {lfspar: true, "location.lat": {$lt: 0.3 + parseFloat(lat)}, "location.long": {$lt: 0.3 + parseFloat(long)}, $or: []}
            query.$or = query.$or.concat(searchMarts.map(val => val)) 
            const user = await User.find(query);
            console.log("USER: ", user);

            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts are not sent, return users with lfspar = true and near the location.
        } else {
            console.log("IN SPAR 4");

            const query = {lfspar: true, "location.lat": {$lt: 0.3 + parseFloat(lat)}, "location.long": {$lt: 0.3 + parseFloat(long)}}

            const user = await User.find(query);
            console.log("USER: ", user);

            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    }
}
)

const getCoachUsers = asyncHandler(async (req, res) => {
    console.log("IN GET COACHES");
    let { marts } = req.body
    let { lat, long } = req.body.location
    if (marts === "[]") {marts = null}
    // if location is not sent, 
    if (!lat || !long || lat === null || long === null) {
        // if martial arts are given, get users with coach = true, and has one of the martial arts.
        if (marts) {
            console.log("IN COACH 1");
            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })

            let query = {coach: true, $or: []}
            query.$or = query.$or.concat(searchMarts.map(val => val)) 

            const user = await User.find(query);

            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts are not given, get users with coach = true.
        } else {
            console.log("IN COACH 2");
            const user = await User.find({coach: true});
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
        // if location is given, 
    } else {
        // if martial arts are given, get users with coach = true, near the location, and has one of the martial arts.
        if (marts) {
            console.log("IN COACH 3");
            const jsonMarts = JSON.parse(marts)
            
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: true}
            })

            let query = {coach: true, "location.lat": {$lt: 0.3 + parseFloat(lat)}, "location.long": {$lt: 0.3 + parseFloat(long)}, $or: []}
            console.log("QUERY1: ", query );
            query.$or = query.$or.concat(searchMarts.map(val => val)) 
            console.log("QUERY2: ", query);
                // searchMarts.map((val) => query = {...query, ...val})
            const user = await User.find(query);
                
            console.log("USER: ", user);
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
            // if martial arts is not given, get users with coach = true, and near the location.
        } else {
            console.log("IN COACH 4");

            const query = {coach: true, "location.lat": {$lt: 0.3 + parseFloat(lat)}, "location.long": {$lt: 0.3 + parseFloat(long)}}
            const user = await User.find(query);
            if (user) {res.status(200).json(user)}
            else {res.status(401).json({message: "Failed to get data from user database."})}
        }
    }
}
)


module.exports = {registerUser, loginUser, getSparringUsers, getCoachUsers}
