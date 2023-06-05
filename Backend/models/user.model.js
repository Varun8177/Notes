const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: { type: String },
    password: String,
    location: String,
    age: Number
}, {
    versionKey: false
})

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel