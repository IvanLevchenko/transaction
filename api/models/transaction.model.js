const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  blockNumber: String,
  transactionID: String,
  senderAddress: String,
  recipentsAddress: String,
  blockConfirmations: String,
  date: String,
  value: String,
  transactionFee: String
})

module.exports = mongoose.model('transaction', transactionSchema)