import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "antd";
import theme from "@/utils/theme";
import ProfileDropdown from "./ProfileDropdown";
import HamburgerMenu from "./HamburgerMenu";

const StyledButton = styled(Button)`
  height: 35px;
  width: 100px;
  border-radius: 6px;
  border: none;
  ${theme.media.tablet} {
    margin-right: 0px;
    width: 600px;
    margin: 30px;
  }
  ${theme.media.mobile} {
    width: 340px;
    height: 30px;
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
  color: #f96491;
`;

const MenuBarWrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${theme.media.tablet} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuBar: React.FC<{
  toggleLoginAndRegistrationModal(): void;
  setLogin(isLogin: boolean): void;
}> = ({ toggleLoginAndRegistrationModal, setLogin }) => {

  const router = useRouter();

  const handleButtonClick = (isLogin: boolean) => {
    toggleLoginAndRegistrationModal();
    setLogin(isLogin);
  };

  const handleTestClick = () => {
    router.push('/profile');
  };

  return (
    <MenuBarWrapper>
      <HamburgerMenuWrapper>
        <HamburgerMenu />
      </HamburgerMenuWrapper>
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
        <StyledButton onClick={() => handleTestClick()}>TEST</StyledButton>
      </Ul>
      <ButtonWrapper>
        <StyledButton onClick={() => handleButtonClick(false)}>
          Join Us
        </StyledButton>
        <StyledButton type="primary" onClick={() => handleButtonClick(true)}>
          Login
        </StyledButton>
      </ButtonWrapper>
      <ProfileDropdown />
    </MenuBarWrapper>
  );
};

export default MenuBar;
