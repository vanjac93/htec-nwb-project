import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Menu from '~/common/Menu'
import { Routes } from '~/Constants'
import Error from './Error'
import CommonLayout from '~/common/CommonLayout'

const Article = React.lazy(() => import('./Article'))
const Categories = React.lazy(() => import('./Categories'))
const Category = React.lazy(() => import('./Categories/Category'))
const Search = React.lazy(() => import('./Search'))
const TopNews = React.lazy(() => import('./TopNews'))


export default function RouterComponent() {
  const { t } = useTranslation()
  return (
    <Router >
      <Menu />
      <Suspense fallback={<CommonLayout header={t('Loading...')} />}>
        <Switch>
          <Route exact path={[Routes.HOME, Routes.ROOT, Routes.TOP_NEWS]} component={TopNews} />
          <Route exact path={Routes.CATEGORIES} component={Categories} />
          <Route exact path={Routes.CATEGORY} component={Category} />
          <Route exact path={Routes.SEARCH} component={Search} />
          <Route exact path={Routes.ERROR} component={Error} />
          <Route exact path={Routes.ARTICLE} component={Article} />
          <Redirect from="/*" to={Routes.ERROR} />
        </Switch>
      </Suspense>
    </Router>
  )
}
