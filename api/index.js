const path = require('path')
const express = require('express')
const app = express()
const { connectMongo } = require('./db')
const { insertTransactions, getTransactions } = require('./controllers/index')
const routes = require('./routes/index')
const abiDecoder = require('abi-decoder')

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

app.use('/api/v1', routes)
app.use(express.static(path.resolve(__dirname, "./build")))
app.use(express.json())


