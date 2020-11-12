import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ErrorType } from '~/types/ErrorType'
import Dimmer from './Dimmer'
import Loader from './Loader'

type CommonLayoutType = {
  children: any,
  loading?: boolean,
  error?: ErrorType,
  header: string
}

const ContentDiv = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.layout.backgroundColor};
  min-height: ${props => `calc(100% - ${props.theme.menu.height}px)`};
  box-sizing: border-box;
  position: relative;
`

const StyledHeader = styled.h4`
  text-align: center;
  margin: 10px;
`

const BackToTop = styled.div`
  position: sticky;
  top: ${props => `${props.theme.menu.height}px`};
  top: 0;
  right: 0px;
  z-index: 10;
`

export default function CommonLayout({ loading, header, children, error }: CommonLayoutType) {
  const {t} = useTranslation()
  if(error) {
    return <ContentDiv>
      <StyledHeader>
        {typeof error === 'string' ?
          error
          :
          t('Something went wrong!')
        }
      </StyledHeader>
    </ContentDiv>
  }

  return (
    <ContentDiv>
      {header &&
      <StyledHeader>
        {header}
      </StyledHeader>
      }
      {
        loading ?
          <Dimmer>
            <Loader />
          </Dimmer>
          :
          children
      }
    </ContentDiv>
  )
}
