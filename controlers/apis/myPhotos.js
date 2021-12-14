const { Photo } = require("../../models/photo");

const skipAmount = 4
exports.myPhotos = (req, res) => {
    const {_id} = req.user
    const page = req.body.p
    Photo.find({ userId: _id })
    .sort({createdAt: -1})
    .skip(skipAmount*page)
    .limit(4)
    .then(
        data => { res.status(200).json(data) },
        err => {res.status(500).json({error:"Internal Server Error."})}
    )
}