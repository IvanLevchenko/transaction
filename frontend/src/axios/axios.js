import axios from 'axios'

const _axios = axios.create({baseURL: 'http://localhost:3000/api/v1'})
export default _axios