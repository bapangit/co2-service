require('dotenv').config()
var express = require('express');
var app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const prt = process.env.PORT

require('./db/dbcon')

//routes
app.use("/",require('./routes/auth'))

app.get('/', function (req, res) {
   res.send('Good Morning All !');
})

//server
const port = prt || 8080

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})