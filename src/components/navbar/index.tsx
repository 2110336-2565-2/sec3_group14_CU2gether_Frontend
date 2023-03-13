import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import { Layout, Menu, Space, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

type NavbarProps = {};

const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {
  const menus = [
    { key: "1", label: "Home" },
    { key: "2", label: "Explore" },
    { key: "3", label: "Create" },
    { key: "4", label: "Join Events" },
    { key: "5", label: "My Events" },
  ];

  const name = "Chayakorn";

  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobileScreen ? (
    <Nav>
      <ShortNavContainer>
        <MenuIcon />
        <Logo
          src={"./logo_black.svg"}
          alt={"CU2Gether Logo"}
          width={200}
          height={64}
        />
        <ProfileImage
          src={"./pattanan.svg"}
          alt={"profile image"}
          width={36}
          height={36}
          style={{ borderRadius: "50%" }}
        />
      </ShortNavContainer>
    </Nav>
  ) : (
    <Nav>
      <FullNavContainer>
        <MenuContainer>
          <Logo
            src={"./logo_black.svg"}
            alt={"CU2Gether Logo"}
            width={200}
            height={64}
          />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={menus.map((menu, index) => ({
              key: menu.key,
              label: menu.label,
            }))}
          />
        </MenuContainer>
        {true ? (
          <ProfileContainer>
            <Name style={{ color: theme.color.primary }}>Hello, {name}</Name>
            <ProfileImage
              src={"./pattanan.svg"}
              alt={"profile image"}
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
          </ProfileContainer>
        ) : (
          <ProfileContainer>
            <OutlinedButton text={"eiei"} />
            <ContainedButton text={"eiei"} />
          </ProfileContainer>
        )}
      </FullNavContainer>
    </Nav>
  );
};

const Nav = styled(Header)`
  background: #fff !important;
  padding-inline: 3vw !important;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
`;

const FullNavContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
`;

const ShortNavContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: "100%";
  height: "69px";
  align-items: center;
  justify-content: space-between;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1vw;
`;

const Name = styled(Typography.Text)`
  font-size: 1rem;
  ${theme.media.tablet} {
    display: none;
  }
`;

const Logo = styled(Image)`
  width: 10rem !important;
  ${theme.media.tablet} {
    width: 7rem !important;
  }
  ${theme.media.mobile} {
    width: 100px !important;
  }
`;

const ProfileImage = styled(Image)`
  ${theme.media.tablet} {
    margin-bottom: 8px;
  }
`;

export default Navbar;
