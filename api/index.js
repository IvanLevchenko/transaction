const express = require('express')
const app = express()
const { connectMongo } = require('./db')

const { insertTransactions } = require('./controllers/index')

app.listen(process.env.PORT || 3000, async () => { // Listening server
  console.log('started')
  let isError
  try {
    connectMongo() // Connection to mongoDB
  } catch(e) {
    isError = true
    console.log('Database connection error')
  }
  if(!isError) {
    insertTransactions() // Inserting transactions into DB
  }
})

