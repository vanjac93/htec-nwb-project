import React from 'react'
import styled from 'styled-components'
import { ArticleType } from '~/types/ArticleType'
import ArticleCard from './ArticleCard'

export const CardsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
`

type CardsCompProps = {
  articles: Array<ArticleType>
}

export default function CardsComponent({ articles }: CardsCompProps) {
  return (
    <CardsDiv>
      {
        articles.map((article) => <ArticleCard key={article.url} article={article} />)
      }
    </CardsDiv>
  )
}
