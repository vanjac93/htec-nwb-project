import { ArrowLeft, ArrowRight, ArrowDown } from '@styled-icons/feather'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { Context } from '~/App'
import CommonLayout from '~/common/CommonLayout'
import { CategoryTypes, Routes } from '~/Constants'
import categoriesApi from '~/services/categoriesApi'
import { SlideItem, Slider, StyledArrowLeftCircle, ArticleText, SlideRightDiv,
  StyledArrowRightCircle, SlideLeftDiv, HeaderDiv, SliderContainer, SlideImg } from './index.styled'
import {MoreDiv} from '~/common/ArticleCard'

const Slide = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
}

export default function Categories() {
  const { lan } = useContext(Context)
  const {t} = useTranslation()
  const history = useHistory()
  const [data, setData] = useState({
    loading: false,
    categories: [],
    positions: []
  })

  useEffect(() => {
    const fetchData = async () => {
      setData({ ...data, loading: true })
      try {
        const categories = []
        const responses = await categoriesApi.getAllCategories(lan.id)
        Object.values(CategoryTypes).forEach((category, index) => {
          categories.push({
            category,
            articles: responses[index].data.articles,
            open: false
          })
        })
        setData(prevData => ({
          ...prevData,
          loading: false,
          categories,
          positions: Array(categories.length).fill(0)
        }))
      } catch (error) {
        setData(prevData => ({
          ...prevData,
          loading: false,
          error: error.response.data.message ? error.response.data.message : true
        }))
        swal({ icon: 'warning', title: t('Something went wrong!'), text: error.response.data.message })
      }
    }

    fetchData()
  }, [lan])


  const handleSlide = (index: number, slide: string) => {
    const positions = [...data.positions]
    switch (slide) {
      case Slide.LEFT:
        if (positions[index]) {
          positions[index] = positions[index] + 100
          setData({ ...data, positions })
        }
        break
      case Slide.RIGHT:
        if (positions[index] !== (-(data.categories[index].articles.length - 1) * 100)) {
          positions[index] = positions[index] - 100
          setData({ ...data, positions })
        }
        break
      default:
        break
    }
  }

  const handleToggleOpen = (index: number) => () => {
    const categories = [...data.categories]
    categories[index].open = !categories[index].open
    setData({...data, categories})
  }

  const { categories, loading, error, positions } = data

  return (
    <CommonLayout header={t('Top 5 news by categories')} error={error} loading={loading}>
      {
        categories.map((category, index: number) => {
          const showLeftArrow = positions[index] !== 0
          const showRightArrow = positions[index] !== (-(data.categories[index].articles.length - 1) * 100)
          return <SliderContainer key={category.category} >
            <HeaderDiv onClick={handleToggleOpen(index)} >
              <Link onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                history.push(Routes.CATEGORY.replace(':category', category.category))
              }}
              to={Routes.CATEGORY.replace(':category', category.category)}
              >
                <h5 style={{margin: 10, textTransform: 'uppercase'}}>
                  {category.category}
                </h5>
              </Link>
              {category.open ?
                <ArrowDown size={30} />
                :
                <ArrowLeft size={30} />
              }
            </HeaderDiv>
            {<Slider open={category.open} key={index}>
              {showLeftArrow &&
              <SlideLeftDiv onClick={() => handleSlide(index, Slide.LEFT)}>
                <StyledArrowLeftCircle color="white"
                  size={30} />
              </SlideLeftDiv>
              }
              {
                category.articles.map((article) => {
                  return <SlideItem key={article.url} x={positions[index]}>
                    <SlideImg alt="" src={article.urlToImage} style={{ width: '50%' }} />
                    <ArticleText>
                      <div>
                        <h4>{article.title}</h4>
                        <p>{article.content}</p>
                      </div>
                      <MoreDiv>
                        <Link to={Routes.ARTICLE.replace(':title', encodeURIComponent(article.title))}>
                          <span>{t('More')}</span>
                          <ArrowRight size={12} />
                        </Link>
                      </MoreDiv>
                    </ArticleText>
                  </SlideItem>
                })
              }
              {showRightArrow &&
              <SlideRightDiv onClick={() => handleSlide(index, Slide.RIGHT)}>
                <StyledArrowRightCircle color="white"
                  size={30} />
              </SlideRightDiv>
              }
            </Slider>}
          </SliderContainer>
        })
      }
    </CommonLayout>
  )
}
