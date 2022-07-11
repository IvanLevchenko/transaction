require('dotenv').config()

const mongoose = require('mongoose')

const connectMongo = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('connected', () => console.log('=== DB connected ==='))
}

module.exports = { connectMongo }