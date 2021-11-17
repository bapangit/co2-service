const{OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client("750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com")

exports.googleLogin = (req,res) => {
    const {tokenId} = req.body
    client.verifyIdToken({idToken:tokenId,audience:"750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com"})
    .then(response => {
        const {email_verified,email,name} = response.payload
        console.log(name)
    }).catch( err => {
        console.log(err)
    })
}