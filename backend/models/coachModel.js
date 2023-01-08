const mongoose = require("mongoose")



const userSchema = mongoose.Schema({
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

    location: {type: Object, required: true, default: {lat: 0, long: 0}},
    teaches: {type: [], required: false, default: []},
    gyms: {type: Object, required: false, default: false},
    marts: {type: [], required: true, default: []},
    anywhere: {type: Boolean, required: true, default: false},
    lfspar: {type: Boolean, required: true, default: false}
    

}, {timestamps: true})

module.exports = mongoose.model("Coach", userSchema)
