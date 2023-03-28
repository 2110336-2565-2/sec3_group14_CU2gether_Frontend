import { Drawer, MenuProps, Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import ReportIcon from "@mui/icons-material/Report";
import LockResetIcon from "@mui/icons-material/LockReset";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import auth from "api/auth";
import { ContainedButton, OutlinedButton } from "@/common/button";
import useProfileStore from "@/hooks/useProfileStore";
import theme from "@/utils/theme";
import { ROLE } from "@/types";

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

  const studentMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/events/create" },
    { key: "4", label: "Join Event", href: "/events/joined" },
    { key: "5", label: "My Events", href: "/events/mine" },
  ];

  const organizerMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/events/create" },
    { key: "4", label: "My Events", href: "/events/mine" },
  ];

  const adminMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Organizer Requests", href: "/events/create" },
    { key: "4", label: "Event Reports", href: "/events/joined" },
    { key: "5", label: "Website Reports", href: "/events/mine" },
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
          <Link
            href={{
              pathname: "/profile/[uid]",
              // TODO: Need to change this to dynamic uid
              query: { uid: "6331307321" },
            }}
          >
            My Profile
          </Link>,
          "1",
          <AccountCircleIcon />
        ),
        getItem(
          <Link
            href={{
              pathname: "/profile/change-password",
            }}
          >
            Change Password
          </Link>,
          "2",
          <LockResetIcon />
        ),
        getItem(
          <Link
            href={{
              pathname: "/blog/[slug]",
              query: { slug: "my-post" },
            }}
          >
            Report Problem
          </Link>,
          "3",
          <ReportIcon />
        ),
        {
          type: "divider",
        },
        getItem(
          <div
            onClick={() => {
              // TODO: Open logout modal
            }}
          >
            Log Out
          </div>,
          "4",
          <LogoutIcon />
        ),
      ]
    : [
        getItem(<div>Join Us</div>, "1", <HandshakeIcon />),
        getItem(<div>Log In</div>, "2", <LoginIcon />),
      ];

  const renderNavMenu = () => {
    switch (role) {
      case ROLE.STUDENT:
        return studentMenus.map((menu, idx) => (
          <Link key={idx} href={menu.href}>
            <MenuLabel>{menu.label}</MenuLabel>
          </Link>
        ));

      case ROLE.ORGANIZER:
        return organizerMenus.map((menu, idx) => (
          <Link key={idx} href={menu.href}>
            <MenuLabel>{menu.label}</MenuLabel>
          </Link>
        ));
      case ROLE.ADMIN:
        return adminMenus.map((menu, idx) => (
          <Link key={idx} href={menu.href}>
            <MenuLabel>{menu.label}</MenuLabel>
          </Link>
        ));
      default:
        return studentMenus.map((menu, idx) =>
          menu.label === "Home" || menu.label === "Explore" ? (
            <Link key={idx} href={menu.href}>
              <MenuLabel>{menu.label}</MenuLabel>
            </Link>
          ) : (
            <div
              onClick={() => {
                // TODO: Open login modal
              }}
            >
              <MenuLabel>{menu.label}</MenuLabel>
            </div>
          )
        );
    }
  };

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
        {renderNavMenu()}
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
          <Menu>{renderNavMenu()}</Menu>
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
            <ContainedButton
              text={"Join Us"}
              onClick={() => {
                // TODO: Open signup modal
              }}
            />
            <OutlinedButton
              text={"Log in"}
              onClick={() => {
                // TODO: Open login modal
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
  align-items: center;
  gap: 2vw;
`;

const MenuLabel = styled(Paragraph)`
  margin: 0 !important;
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
