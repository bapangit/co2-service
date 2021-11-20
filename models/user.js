const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String
    , email: {
        type: String
        , unique: true
    }
    , accessToken: String
    ,refreshTokens:[String,String]
})

const User = mongoose.model("user", userSchema);
module.exports = { User }