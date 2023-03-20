import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import { Drawer, MenuProps } from "antd";
import { Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
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
const { Paragraph, Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC<NavbarProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const navMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/create" },
    { key: "4", label: "Join Event", href: "/events/joined" },
    { key: "5", label: "My Events", href: "/events/" },
  ];

  const name = "Chayakorn";

  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const ProfileMenuItems: MenuItem[] = [
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        My Profile
      </a>,
      "1",
      <AccountCircleIcon fontSize="large" />
    ),
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Manage Account
      </a>,
      "2",
      <ManageAccountsIcon />
    ),
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Support
      </a>,
      "3",
      <HelpIcon />
    ),
    {
      type: "divider",
    },
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Log Out
      </a>,
      "4",
      <LogoutIcon />
    ),
  ];

  const renderMobileNav = () => (
    <Nav>
      <ShortNavContainer>
        <MenuIcon onClick={() => setIsDrawerOpen(true)} />
        <Logo
          src={"./logo_black.svg"}
          alt={"CU2Gether Logo"}
          width={200}
          height={64}
        />
        {true ? (
          <Dropdown menu={{ items: ProfileMenuItems }} trigger={["click"]}>
            <ProfileImage
              src={"./pattanan.svg"}
              alt={"profile image"}
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
          </Dropdown>
        ) : (
          <ProfileImage
            src={"./pattanan.svg"}
            alt={"profile image"}
            width={36}
            height={36}
            style={{ borderRadius: "50%" }}
          />
        )}
      </ShortNavContainer>
      <Drawer
        title={
          <Logo
            src={"./logo_black.svg"}
            alt={"CU2Gether Logo"}
            width={200}
            height={48}
          />
        }
        placement={"left"}
        width={250}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {navMenus.map((menu, idx) => {
          return (
            <Link href={menu.href}>
              <Paragraph key={idx}>{menu.label}</Paragraph>
            </Link>
          );
        })}
      </Drawer>
    </Nav>
  );

  const renderPCNav = () => (
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
            {navMenus.map((menu, idx) => (
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

  return isMobileScreen ? renderMobileNav() : renderPCNav();
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

const Name = styled(Text)`
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
