import { ArrowLeftCircle } from '@styled-icons/feather'
import React, { useEffect, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import swal from 'sweetalert'
import { Context } from '~/App'
import CommonLayout from '~/common/CommonLayout'
import topNewsApi from '~/services/topNewsApi'
import type { ArticleType } from '~/types/ArticleType'
import {Routes} from '~/Constants'

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

const StyledImage = styled.img`
  width: 100%;
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
        } else {
          history.push(Routes.ERROR)
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

  const handleLinkClick = e => {
    e.stopPropagation()
    e.preventDefault()
    history.goBack()
  }

  const { urlToImage, content } = article
  return (
    <CommonLayout header={article.title}>
      <StyledImage src={urlToImage} alt="" />
      {content &&
        <p>{content}</p>
      }
      {history.location.state && history.location.state.from &&
        <Link to="" onClick={handleLinkClick}>
          <GoBackDiv >
            <ArrowLeftCircle style={{ cursor: 'pointer', marginRight: 10 }} size={20} />
            {t('Go back')}
          </GoBackDiv>
        </Link>
      }
    </CommonLayout>
  )
}
