
export const Routes = Object.freeze({
  CATEGORIES: '/categories',
  TOP_NEWS: '/top-news',
  SEARCH: '/search',
  ERROR: '/error',
  ARTICLE: '/article/:title',
  CATEGORY: '/categories/:category',
  HOME: '',
  ROOT: '/'
})

export const Languages = Object.freeze({
  gb: {
    id: 'gb',
    label: 'Great Britain'
  },
  ru: {
    id: 'ru',
    label: 'Ruski'
  },
  rs: {
    id: 'rs',
    label: 'Srpski'
  }
})

export const CategoryTypes = Object.freeze({
  ENTERTAINMENT: 'entertainment',
  SCIENCE: 'science',
  GENERAL: 'general',
  HEALTH: 'health',
  SPORTS: 'sports',
  TECHNOLOGY: 'technology'
})

export const SmallScreenBreakpoint = 450

export const NumOfArticles = 5