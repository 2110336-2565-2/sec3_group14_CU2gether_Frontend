import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/utils/theme";
import { Button, ConfigProvider } from "antd";
import Registration from "@/components/registration/RegistrationPopup";
import LoginButton from "../components/login/LoginButton";

const ButtonJoin = styled.button`
    height: 50px;
    width: 160px;
    font-size: 28px;
    color: white;
    margin-right: 50px;
    border-radius: 6px;
    background-color: #e16d62;
    border: none;
    :hover{
        background-color: #b8574e;
    }
    ${theme.media.tablet} {
        margin-right: 0px;
        width: 600px;
        font-size: 24px;
        padding: 50px auto;
    }
    ${theme.media.mobile} {
        width: 340px;
        height: 30px;
        font-size: 15px;
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
    :hover{
        background-color: #bfbfbf;
    }
    ${theme.media.tablet} {
        margin-right: 0px;
        width: 600px;
        font-size: 24px;
        margin: 30px;
    }
    ${theme.media.mobile} {
        width: 340px;
        height: 30px;
        font-size: 15px;
    }
`

const ButCon = styled.div`
    height: 300px;
    display: flex;
    padding-top: 55px;
    ${theme.media.tablet} {
        padding-top: 0px;
        text-align: center;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
`;

export default function ButonJoinLog() {
    const [onRegistration, setOnRegistration] = useState(false);

    const toggleRegistrationModal = (): void => {
        setOnRegistration(!onRegistration);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E16D62",
                },
            }}
        >
            <Button onClick={() => toggleRegistrationModal()}>Join Us</Button>
            <Registration
                toggleRegistrationModal={toggleRegistrationModal}
                onRegistration={onRegistration}
            />
            <LoginButton />
        </ConfigProvider>
    );
}
