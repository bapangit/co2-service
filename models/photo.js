const mongoose = require('mongoose')

const photoSchema = mongoose.Schema(
    {
        name: String,
        userId: String,
        photoUrl: String,
        cloudinaryId: String,
        published: { type: Boolean, default: false }
    },
    { timestamps: true }
)
const Photo = mongoose.model("photo", photoSchema);
module.exports = { Photo }