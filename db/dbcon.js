const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_DB_URL).then(
    res => {},
    err => {console.log(err)}
)