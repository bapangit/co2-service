const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com")
const { User } = require('../../models/user');
var jwt = require('jsonwebtoken');
const allowedUsers = [ "bapanm4254@gmail.com" ]
const pass = true
exports.googleLogin = (req, res) => {
    const { tokenId } = req.body
    client.verifyIdToken({ idToken: tokenId, audience: "750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com" })
        .then(
            response => {
                const { email, name } = response.payload
                if(allowedUsers.includes(email) || pass){
                    User.findOne({ email: email }).then(
                        result => {
                            var accessToken = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '120s' });
                            var refreshToken = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '24h' });
                            var sendTokens = res => {
                                res.status(200).json({ accessToken, refreshToken, email })
                            }
    
                            if (result) {
                                User.findByIdAndUpdate(result._id, { accessToken: accessToken, refreshTokens: [refreshToken, "empty", "empty", "empty"] }).then(
                                    data => {
                                        if (data) {
                                            sendTokens(res)
                                        } else {
                                            res.status(500).json({ error: "Couldn't find user !" })
                                        }
                                    },
                                    err => {
                                        res.status(500).json({ error: "Couldn't find user !" })
                                    }
                                )
                            } else {
    
                                new User({ name: name, email: email, accessToken: accessToken, refreshTokens: [refreshToken, "empty", "empty", "empty"] }).save().then(
                                    data => {
                                        if (data) {
                                            sendTokens(res)
                                        } else {
                                            res.status(500).json({ error: "Couldn't create user !" })
                                        }
                                    },
                                    err => {
                                        res.status(500).json({ error: "Couldn't create user !" })
                                    }
                                )
                            }
    
                        },
                        err => {
                            res.status(500).json({ error: "Internal server error !" })
                        }
                    )
                }else{
                    res.status(403).send(new Error("User not allowed !"))
                }

            })
        .catch(err => {
            res.status(500).json({ error: "Internal server error !" })
        })
}