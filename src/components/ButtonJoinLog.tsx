import React from 'react'
import styled from 'styled-components'
import theme from '@/utils/theme'

const ButtonJoin = styled.button`
    height: 50px;
    width: 160px;
    font-size: 28px;
    color: white;
    margin-right: 50px;
    border-radius: 6px;
    background-color: #E16D62;
    border: none;
    ${theme.media.tablet} {
        margin-right: 0px;
        width: 600px;
        font-size: 24px;
        padding: 50px auto;
    }
`

const ButtonLog = styled.button`
    height: 50px;
    width: 160px;
    font-size: 28px;
    margin-right: 50px;
    border-radius: 6px;
    background-color: white;
    border: none;
    ${theme.media.tablet} {
        margin-right: 0px;
        width: 600px;
        font-size: 24px;
        margin: 30px;
    }
`

const ButCon = styled.div`
    height: 300px;
    display: flex;
    padding-top: 40px;
    ${theme.media.tablet} {
        padding-top: 0px;
        text-align: center;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
`

export default function ButonJoinLog() {
    return (
        <ButCon>
            <ButtonJoin><b>Join Us</b></ButtonJoin>
            <ButtonLog><b>Log in</b></ButtonLog>
        </ButCon>
    )
  }