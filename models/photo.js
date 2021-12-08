const mongoose = require('mongoose')

const photoSchema = mongoose.Schema(
    {name: String,
    userId:String,
    photoUrl:String,
    cloudinaryId:String},
    {timestamps:true}
    )
const Photo = mongoose.model("photo", photoSchema);
module.exports = { Photo }