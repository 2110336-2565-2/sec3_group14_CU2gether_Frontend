import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
    display: flex;
    align-items: center;
    @media screen and (min-width: 801px) {
        display: none;
    }
`

const BurgerImg = styled.img`
    width: 60px;
    height: 54px;
`

export default function Burger() {
    let [icon,setIcon] = useState("burger");
    const checkIcon = () => {
        if(icon==="burger") {
            setIcon("x")
        } else if (icon==="x") {
            setIcon("burger")
        }
    }

  return (
    <Container>
        <BurgerImg src= {`${icon}.png`} alt="" onClick={checkIcon}/>
    </Container>
  )
}
