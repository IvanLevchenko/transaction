import _axios from './axios'

export const getTransactions = ({page, pageElementsAmount}) => {
  return _axios.get(`/get-transactions?page=${page}&pageElementsAmount=${pageElementsAmount}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}