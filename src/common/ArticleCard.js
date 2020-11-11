import { ArrowRight } from '@styled-icons/feather'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Routes } from '~/Constants'
import type { ArticleType } from '~/types/ArticleType'

const StyledCardDiv = styled.div`
    width: 200px;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 260px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
`

type CardProps = {
  article: ArticleType | null,
  width?: string
}

export default function ArticleCard({ article, width }: CardProps) {
  const {t} = useTranslation()
  if (!article) {
    return <div />
  }

  const { title, description, urlToImage } = article
  return (
    <StyledCardDiv width={width}>
      {/* <Circle color='green' size={12} /> */}
      {title}
      {urlToImage ?
        <img alt="" src={urlToImage} style={{ width: '100%', margin: '10px 0px', height: 50, flex: 1 }}></img>
        :
        <div style={{ flex: 1 }} />
      }
      {description &&
        <span style={{ textOverflow: 'ellipsis', display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
          {description}
        </span>
      }
      <Link to={Routes.ARTICLE.replace(':title', encodeURIComponent(title))}>
        <div style={{ display: 'flex', marginTop: 5, alignItems: 'center', flexDirection: 'row-reverse' }}>
          <ArrowRight size={12} />
          {t('More')}
        </div>
      </Link>
    </StyledCardDiv>
  )
}
