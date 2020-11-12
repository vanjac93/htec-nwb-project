import { ArrowRight } from '@styled-icons/feather'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Routes } from '~/Constants'
import type { ArticleType } from '~/types/ArticleType'

const StyledCardDiv = styled.div`
    width: 200px;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 260px;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    background-color: ${props => props.theme.layout.topNews.cardBackgroundColor};
    color: white;
    box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
                0 2px 2px rgba(0,0,0,0.12), 
                0 4px 4px rgba(0,0,0,0.12), 
                0 8px 8px rgba(0,0,0,0.12),
                0 16px 16px rgba(0,0,0,0.12);
`

export const MoreDiv = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  flex-direction: row-reverse;
`

const StyledImg = styled.img`
  width: calc(100% - 10px);
  margin: 10px 0px;
  height: 50px;
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px; 
`

const DescriptionSpan = styled.span`
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`

type CardProps = {
  article: ArticleType | null,
  width?: string
}

export default function ArticleCard({ article, width }: CardProps) {
  const {t} = useTranslation()
  const {pathname} = useLocation()
  if (!article) {
    return <div />
  }

  const { title, description, urlToImage } = article
  return (
    <StyledCardDiv width={width}>
      <strong>{title}</strong>
      {urlToImage ?
        <StyledImg alt="" src={urlToImage} />
        :
        <div style={{ flex: 1 }} />
      }
      {description &&
        <DescriptionSpan>
          {description}
        </DescriptionSpan>
      }
      <MoreDiv>
        <Link to={{
          pathname: Routes.ARTICLE.replace(':title', encodeURIComponent(title)),
          state: {
            from: pathname
          }
        }}>
          <span style={{marginRight: 5}}>{t('More')}</span>
          <ArrowRight size={12} />
        </Link>
      </MoreDiv>
    </StyledCardDiv>
  )
}
