import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorType } from '~/types/ErrorType'
import Dimmer from './Dimmer'
import Loader from './Loader'

type CommonLayoutType = {
  children: any,
  loading?: boolean,
  error?: ErrorType
}

export default function CommonLayout({ loading, children, error }: CommonLayoutType) {
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
            {children}
          </div>
      }
    </>
  )
}
