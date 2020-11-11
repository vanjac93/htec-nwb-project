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


const StyledHeader = styled.h4`
  text-align: center;
`

export default function CommonLayout({ loading, header, children, error }: CommonLayoutType) {
  const {t} = useTranslation()
  if(error) {
    return <div>
      <h3>
        {typeof error === 'string' ?
          error
          :
          t('Something went wrong!')
        }
      </h3>
    </div>
  }

  return (
    <>
      {
        loading ?
          <Dimmer>
            <Loader />
          </Dimmer>
          :
          <div style={{ padding: 10 }}>
            <StyledHeader>{header}</StyledHeader>
            {children}
          </div>
      }
    </>
  )
}
