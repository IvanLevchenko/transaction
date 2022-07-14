import _axios from './axios'

export const getTransactions = ({page, pageElementsAmount, option, value}) => {
  return _axios.get(`/get-transactions?page=${page}&pageElementsAmount=${pageElementsAmount}&option=${option}&value=${value}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const filterTransactions = ({option, pageElementsAmount, page, value}) => {
  return _axios.get(
    `/filter-transactions?option=${option}&pageElementsAmount=${pageElementsAmount}&page=${page}&value=${value}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}