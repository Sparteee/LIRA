import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vps1.lpmiaw-lr.fr/api'
})

export default instance