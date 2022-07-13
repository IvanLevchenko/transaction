const express = require('express')
const app = express()

const {getTransactions} = require('../controllers/index')

app.get('/get-transactions', getTransactions)

module.exports = app
