const app = require('express')()
require('dotenv').config()
const { dbConnect } = require('./db/config')

//connecting to mongodb
dbConnect()

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`))