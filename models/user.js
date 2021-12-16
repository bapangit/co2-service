const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String
    , email: {
        type: String
        , unique: true
    }
    , accessToken: String
    , refreshTokens: [String, String, String, String]
    , publicPhoto: {
        type: String
        , default: "null"
    }
})

const User = mongoose.model("user", userSchema);
module.exports = { User }