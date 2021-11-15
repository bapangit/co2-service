const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')

passport.use(new googleStrategy({
    clientID:"750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com"
    ,clientSecret:"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"
    ,callbackURL:"/auth/google/callback"
 },(accessToken,refreshToken,profile,done)=>{
    console.log(accessToken)
    return done(null,profile);
 }))

 passport.serializeUser(function(user,done){
     done(null,user)
 })
 passport.deserializeUser(function(user,done){
    done(null,user)
})
 const CLIENT_ID = "750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com"
 const CLIENT_SECRET = "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"
 const CALLBACK_URL = "auth/google/callback"