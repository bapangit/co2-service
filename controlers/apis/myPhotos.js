const { Photo } = require("../../models/photo");

exports.myPhotos = (req, res) => {
    const {_id} = req.user
    const page = req.body.p
    Photo.find({ userId: _id })
    .sort({createdAt: -1})
    .skip(4*page)
    .limit(4)
    .then(
        data => { res.status(200).json(data) },
        err => {console.log(err)}
    )
}