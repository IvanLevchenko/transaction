const {getBlockNumber, getBlockByNumber, getTransactionByHash} = require('../blocks_api/index')
const TransactionModel = require('../models/transaction.model')
const moment = require('moment')

const insertTransactions = async () => {
  let currentCalls = 0
  let totalCalls = 1
  let maxCallsPerSecond = 5
  let maxCalls = 8

  const sleep = ms => {
    console.log('sleep')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve() 
      }, ms)
    })
  }

  let number = await getBlockNumber()
  let block = await getBlockByNumber(number)

  let loop = async (transaction) => {
    let number = await getBlockNumber()
    let date = moment.unix(block.timestamp)
    if (currentCalls < maxCallsPerSecond) {
      console.log('lesser than 5')
      currentCalls++;
      await TransactionModel.create({
        blockNumber: number,
        transactionID: transaction.hash,
        senderAddress: transaction.from,
        RecipentsAddress: transaction.to,
        blockConfirmations: parseInt(number) - parseInt(transaction.blockNumber),
        date: `${date.year()}-${date.month()}-${date.day()}`,
        value: transaction.value,
        transactionFee: block.baseFeePerGas
      })
    } else {
      sleep(1100).then((res) => {
        currentCalls = 0;
        loop(transaction)
      });
    }
  }

  await block.transactions.map(loop)

  // const fetchBlocks = async (lastIndex = 0) => {
  //   console.log('###### FETCHING ######')
  //   let number = await getBlockNumber()
  //   let block = await getBlockByNumber(number)
  //   console.log(lastIndex)
  //   console.log(`number: ${number}`)
  //   console.log(`length: ${block?.transactions?.length}`)
  //   await block.transactions.slice(lastIndex).map(async (transaction, index) => {
  //     if(index < maxCallsPerSecond - 1) {
  //       console.log(currentCalls)
  //       let number = await getBlockNumber()
  //       let date = moment.unix(block.timestamp)
  //       await TransactionModel.create({
  //         blockNumber: number,
  //         transactionID: transaction.hash,
  //         senderAddress: transaction.from,
  //         RecipentsAddress: transaction.to,
  //         blockConfirmations: parseInt(number) - parseInt(transaction.blockNumber),
  //         date: `${date.year()}-${date.month()}-${date.day()}`,
  //         value: transaction.value,
  //         transactionFee: block.baseFeePerGas
  //       })
  //       if(totalCalls == maxCalls) {
  //         return
  //       } else {
  //         if(currentCalls < maxCallsPerSecond) {
  //           currentCalls++
  //           totalCalls++
  //           fetchBlocks(index + lastIndex)
  //         } else {
  //           totalCalls++
  //           currentCalls = 0
  //           sleep(1100).then(res => {
  //             fetchBlocks(index + lastIndex)
  //           })
  //         }
  //       }
  //     } else {
  //       sleep(1100).then(res => {
  //         return
  //       })
  //     }
  //   })
  
  // }
  // fetchBlocks()
  // await TransactionModel.deleteMany({})
}

module.exports = {insertTransactions}