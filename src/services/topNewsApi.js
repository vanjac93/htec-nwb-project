import api from './api'

const topNewsApi = {
  getTopNews: (lan: string) => api.get(`/top-headlines?country=${lan}`)
}

export default topNewsApi