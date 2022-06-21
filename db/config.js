const mongoose = require('mongoose')
require('dotenv').config()

function dbConnect() {
    mongoose.connect(process.env.MONGODB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    dbConnect
}
