import axios from 'axios'

export const api_rest = axios.create({
  baseURL: 'http://localhost:5000',
})
