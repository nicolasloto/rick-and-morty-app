import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
})
