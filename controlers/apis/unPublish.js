const { Photo } = require("../../models/photo")
const { User } = require("../../models/user")
exports.unPublish = async (req, res) => {
    const userId = req.user._id
    try {
        await Photo.updateMany({ userId, published: true }, { published: false })   // Before publishing the photo making sure that all photos are unpublished .
        await User.findByIdAndUpdate(userId,{publicPhoto: "null"})
        res.status(200).json({ message: "Success !" })
    } catch {
        res.status(500).json({ error: "Internal server error !" })
    }
}