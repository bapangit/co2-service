const { Photo } = require("../../models/photo")
const skipAmount = 4
exports.photosToday = (req, res) => {
    const page = 0
    Photo.find({ published: true })
        .sort({ createdAt: -1 })
        .skip(skipAmount * page)
        .limit(skipAmount)
        .select({
            photoUrl : 1
        }).then(
            data => {
                res.status(200).json(data)
            },
            err => res.status(500).json({ error: "Database error !" })
        )
}