var jwt = require("jsonwebtoken")
const {User} = require("../../models/user")

var matchRefreshToken = (arr, oldToken, newToken) => {
    var newArr = [...arr]
    const index = newArr.indexOf(oldToken)
    if (index === -1) {
        return []
    }
    if (index === arr.length - 1) {
        newArr[0] = newToken
        return newArr
    }else if (index >= 0){
        newArr[index + 1] = newToken
    }
    return newArr
}
exports.refreshTokenController = (req, res) => {
    try{
        const {email} = jwt.verify(req.body.refreshToken, process.env.SECRET_KEY)
        User.findOne({ email: email }).then(
            data => {
                if (data) {
                    var accessToken = jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '120s' });
                    var refreshToken = jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
                    const newRefreshTokens = matchRefreshToken(data.refreshTokens, req.body.refreshToken, refreshToken)
                    User.findByIdAndUpdate(data._id, { accessToken: accessToken, refreshTokens: newRefreshTokens }).then(
                        data => { },
                        err => { console.log(err) }
                    )
                    if (newRefreshTokens.length > 0) {
                        res.json({ accessToken: accessToken, refreshToken: refreshToken })
                    } else {
                        res.status(401).json({error: "Authentication failed !"})
                    }
                } else {
                    res.status(401).json({error: "User not found !"})
                }
            },
            err => {
                res.status(500).json({error: "Database error !"})
            }
        )
    }catch(err){
        console.log("error token")
        res.status(401).json({error:"Session ended !"})
    }
    
}

