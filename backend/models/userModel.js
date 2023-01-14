const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

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
    location: {type: Object, required: false, default: {lat: 0, long: 0}}, // Users location
    lfspar: {type: Boolean, required: false, default: false}, // if User is looking for a sparring partner
    lfSparArts: {type: {}, required: false, default: {}}, // User's martial arts
    coach: {type: Boolean, required: true, default: false}, // if User is a coach
    teaches: {type: Object, required: false, default: {}}, // what the user teaches.
    lfcoach: {type: Boolean, required: false, default: false}, // if user is looking for a coach.
    lfcoachArts: {type: {}, required: false, default: {}},
    lfight: {type: Boolean, required: false, default: false}, // If user is looking for a fight.

    marts: {type: {}, required: false, default: false, default: {}}, 
    awards: {type: [], required: false, default: []}
    

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)