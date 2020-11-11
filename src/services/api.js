import axios from 'axios'
import env from '~/env'

axios.defaults.baseURL = 'https://newsapi.org/v2/'
axios.defaults.headers.common['Authorization'] = env.apiKey
const api = axios

export default api