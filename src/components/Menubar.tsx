import React from 'react'
import styled from 'styled-components'
import ButtonJoinLog from './ButtonJoinLog'
import theme from '@/utils/theme'
import Dropd from './Dropd'
import BurgerPopup from './BurgerPopup'

const Ul = styled.ul`
  list-style:none;
  display: flex;
  color: white;
  width: 80%;
  height: 150px;
  ${theme.media.tablet} {
    width: 90%;
  }
  ${theme.media.mobile} {
      font-size: 24px; 
      justify-content: center;
      height: 70px;
  }
`

const Li = styled.li`
  margin: 0 45px;
  font-weight: bold;
  display: flex;
  font-size: 48px;
  align-items: center;
  justify-content: center;
  ${theme.media.mobile} {
      font-size: 24px;
  }
`
const Li2 = styled.li`
  margin: 0 20px;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  :hover{
    text-decoration: underline;
  }
  ${theme.media.tablet} {
    padding-top: 5px;
    width: 109px;
    margin: 0 10px;
    font-size: 15px;
  }
  ${theme.media.mobile} {
      display: none;
  }
`

const CU = styled.div`
    color: #f96491;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 150px;
    ${theme.media.mobile} {
        width: 390px;
        height: 70px;
    }
`

const Butcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.media.tablet} {
    display: none;
  }
`

const BurCon = styled.div`
  display: none;
  ${theme.media.mobile} {
      width: 75px;
      display:flex;
      justify-content: center;
      align-items: center;
  }
`

export default function Menubar() {
  return (
    <Container>
        <BurCon>
          <BurgerPopup />
        </BurCon>
        <Ul>
            <Li><CU>CU</CU>2Gether</Li>
            <Li2>Home</Li2>
            <Li2>Explore Events</Li2>
            <Li2>Create Event</Li2>
            <Li2>My Event</Li2>
        </Ul>
        <Butcon>
            <ButtonJoinLog />
        </Butcon>
        <Dropd/>
    </Container>
  )
}
