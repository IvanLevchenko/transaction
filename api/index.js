const express = require('express')
const app = express()
const { connectMongo } = require('./db')

app.listen(process.env.PORT || 3000, () => { // Listening server
  console.log('started')

  try {
    connectMongo() // Connection to mongoDB
  } catch(e) {
    console.log('Database connection error')
  }
})
