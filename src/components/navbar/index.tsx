import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import Link from "next/link";
import HelpIcon from "@mui/icons-material/Help";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type NavbarProps = {};

const { Header } = Layout;

const Navbar: React.FC<NavbarProps> = () => {
  const menus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create", href: "/create" },
    { key: "4", label: "Join Events", href: "/events/joined" },
    { key: "5", label: "My Events", href: "/events/" },
  ];

  const name = "Chayakorn";

  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const ProfileMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          My Profile
        </a>
      ),
      itemIcon: <AccountCircleIcon />,
    },
    {
      key: "2",
      itemIcon: <ManageAccountsIcon />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Manage Account
        </a>
      ),
    },
    {
      key: "3",
      itemIcon: <HelpIcon />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Support
        </a>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      itemIcon: <LogoutIcon />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Log Out
        </a>
      ),
    },
  ];

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
          <Menu>
            {menus.map((menu, idx) => (
              <Link href={menu.href}>
                <div
                  style={{
                    color: theme.color.black,
                  }}
                >
                  {menu.label}
                </div>
              </Link>
            ))}
          </Menu>
        </MenuContainer>
        {true ? (
          <ProfileContainer>
            <Name style={{ color: theme.color.primary }}>Hello, {name}</Name>
            <Dropdown menu={{ items: ProfileMenuItems }} trigger={["click"]}>
              <ProfileImage
                src={"./pattanan.svg"}
                alt={"profile image"}
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
                onClick={() => {}}
              />
            </Dropdown>
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
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 2vw;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1vw;
`;

const Menu = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  gap: 2vw;
`;

const Name = styled(Typography.Text)`
  font-size: 0.8rem;
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
