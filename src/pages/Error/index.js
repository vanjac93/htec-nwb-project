import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import CommonLayout from '~/common/CommonLayout'
import { Routes } from '~/Constants'

export default function Error() {
  const { t } = useTranslation()
  return (
    <CommonLayout>
      <Link to={Routes.HOME}>
        {t('The page you requested does not exist. Click here to go to home page.')}
      </Link>
    </CommonLayout>
  )
}
