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
    location: {type: Object, required: false, default: {lat: 0, long: 0}},
    lfspar: {type: Boolean, required: false, default: false},
    coach: {type: Boolean, required: true, default: false},
    lcoach: {type: Boolean, required: false, default: false},
    lfight: {type: Boolean, required: false, default: false},
    lspartner: {type: Boolean, required: false, default: false},

    ma: {type: [], required: false, default: false, default: []},
    awards: {type: [], required: false, default: []}
    

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)