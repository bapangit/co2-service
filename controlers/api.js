var jwt = require("jsonwebtoken")
const { User } = require("../models/user")

var matchRefreshToken = (arr,oldToken,newToken) => {
    var newArr = [...arr]
    const index = newArr.indexOf(oldToken)
    if(index === -1){
        return []
    }
    if(index === arr.length-1){
        newArr[0] = newToken
        return newArr
    }
    if((index < arr.length-1) && index >= 0){
        newArr[index+1] = newToken
    }
    return newArr
}
exports.updateToken = (req, res) => {
    const decodedToken = jwt.verify(req.body.refreshToken, process.env.SECRET_KEY)
    User.findOne({ email: decodedToken.email }).then(
        data => {
            var accessToken = jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '15s' });
            var refreshToken = jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '1y' });
          const newRefreshTokens = matchRefreshToken(data.refreshTokens,req.body.refreshToken,refreshToken)
           User.findByIdAndUpdate(data._id,{accessToken:accessToken,refreshTokens:newRefreshTokens}).then(
               data => {},
               err => {console.log(err)}
           )
           if(newRefreshTokens.length > 0){
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
           }else{
            res.status(400).send({message: 'This is an error!'});
           }
        },
        err => {
            console.log(err)
        }
    )
}