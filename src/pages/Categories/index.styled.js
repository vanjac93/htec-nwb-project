import styled, { css } from 'styled-components'

export const Slider = styled.div`
  position: relative;
  border-radius: 5px;
  width: 100%;
  /* height: 200px; */
  margin: 10px 0px;
  overflow: hidden;
  /* display: flex; */
  ${props => props.open ? css`
    opacity: 1;
    display: flex;
    height: 200px;
  `
    :
    css`
    opacity: 0;
    display: block;
    height: 0;
  `
}
  /* display: ${props => props.open ? 'flex' : 'none'}; */
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
`