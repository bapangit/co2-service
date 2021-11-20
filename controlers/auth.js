const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com")
const { User } = require('../models/user');
var jwt = require('jsonwebtoken');

exports.googleLogin = (req, res) => {
    const { tokenId } = req.body
    client.verifyIdToken(
        { idToken: tokenId, audience: "750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com" }
    )

        .then(response => {
            const { email_verified, email, name } = response.payload
            if (email_verified) {
                User.findOne({ email: email }).then(
                    result => {
                            var accessToken = jwt.sign({ email: email }, process.env.SECRET_KEY,{expiresIn:'10s'});
                            var refreshToken = jwt.sign({ email: email }, process.env.SECRET_KEY,{expiresIn:'1y'});
                            console.log(refreshToken)
                            var sendTokens = res => {
                                res.json({accessToken:accessToken,refreshToken:refreshToken})
                            }
                            
                        if (result) {
                            User.findByIdAndUpdate(result._id,{accessToken:accessToken,refreshTokens : [refreshToken,"empty"]}).then(
                                data=>{
                                    sendTokens(res)
                                },
                                err=>{
                                    console.log(err)
                                }
                            )
                        } else {
                            
                            new User({ name : name, email : email, accessToken : accessToken,refreshTokens : [refreshToken,"empty"]}).save().then(
                                data => {
                                    sendTokens(res)
                                },
                                err => {
                                    console.log(err)
                                }
                            )
                        }
                        
                    },
                    err => {

                    }
                )
            } else {
                res.send("error")
            }
        })
        .catch(err => {
            res.send("error")
        })
}