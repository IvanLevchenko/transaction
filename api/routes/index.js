const express = require('express')
const app = express()

const {getTransactions, filterTransactions} = require('../controllers/index')

app.get('/get-transactions', getTransactions)
app.get('/filter-transactions', filterTransactions)

module.exports = app
