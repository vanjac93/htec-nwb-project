import { Search } from '@styled-icons/feather'
import {Category} from '@styled-icons/material'
import {Highlight} from '@styled-icons/material-outlined/Highlight'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Context } from '~/App'
import { Languages, Routes, SmallScreenBreakpoint } from '~/Constants'
import { LanType } from '~/types/LanType'

type ButtonProps = {
  isActive?: boolean
}

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: ${props => props.theme.menu.height};
    border-bottom: 1px solid #8a7f8a;
    box-sizing: border-box; 
    background-color: #e9ddc8;
`

const MenuButton = styled.button`
    border: none;
    height: 100%;
    outline: inherit;
    padding: 10px;
    /* color: white; */
    background-color: #e9ddc8;
    &:hover:enabled {
        cursor: pointer;
        background-color: ${({ isActive }: ButtonProps) => isActive ? '#ffa042' : '#fbc289'};
    }
    &:disabled {
      cursor: not-allowed;
    }
    ${({ isActive }: ButtonProps) => isActive && css`
        background-color: #ffa042;
    `
}
`

export default function Menu() {
  const {t} = useTranslation()
  const { pathname } = useLocation()
  const { lan, handleLanguageChange } = useContext(Context)
  const [activeItem, setActiveItem] = useState(pathname)
  const { lanEnabled } = useContext(Context)
  const [smallScreen, setSmallScreen] = useState(document.body.clientWidth < 250)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if(!smallScreen && document.body.clientWidth < SmallScreenBreakpoint) {
        setSmallScreen(true)
      }
      if(smallScreen && document.body.clientWidth > SmallScreenBreakpoint) {
        setSmallScreen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [smallScreen])

  const renderLeftMenu = () => {
    if(smallScreen) {
      return <div style={{display: 'flex', alignItems: 'center'}}>
        <Link to={Routes.TOP_NEWS}>
          <MenuButton isActive={activeItem === Routes.TOP_NEWS}>
            <Highlight size={20} />
          </MenuButton>
        </Link>
        <Link to={Routes.CATEGORIES}>
          <MenuButton isActive={activeItem === Routes.CATEGORIES}>
            <Category size={20} />
          </MenuButton>
        </Link>
        <Link to={Routes.SEARCH}>
          <MenuButton isActive={activeItem === Routes.SEARCH}>
            <Search size={20} />
          </MenuButton>
        </Link>
      </div>
    }
    return <div>
      <Link to={Routes.TOP_NEWS}>
        <MenuButton isActive={activeItem === Routes.TOP_NEWS || activeItem === Routes.ROOT || activeItem===Routes.HOME}>{t('Top news')}</MenuButton>
      </Link>
      <Link to={Routes.CATEGORIES}>
        <MenuButton isActive={activeItem === Routes.CATEGORIES}>{t('Categories')}</MenuButton>
      </Link>
      <Link to={Routes.SEARCH}>
        <MenuButton isActive={activeItem === Routes.SEARCH}>{t('Search')}</MenuButton>
      </Link>
    </div>
  }

  const renderLanguages = () => {
    return <div>
      {
        Object.values(Languages).map((language: LanType) => <MenuButton key={language.id} disabled={!lanEnabled}
          onClick={() => handleLanguageChange(language)}
          isActive={lan.id === language.id}>
          {language.id.toUpperCase()}
        </MenuButton>)
      }
    </div>
  }

  return (
    <StyledMenu>
      {renderLeftMenu()}
      {renderLanguages()}
    </StyledMenu>
  )
}
