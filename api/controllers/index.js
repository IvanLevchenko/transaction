const {getBlockNumber, getBlockByNumber, getTransactionByHash} = require('../blocks_api/index')
const TransactionModel = require('../models/transaction.model')
const moment = require('moment')

const insertTransactions = async () => {
  let maxCalls = 1000

  // Get block and insert transactions into database
  const fetchBlocks = async (calls = 0, prevBlockNumber, firstBlockNumber) => { 
    if(parseInt(prevBlockNumber) - maxCalls == parseInt(firstBlockNumber)) {
      return
    } else {
      try {
        setTimeout(async () => {
          let number = await getBlockNumber()
          let block = await getBlockByNumber(number)
          let firstNum
  
          if(calls == 0) {
            firstNum = number
          }
  
          if(number !== prevBlockNumber) {
            block.transactions.map(async (transaction) => { // Loop through transactions
              let date = moment.unix(block.timestamp) // Decoding timestamp to common date look
              await TransactionModel.create({  // Creating new collection entrie
                blockNumber: parseInt(transaction.blockNumber),
                transactionID: transaction.hash,
                senderAddress: transaction.from,
                recipentsAddress: transaction.to,
                blockConfirmations: parseInt(firstBlockNumber) ? parseInt(transaction.blockNumber) - parseInt(firstBlockNumber) : 0,
                date: `${date.year()}-${date.month() + 1}-${date.day()}`,
                value: '0.' + parseInt(transaction.value),
                transactionFee: ((((block.baseFeePerGas) * 10**-9) + ((transaction.maxPriorityFeePerGas) * 10**-9)) * (transaction.gas)) * 10**-9
              })
            })
            
          }
          fetchBlocks(calls + 1, number, firstNum ? firstNum : firstBlockNumber)
  
        }, 1100)

      } catch(e) {
        console.log('Error: block fetching error')
      }
    }
  }

  const count = await TransactionModel.count({}) // Getting collection length

  if(!count) {
    fetchBlocks()
  }

  // await TransactionModel.deleteMany({})
}

const getTransactions = async (req, res) => {
  const page = req.query.page
  const pageElementsAmount = req.query.pageElementsAmount
  const option = req.query.option
  const value = req.query.value

  try {
    const result = 
    await TransactionModel
    .find(option && value ? {[option]: value} : {}) // Finding all entries in collection
    .sort({$natural:-1}) // Sorting by reversed order
    .skip(page == 1 ? 0 : pageElementsAmount * page) // Skipping all unnecessary entries
    .limit(14) // Getting only N entries
    
    const latestBlockNumber = await getBlockNumber()
    result.forEach(async (entrie) => {
      await TransactionModel.findOneAndUpdate(
        {_id: entrie._id}, 
        {blockConfirmations: parseInt(latestBlockNumber) - parseInt(entrie.blockNumber)}
        )
    })

    const count = await TransactionModel.count(option && value ? {[option]: value} : {}) // Getting collection length
    console.log(count)
    const maxPages = Math.ceil(count / pageElementsAmount) // Calculating maximum possible pages amount
    if(!result.length) {
      getTransactions(req, res)
    } else {
      return res.status(200).send({result, maxPages})
    }

  } catch(e) {
    console.log('Error: in DB request')
    res.status(502).send('Something went wrong')
  } 
}

const filterTransactions = async (req, res) => {
  const option = req.query.option
  const page = req.query.page
  const pageElementsAmount = req.query.pageElementsAmount
  const value = req.query.value
  
  try {
    const filtered = 
      await TransactionModel
      .find({[option]: value}) // Filtering by value
      .sort({$natural:-1}) // Sorting by reversed order
      .skip(page == 1 ? 0 : pageElementsAmount * page) // Skipping all unnecessary entries
      .limit(14) // Getting only N entries

    res.status(200).send(filtered)
  } catch(e) {
    console.log('Error: filter error')
    res.status(504).send('Something went wrong')
  }
}

module.exports = {insertTransactions, getTransactions, filterTransactions}