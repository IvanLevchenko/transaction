const axios = require('axios')

const getBlockNumber = async () => {
  let number = await axios.get(
    `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${process.env.API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  number = number.data.result
  return number
}

const getBlockByNumber = async (tag) => {
  let block = await axios.get(
    `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${tag}&boolean=true&apikey=${process.env.API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  return block.data.result
}

const getTransactionByHash = async (hash) => {
  let transaction = await axios.get(
    `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${process.env.API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  return transaction.data.result
}

module.exports = {getBlockNumber, getBlockByNumber, getTransactionByHash}