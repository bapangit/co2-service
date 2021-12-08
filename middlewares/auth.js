 const { User } = require("../models/user")
module.exports.isAuthorized  = function(req, res, next) {
    const accessToken = req.headers.authorization.split(" ")[1]
    User.findOne({accessToken}).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {      
            if (user === null) {     
                var err = new Error('Not authorized! Go back!');
                err.status = 401;
                return next(err);
            } else {
                req.user = user
                return next();
            }
        }
    });
}