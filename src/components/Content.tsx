import React from 'react'
import styled from 'styled-components'
import ButonJoinLog from './ButtonJoinLog'
import theme from '@/utils/theme'

const Container = styled.div`
    width: 100%;
    height: 967px;
    color: white;
    margin: 0;
    padding: 0;
    height: 819px;
`

const Text = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 70px;
    font-size: 96px;
    ${theme.media.mobile} {
        font-size: 40px;
    }
`

const PicCon = styled.div`
    height: 800px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Img = styled.img`
    max-width: 450px;
    height: 500px;
    border-radius: 60px;
`

const Butcon = styled.div`
    @media screen and (min-width: 1025px) {
        display: none;
    }
`

export default function Content() {
  return (
    <Container>
        <Text><b>Want events?</b></Text>
        <Butcon>
            <ButonJoinLog/>
        </Butcon>
        {/* <PicCon>
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
        </PicCon> */}
    </Container>
  )
}
