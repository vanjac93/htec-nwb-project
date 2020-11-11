import { CategoryTypes, NumOfArticles } from '~/Constants'
import api from './api'

const categoriesApi = {
  getAllCategories: (lan: string) => api.all(
    Object.values(CategoryTypes).map(category => api.get(`/top-headlines?country=${lan}&category=${category}&pageSize=${NumOfArticles}`))
  ),
  getByCategory: (lan: string, category: string) => api.get(`/top-headlines?country=${lan}&category=${category}`)
}

export default categoriesApi