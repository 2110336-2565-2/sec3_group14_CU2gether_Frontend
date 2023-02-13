import React from 'react'
import styled from 'styled-components'
import ButonJoinLog from './ButtonJoinLog'
import theme from '@/utils/theme'
import Dropd from './Dropd'

const Ul = styled.ul`
  list-style:none;
  display: flex;
  color: white;
  width: 80%;
  ${theme.media.tablet} {
    width: 90%;
  }
  ${theme.media.mobile} {
      font-size: 24px; 
      justify-content: center;
  }
`

const Li = styled.li`
  margin: 0 45px;
  display: flex;
  font-size: 48px;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  ${theme.media.tablet} {
      padding-top: 45px;  
  }
  ${theme.media.mobile} {
      font-size: 24px;
      padding-top: 24px;
  }
`
const Li2 = styled.li`
  margin: 0 20px;
  padding-top: 19px;
  display: flex;
  font-size: 20px;
  align-items: center;
  height: 150px;
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
  ${theme.media.tablet} {
    display: none;
  }
`
const Burger = styled.img`
  background-image: url('burger.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 18px;
  height: 15px;
  @media screen and (min-width: 391px) {
        display: none;
  }
`

export default function Menubar() {
  return (
    <Container>
        <div style={{width:'75px',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Burger />
        </div>
        <Ul>
            <b><Li><CU>CU</CU>2Gether</Li></b>
            <Li2>Home</Li2>
            <Li2>Explore Events</Li2>
            <Li2>Create Event</Li2>
            <Li2>My Event</Li2>
        </Ul>
        <Butcon>
            <ButonJoinLog />
        </Butcon>
        <Dropd/>
    </Container>
  )
}
