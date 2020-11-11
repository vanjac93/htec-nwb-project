import { ArrowLeftCircle } from '@styled-icons/feather'
import React, { useEffect, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import swal from 'sweetalert'
import { Context } from '~/App'
import CommonLayout from '~/common/CommonLayout'
import topNewsApi from '~/services/topNewsApi'
import type { ArticleType } from '~/types/ArticleType'

const GoBackDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    width: fit-content;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: aquamarine;
    }
`

export default function Article() {
  const {t} = useTranslation()
  const { title } = useParams()
  const { lan, lanEnabled, setLanEnabled } = useContext(Context)
  const [article, setArticle] = useState(null)
  const history = useHistory()

  useEffect(() => {
    setLanEnabled(false)
    const fetchArticles = async () => {
      try {
        const response = await topNewsApi.getTopNews(lan.id)
        const foundArticle = response.data.articles.find((article: ArticleType) => article.title === decodeURIComponent(title))
        if (foundArticle) {
          setArticle(foundArticle)
        }
      } catch (error) {
        swal({ icon: 'warning', title: error.response.data.message })
      }
    }

    fetchArticles()

    return () => {
      setLanEnabled(true)
    }
  }, [lan, title, setLanEnabled, lanEnabled])

  if (!article) {
    return <div />
  }

  const { urlToImage, content } = article
  return (
    <CommonLayout >
      <h3>
        {article.title}
      </h3>
      <img style={{ width: '100%' }} src={urlToImage} alt="" />
      {content &&
        <p>{content}</p>
      }
      <GoBackDiv onClick={() => history.goBack()} >
        <ArrowLeftCircle style={{ cursor: 'pointer', marginRight: 10 }} size={20} />
        {t('Go back')}
      </GoBackDiv>
    </CommonLayout>
  )
}
