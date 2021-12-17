const { User } = require("../../models/user")
const { Photo } = require("../../models/photo")
exports.publish = async (req, res) => {
    const userId = req.user._id
    const photoId = req.body._id
    try {
        await User.findByIdAndUpdate(userId, { publicPhoto: photoId })
        await Photo.updateMany({ userId, published: true }, { published: false })   // Before publishing the photo making sure that all photos are unpublished .
        const photo = await Photo.findByIdAndUpdate(photoId, { published: true })
        res.status(200).json({ published: photo._id })
    } catch {
        res.status(500).json({ error: "Internal server error !" })
    }
}