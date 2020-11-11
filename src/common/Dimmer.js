import React from 'react'
import styled from 'styled-components'

const DimmerDiv = styled.div`
    background-color: grey;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
`

type DimmerProps = {
  children: any
}

export default function Dimmer({ children }: DimmerProps) {
  return (
    <DimmerDiv>
      {children}
    </DimmerDiv>
  )
}
