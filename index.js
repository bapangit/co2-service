var express = require('express');
const passport = require('passport')
var app = express();
app.use(passport.initialize());
require('./auth')

  app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

  

const port = process.env.PORT || 8080

app.get('/', function (req, res) {
   res.send('Good Morning !');
})

app.get('/success', function (req, res) {
   res.send('Loggedin !');
   console.log("logged in")
})

app.get('/error', function (req, res) {
   res.send('Login Failed !');
   console.log("did not login")
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})