import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import { Drawer, MenuProps } from "antd";
import { Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import Link from "next/link";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useProfileStore from "@/hooks/useProfileStore";
import auth from "api/auth";
import { ROLE } from "@/utils/Enum";
import { CU_WEB } from "@/config";

type NavbarProps = {};

const { Header } = Layout;
const { Paragraph, Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC<NavbarProps> = () => {
  const { role, name, imageUrl, checkStatus } = useProfileStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const checkLoginStatus = async () => {
      await checkStatus();
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);

  const navMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/events/create" },
    { key: "4", label: "Join Event", href: "/events/joined" },
    { key: "5", label: "My Events", href: "/events/my-event" },
  ];

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

  const ProfileMenuItems: MenuItem[] = role
    ? [
        getItem(
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/profile/"
          >
            My Profile
          </a>,
          "1",
          <AccountCircleIcon />
        ),
        getItem(
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Change Password
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
            Report History
          </a>,
          "3",
          <ReportGmailerrorredIcon />
        ),
        {
          type: "divider",
        },
        getItem(
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/"
          >
            Log Out
          </a>,
          "4",
          <LogoutIcon />
        ),
      ]
    : [
        getItem(
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Join Us
          </a>,
          "1",
          <HandshakeIcon />
        ),
        getItem(
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Log In
          </a>,
          "2",
          <LoginIcon />
        ),
      ];

  const renderMobileNav = () => (
    <Nav>
      <ShortNavContainer>
        <MenuIconWrapper>
          <MenuIcon onClick={() => setIsDrawerOpen(true)} />
        </MenuIconWrapper>
        <Logo
          src={"./logo_black.svg"}
          alt={"CU2Gether Logo"}
          width={200}
          height={64}
        />
        <Dropdown menu={{ items: ProfileMenuItems }} trigger={["click"]}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={"profile image"}
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon />
          )}
        </Dropdown>
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
          return menu.key === "4" && role === ROLE.ORGANIZER ? null : (
            <Link key={idx} href={menu.href}>
              <Paragraph>{menu.label}</Paragraph>
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
            {navMenus.map((menu, idx) =>
              menu.key === "4" && role === ROLE.ORGANIZER ? null : (
                <Link key={idx} href={menu.href}>
                  <div
                    style={{
                      color: theme.color.black,
                    }}
                  >
                    {menu.label}
                  </div>
                </Link>
              )
            )}
          </Menu>
        </MenuContainer>
        {role ? (
          <ProfileContainer>
            <Name style={{ color: theme.color.primary }}>Hello, {name}</Name>
            <Dropdown menu={{ items: ProfileMenuItems }} trigger={["click"]}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={"profile image"}
                  width={36}
                  height={36}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </Dropdown>
          </ProfileContainer>
        ) : (
          <ProfileContainer>
            <ContainedButton text={"Join Us"} onClick={() => {}} />
            <OutlinedButton
              text={"Log in"}
              onClick={() => {
                auth.login("tae@tae.com", "12345678");
              }}
            />
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

const MenuIconWrapper = styled.div``;

export default Navbar;
