import React, { useState } from "react";
import styled from "styled-components";
import { Button, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import Dropd from "./Dropd";
import BurgerPopup from "./BurgerPopup";

const StyledButton = styled(Button)`
    height: 35px;
    width: 100px;
    font-size: 20px;
    border-radius: 6px;
    border: none;
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
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    color: white;
    width: 80%;
    ${theme.media.tablet} {
        width: 90%;
    }
    ${theme.media.mobile} {
        font-size: 24px;
        justify-content: center;
    }
`;

const Li = styled.li`
    margin: 0 45px;
    display: flex;
    font-size: 48px;
    align-items: center;
    justify-content: center;
    ${theme.media.tablet} {
        padding-top: 45px;
    }
    ${theme.media.mobile} {
        font-size: 24px;
        padding-top: 24px;
    }
`;
const Li2 = styled.li`
    margin: 0 20px;
    display: flex;
    font-size: 20px;
    align-items: center;
    height: 100px;
    justify-content: center;
    cursor: pointer;

    :hover {
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
`;

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
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    ${theme.media.tablet} {
        display: none;
    }
`;

const MenuBar: React.FC<{
    toggleLoginAndRegistrationModal(): void;
    setLogin(isLogin: boolean): void;
}> = ({ toggleLoginAndRegistrationModal, setLogin }) => {
    const handleButtonClick = (isLogin: boolean) => {
        toggleLoginAndRegistrationModal();
        setLogin(isLogin);
    };

    return (
        <Container>
            <div
                style={{
                    width: "75px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <BurgerPopup />
            </div>
            <Ul>
                <b>
                    <Li>
                        <CU>CU</CU>2Gether
                    </Li>
                </b>
                <Li2>Home</Li2>
                <Li2>Explore Events</Li2>
                <Li2>Create Event</Li2>
                <Li2>My Event</Li2>
            </Ul>
            <ButtonWrapper>
                <StyledButton
                    type="primary"
                    onClick={() => handleButtonClick(false)}
                >
                    Join Us
                </StyledButton>
                <StyledButton
                    type="default"
                    onClick={() => handleButtonClick(true)}
                >
                    Login
                </StyledButton>
            </ButtonWrapper>
            <Dropd />
        </Container>
    );
};

export default MenuBar;
