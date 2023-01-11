const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Gym = require("../models/gymModel")
const e = require("express")




// REGISTER GYM // REGISTER GYM // REGISTER GYM // REGISTER GYM // REGISTER GYM 

const registerGym = asyncHandler(async (req, res) => {
    console.log("IN REGISTER GYM");
    console.log(req.body);
    const {
        name,
        email,
        password
    } = req.body


    if (!name || !email || !password ) {
        res.status(400).json({message: "Please include all fields."})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)


    
    const gym = await Gym.create({
        name, email, password: hashedPass
    })

    if (gym) {
        const token = generateToken(gym.id)
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


const getGyms = asyncHandler(async (req, res) => {
    const { marts } = req.body
    let { lat, long } = req.body

    // If location is not sent, 
    if (!lat || !long) {
        // if martial arts are given, get gyms that has one of the martial arts.
        if (marts) {
            const jsonMarts = JSON.parse(marts)
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const gyms = await Gym.find({$or: searchMarts});
            if (gyms) {res.status(200).json(gyms)}
            else {res.status(401).json({message: "Failed to get data from gym database."})}
            // if martial arts are not given, get all gyms.
        } else {
            const gyms = await Gym.find();
            if (gyms) {res.status(200).json(gyms)}
            else {res.status(401).json({message: "Failed to get data from gym database."})}
        }
    // if location is sent, 
    } else {
        // if martial arts are given, get gyms near the location, and has one of the martial arts.
        if (marts) {
            const searchMarts = jsonMarts.map((art) => {
                return {[`marts.${art}`]: {$exists: true}}
            })
            const gyms = await Gym.find(
                {$and: 
                    [
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}, 
                    {$or: searchMarts}
                    ]
                }
            );
            if (gyms) {res.status(200).json(gyms)}
            else {res.status(401).json({message: "Failed to get data from gym database."})}
            // if martial arts are not given, get gyms that are near the location.
        } else {
            const gyms = await Gym.find(
                {$and: 
                    [
                    {"location.lat": {$lt: 0.3 + parseFloat(lat)}}, 
                    {"location.long": {$lt: 0.3 + parseFloat(long)}}
                    ]
            });
            if (gyms) {res.status(200).json(gyms)}
            else {res.status(401).json({message: "Failed to get data from gym database."})}
        }
    }


})



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: "7d"})
}


module.exports = {registerGym, loginGym, getGyms}
