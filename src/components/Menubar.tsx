import React, { useState } from "react";
import styled from "styled-components";
import { Button, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import ProfileDropdown from "./ProfileDropdown";
import HamburgerMenu from "./HamburgerMenu";

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
  gap: 60px;
  ${theme.media.tablet} {
    width: 90%;
    gap: 10px;
  }
  ${theme.media.mobile} {
    font-size: 24px;
    justify-content: center;
  }
`;

const Li = styled.li`
  display: flex;
  font-size: 48px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const Li2 = styled.li`
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
  color: ${theme.color.pink};
`;

const MenuBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  ${theme.media.mobile} {
    width: 390px;
    height: 70px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${theme.media.tablet} {
    display: none;
  }
`;

const HamburgerMenuContainer = styled.div`
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  toggleLoginAndRegistrationModal(): void;
  setLogin(isLogin: boolean): void;
};

const MenuBar: React.FC<Props> = ({
  toggleLoginAndRegistrationModal,
  setLogin,
}) => {
  const handleButtonClick = (isLogin: boolean) => {
    toggleLoginAndRegistrationModal();
    setLogin(isLogin);
  };

  return (
    <MenuBarContainer>
      <HamburgerMenuContainer>
        <HamburgerMenu />
      </HamburgerMenuContainer>
      <Ul>
        <Li>
          <CU>CU</CU>2Gether
        </Li>
        <Li2>Home</Li2>
        <Li2>Explore Events</Li2>
        <Li2>Create Event</Li2>
        <Li2>My Event</Li2>
      </Ul>
      <ButtonContainer>
        <StyledButton type="primary" onClick={() => handleButtonClick(false)}>
          Join Us
        </StyledButton>
        <StyledButton type="default" onClick={() => handleButtonClick(true)}>
          Login
        </StyledButton>
      </ButtonContainer>
      <ProfileDropdown />
    </MenuBarContainer>
  );
};

export default MenuBar;
