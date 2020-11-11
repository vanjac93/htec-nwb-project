import React, { SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Context } from '~/App'
import CommonLayout from '~/common/CommonLayout'
import debounce from 'lodash.debounce'
import searchApi from '~/services/searchApi'
import swal from 'sweetalert'
import CardsComponent from '~/common/CardsComponent'
import { useLocation } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import Loader from '~/common/Loader'

const StyledInput = styled.input`
  background-color: aliceblue;
  outline: inherit;
  border: none;
  margin: 20px;
  height: 30px;
  border-radius: 5px;
  padding-left: 10px;
`


export default function Search() {
  const [query, setQuery] = useState('')
  const { lan } = useContext(Context)
  const { hash } = useLocation()
  const {t} = useTranslation()
  const [data, setData] = useState({
    articles: [],
    loading: false,
    noResults: false
  })

  const searchNews = useCallback((
    debounce(async (queryVal: string) => {
      if (queryVal) {
        setData({...data, loading: true})
        try {
          const response = await searchApi.getArticlesByQuery(lan.id, encodeURIComponent(queryVal))
          setData({
            ...data,
            articles: response.data.articles,
            noResults: response.data.articles.length > 0 ? false: true,
            loading: false
          })
          window.location.hash = queryVal
        } catch (error) {
          setData({
            ...data,
            loading: false,
            noResults: false,
            error: error.response.data.message ? error.response.data.message : true
          })
          swal({ icon: 'warning', title: 'Error', text: error.response.data.message })
        }
      } else {
        window.history.pushState('', document.title, window.location.pathname + window.location.search)
        setData({...data, articles:  [], noResults: false})
      }
    }, 700)
  ), [lan])

  useEffect(() => {
    if (hash) {
      const hashQuery = hash.split('#')[1]
      setQuery(hashQuery)
      searchNews(hashQuery)
    }
  }, [])

  useEffect(() => {
    if (query) {
      searchNews(query)
    }
  }, [searchNews, query])

  const handleInputChange = ({ currentTarget: { value } }: SyntheticEvent<HTMLInputElement>) => {
    setQuery(value)
    searchNews(value)
  }

  const {articles, loading, error, noResults} = data

  const renderResults = () => {
    if(articles.length) {
      return <CardsComponent articles={articles} />
    }
    if(loading) {
      return <Loader />
    }
    if(noResults) {
      return <p style={{textAlign: 'center'}}>{t('No results.')}</p>
    }
  }

  return (
    <CommonLayout header={t('Search top news by term')} error={error}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledInput placeholder={t('Search term...')} value={query} onChange={handleInputChange} />
      </div>
      {renderResults()}
    </CommonLayout>
  )
}
