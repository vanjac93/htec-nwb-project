import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { Context } from '~/App'
import CardsComponent from '~/common/CardsComponent'
import CommonLayout from '~/common/CommonLayout'
import categoriesApi from '~/services/categoriesApi'

export default function Category() {
  const {category} = useParams()
  const {lan} = useContext(Context)
  const [data, setData] = useState({
    loading: false,
    articles: []
  })

  useEffect(() => {
    const fetchData = async () => {
      setData({...data, loading: true})
      try {
        const response = await categoriesApi.getByCategory(lan.id, category)
        setData({
          ...data,
          loading: false,
          articles: response.data.articles
        })
      } catch (error) {
        setData({...data, loading: false, error: error.response.data.message ? error.response.data.message : true})
        swal({ icon: 'warning', title: 'Error', text: error.response.data.message })
      }
    }

    fetchData()
  }, [lan])

  const {articles,error,loading} = data
  return (
    <CommonLayout loading={loading} error={error}>
      <h3>
        {`Top ${category} news in ${lan.label}`}
      </h3>
      <CardsComponent articles={articles} />
    </CommonLayout>
  )
}
