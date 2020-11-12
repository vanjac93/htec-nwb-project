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

const search = async (query: string) => {
  try {
    const response = await searchApi.getArticlesByQuery(lan.id, encodeURIComponent(query))
    return response.data
  } catch (error) {
    return error
  }
}

export default function Search() {
  const { lan } = useContext(Context)
  const {hash} = useLocation()
  const {t} = useTranslation()
  const [data, setData] = useState({
    articles: [],
    loading: false,
    noResults: false,
    query: ''
  })

  const debouncedHashUpdate = useCallback((
    debounce((queryVal: string) => {
      if(queryVal) {
        window.location.hash = queryVal
      } else {
        window.location.hash = ''
      }
    }, 500)), [lan])

  useEffect(() => {
    if(hash) {
      const query = hash.split('#')[1]

      const searchByQuery = async () => {
        setData({...data, loading: true, query})
        try {
          const response = await searchApi.getArticlesByQuery(lan.id, encodeURIComponent(query))
          setData({
            ...data,
            query,
            articles: response.data.articles,
            noResults: response.data.articles.length > 0 ? false: true,
            loading: false
          })
        } catch (error) {
          setData({
            ...data,
            loading: false,
            noResults: false,
            error: error.response.data.message ? error.response.data.message : true
          })
          swal({ icon: 'warning', title: t('Error'), text: error.response.data.message })
        }
      }

      searchByQuery()
    } else {
      setData({...data, articles:  [], noResults: false, query: ''})
    }
  }, [hash, lan])


  const handleInputChange = ({ currentTarget: { value } }: SyntheticEvent<HTMLInputElement>) => {
    setData({...data, query: value})
    if(!value) {
      window.location.hash = ''
    } else {
      debouncedHashUpdate(value)
    }
  }

  const {articles, loading, query, error, noResults} = data

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
