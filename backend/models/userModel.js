const mongoose = require("mongoose")



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please include a name."]
    },
    nickname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "Please include an email."]
    },
    password: {
        type: String,
        required: [true, "Please include a password."]
    },

    coach: {type: Boolean, required: false, default: false},
    student: {type: Boolean, required: false, default: false},
    fighter: {type: Boolean, required: false, default: false},
    lcoach: {type: Boolean, required: false, default: false},
    lfight: {type: Boolean, required: false, default: false},
    lspartner: {type: Boolean, required: false, default: false},

    ma: {type: [], required: false, default: false, default: []},
    awards: {type: [], required: false, default: []}
    

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)