import { ArrowLeftCircle, ArrowLeft, ArrowRightCircle, ArrowDown } from '@styled-icons/feather'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { Context } from '~/App'
import CommonLayout from '~/common/CommonLayout'
import { CategoryTypes, Routes } from '~/Constants'
import categoriesApi from '~/services/categoriesApi'
import { ArticleType } from '~/types/ArticleType'
import { SlideItem, Slider, SliderContainer } from './index.styled'

const Slide = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
}

type CategoryStateType = {
  articles: Array<ArticleType>,
  category: string,
  open: boolean
}

export default function Categories() {
  const { lan } = useContext(Context)
  const {t} = useTranslation()
  const [data, setData] = useState({
    loading: false,
    categories: [],
    positions: []
  })

  useEffect(() => {
    const fetchData = async () => {
      setData({ ...data, loading: true })
      try {
        const categories: Array<CategoryStateType> = []
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
        swal({ icon: 'warning', title: 'Something went wrong!', text: error.response.data.message })
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
    <CommonLayout error={error} loading={loading}>
      <h3>{t('Top 5 news by categories')}</h3>
      {
        categories.map((category, index: number) => {
          return <SliderContainer key={category.category} >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Link to={Routes.CATEGORY.replace(':category', category.category)}>
                <h3 style={{margin: 10, textTransform: 'uppercase'}}>
                  {category.category}
                </h3>
              </Link>
              {category.open ?
                <ArrowDown onClick={handleToggleOpen(index)} size={30} />
                :
                <ArrowLeft onClick={handleToggleOpen(index)} size={30} />
              }
            </div>
            {<Slider open={category.open} key={index}>
              <ArrowLeftCircle onClick={() => handleSlide(index, Slide.LEFT)} size={30}
                style={{ position: 'absolute', cursor: 'pointer', zIndex: 10, left: 5, top: '50%', transform: 'translate(0,-50%)' }} />
              {
                category.articles.map((article) => {
                  return <SlideItem key={article.url} x={positions[index]}>
                    <img alt="" src={article.urlToImage} style={{ width: '50%' }}>
                    </img>
                    <div style={{ flex: 1, padding: 10 }}>
                      <h4>{article.title}</h4>
                      <p>{article.content}</p>
                    </div>
                  </SlideItem>
                })
              }
              <ArrowRightCircle onClick={() => handleSlide(index, Slide.RIGHT)} size={30}
                style={{ position: 'absolute', cursor: 'pointer', zIndex: 10, right: 5, top: '50%', transform: 'translate(0,-50%)' }} />
            </Slider>}
          </SliderContainer>
        })
      }
    </CommonLayout>
  )
}
