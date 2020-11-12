import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert'
import { Context } from '~/App'
import topNewsApi from '~/services/topNewsApi'
import CommonLayout from '~/common/CommonLayout'
import CardsComponent from '~/common/CardsComponent'
import {useTranslation} from 'react-i18next'

export default function TopNews() {

  const [data, setData] = useState({ loading: false, articles: []})
  const { lan } = useContext(Context)
  const {t} = useTranslation()
  useEffect(() => {
    const fetchData = async () => {
      setData(prevData => ({ ...prevData, loading: true }))
      try {
        const response = await topNewsApi.getTopNews(lan.id)
        setData(prevData => ({
          ...prevData,
          articles: response.data.articles,
          loading: false
        }))
      } catch (error) {
        setData(prevData => ({
          ...prevData,
          loading: false,
          error: error.response.data.message ? error.response.data.message : true
        }))
        swal({ icon: 'warning', title: t('Error'), text: error.response.data.message })
      }
    }

    fetchData()
  }, [lan])

  const { articles, loading, error } = data
  return (
    <CommonLayout error={error} loading={loading}>
      {articles.length > 0 ?
        <>
          <CardsComponent articles={articles} />
        </>
        :
        <p>{t('No news available.')}</p>
      }
    </CommonLayout>
  )
}
