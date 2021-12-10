 const { User } = require("../models/user")
module.exports.isAuthorized  = function(req, res, next) {
    const accessToken = req.headers.authorization.split(" ")[1]
    User.findOne({accessToken}).then(
        data => {
            if(data === null){
                res.status(401).json({error:"Not Authorized !"})
            }else{
                req.user = data
                next()
            }
        },
        err => {
            console.log(err);
            res.status(500).json({error:"Database Error !"})
        }
    )
}