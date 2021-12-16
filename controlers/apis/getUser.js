const { User } = require("../../models/user")

exports.getUser = (req,res) => {
    const {name,publicPhoto} = req.user
    res.status(200).json({name,publicPhoto})
}