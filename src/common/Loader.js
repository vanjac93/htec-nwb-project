import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default function Loader() {
  return (
    <StyledDiv />
  )
}
