import api from './api'

const searchApi = {
  getArticlesByQuery: (lan: string, query: string) => api.get(`top-headlines?country=${lan}&q=${query}`)
}

export default searchApi