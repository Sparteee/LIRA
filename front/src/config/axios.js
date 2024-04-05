import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:1337/api' // LOCAL
  // baseURL: 'https://vps1.lpmiaw-lr.fr/api' // PROD
})

export default instance