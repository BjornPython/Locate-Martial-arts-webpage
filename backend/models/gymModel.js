const mongoose = require("mongoose")



const gymSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please include a name."]
    },
    email: {
        type: String,
        required: [true, "Please include an email."]
    },
    password: {
        type: String,
        required: [true, "Please include a password."]
    },

    location: {type: Object, required: false, default: {lat: 0, long: 0}},
    marts: {type: Object, required: false, default: {"muay thai": ["coach id sample 1", "coach id sample 2"]}}}
    

, {timestamps: true})

module.exports = mongoose.model("Gym", gymSchema)
