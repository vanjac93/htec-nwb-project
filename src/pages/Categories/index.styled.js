import styled, { css } from 'styled-components'
import { ArrowLeftCircle, ArrowRightCircle } from '@styled-icons/feather'

export const Slider = styled.div`
  position: relative;
  border-radius: 5px;
  width: 100%;
  overflow: hidden;
  ${props => props.open ? css`
    opacity: 1;
    display: flex;
    height: 200px;
    margin: 10px 0px;
  `
    :
    css`
    opacity: 0;
    display: block;
    height: 0;
  `
}
  transition: opacity 1s ease-in-out;
`

type SlideItemProps = {
  x: number
}

export const SlideItem = styled.div`
  width: 100%; 
  min-width: 100%;
  height: 100%;
  display: flex;
  transform: ${({ x }: SlideItemProps) => `translateX(${x}%)`};
  transition: transform .5s ease-in-out;
`

export const SliderContainer = styled.div`
  text-align: left;
  background-color: aliceblue;
  padding: 5px;
  margin: 10px 0px;
  border-radius: 4px;
  background-color: #ce6262;
  * {
    color: white;
  }
`

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const StyledArrowLeftCircle = styled(ArrowLeftCircle)`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  left: 5px; 
  top: 50%;
  transform: translate(0,-50%);
`

export const StyledArrowRightCircle = styled(ArrowRightCircle)`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  right: 5px; 
  top: 50%;
  transform: translate(0,-50%);
`

export const ArticleText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  & * h4 {
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  & * p:first-of-type {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

export const SlideImg = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px; 
  width: calc(50% - 10px);
`