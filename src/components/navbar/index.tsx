import { Drawer, MenuProps, Dropdown, Layout, Typography, message } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useModal } from "@/hooks";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Link from "next/link";
import { auth } from "api";
import { useRouter } from "next/router";

import MenuIcon from "@mui/icons-material/Menu";
import ReportIcon from "@mui/icons-material/Report";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonAdd from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";

import { ContainedButton, OutlinedButton } from "@/common/button";
import { LoginAndRegistrationModal } from "@/components/login-registration";
import useProfileStore from "@/hooks/useProfileStore";
import theme from "@/utils/theme";
import { ROLE } from "@/types";

import { getImageURL } from "@/utils";

type NavbarProps = {};

const { Header } = Layout;
const { Paragraph, Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC<NavbarProps> = () => {
  const { id, role, name, imageUrl, credits, checkStatus } = useProfileStore();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false); // is the user logged in or not
  const [isLoggingIn, setLoggingIn] = useState<boolean>(true); // is the action is logging in or signing up
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      await checkStatus();
    };
    checkLoginStatus();
  }, [isLoggedIn]);

  useEffect(() => {
    if (role) setLoggedIn(true);
    else setLoggedIn(false);
  }, [role]);

  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);

  const handleClickSignup = () => {
    setLoggingIn(false);
    openModal();
  };

  const handleClickLogin = () => {
    setLoggingIn(true);
    openModal();
  };

  const handleSuccessLogin = () => {
    router.push("/events");
    message.open({
      type: "success",
      content: "Logged in successfully",
    });
  };

  const handleSuccessLogout = () => {
    message.info("Logged out successfully");
  };

  const handleClickLogout = async () => {
    try {
      const res = await auth.logout();
      if (res) {
        setLoggedIn(false);
        handleSuccessLogout();
      } else throw new Error("Something went wrong, cannot logout");
    } catch (err) {
      console.log(err);
    }
  };

  const profileMenuDropdown = useMemo(() => {
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

    const ProfileMenuItems: MenuItem[] = isLoggedIn
      ? [
          getItem(
            <Link
              href={{
                pathname: "/profile/[uid]",
                query: { uid: id },
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
                pathname: "/transaction",
              }}
            >
              Top up ฿{credits}
            </Link>,
            "3",
            <PaymentIcon />
          ),
          getItem(
            <Link
              href={{
                pathname: "/reports/web",
              }}
            >
              Report
            </Link>,
            "4",
            <ReportIcon />
          ),
          {
            type: "divider",
          },
          getItem(
            <div onClick={handleClickLogout}>Log Out</div>,
            "5",
            <LogoutIcon />
          ),
        ]
      : [
          getItem(
            <div onClick={handleClickSignup}>Join Us</div>,
            "1",
            <PersonAdd />
          ),
          getItem(
            <div onClick={handleClickLogin}>Log In</div>,
            "2",
            <LoginIcon />
          ),
        ];
    return (
      <Dropdown menu={{ items: ProfileMenuItems }} trigger={["click"]}>
        {imageUrl ? (
          <ProfileImage
            src={getImageURL(imageUrl)}
            alt={"profile image"}
            loader={() => getImageURL(imageUrl)}
            width={36}
            height={36}
            style={{ borderRadius: "50%" }}
            crossOrigin="anonymous"
          />
        ) : (
          <MyAccountCircleIcon fontSize="large" />
        )}
      </Dropdown>
    );
  }, [credits, id, imageUrl, isLoggedIn]);

  const studentMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/events/create" },
    { key: "4", label: "Joined Events", href: "/events/joined" },
    { key: "5", label: "My Events", href: "/events/mine" },
  ];

  const organizerMenus = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Explore", href: "/events" },
    { key: "3", label: "Create Event", href: "/events/create" },
    { key: "4", label: "My Events", href: "/events/mine" },
  ];

  const adminMenus = [
    { key: "1", label: "Explore", href: "/events" },
    {
      key: "2",
      label: "Organizer Requests",
      href: "/admin/organizer-requests",
    },
    { key: "3", label: "Event Reports", href: "/admin/event-reports" },
    { key: "4", label: "Website Reports", href: "/admin/website-reports" },
  ];

  const renderNavMenu = () => {
    if (isLoggedIn) {
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
          return;
      }
    } else {
      return studentMenus.map((menu, idx) =>
        menu.label === "Home" || menu.label === "Explore" ? (
          <Link key={idx} href={menu.href}>
            <MenuLabel>{menu.label}</MenuLabel>
          </Link>
        ) : (
          <div onClick={handleClickLogin}>
            <MenuLabel>{menu.label}</MenuLabel>
          </div>
        )
      );
    }
  };

  const renderMobileNav = () => (
    <Nav>
      <LoginAndRegistrationModal
        isLoggingIn={isLoggingIn}
        setLoggingIn={setLoggingIn}
        setLoggedIn={setLoggedIn}
        onLogin={handleSuccessLogin}
        closeLoginAndRegistrationModal={closeModal}
        isOpen={isModalOpen}
      />
      <ShortNavContainer>
        <MenuIconWrapper>
          <MenuIcon onClick={() => setIsDrawerOpen(true)} />
        </MenuIconWrapper>
        <Logo
          src={"/logo_black.svg"}
          alt={"CU2Gether Logo"}
          width={200}
          height={64}
        />
        {role === ROLE.ADMIN ? (
          <Name style={{ color: theme.color.primary }}>Admin</Name>
        ) : (
          profileMenuDropdown
        )}
      </ShortNavContainer>
      <Drawer
        title={
          <Logo
            src={"/logo_black.svg"}
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
      <LoginAndRegistrationModal
        isLoggingIn={isLoggingIn}
        setLoggingIn={setLoggingIn}
        setLoggedIn={setLoggedIn}
        onLogin={handleSuccessLogin}
        closeLoginAndRegistrationModal={closeModal}
        isOpen={isModalOpen}
      />
      <FullNavContainer>
        <MenuContainer>
          <Logo
            src={"/logo_black.svg"}
            alt={"CU2Gether Logo"}
            width={200}
            height={64}
          />
          <Menu>{renderNavMenu()}</Menu>
        </MenuContainer>
        <ProfileContainer>
          {role === ROLE.ADMIN ? (
            <Name style={{ color: theme.color.primary }}>Admin</Name>
          ) : (
            <>
              {isLoggedIn ? (
                <Name style={{ color: theme.color.primary }}>
                  Hello, {name}
                </Name>
              ) : (
                <>
                  <ContainedButton
                    text={"Join Us"}
                    onClick={handleClickSignup}
                  />
                  <OutlinedButton text={"Log in"} onClick={handleClickLogin} />
                </>
              )}
              {profileMenuDropdown}
            </>
          )}
        </ProfileContainer>
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

const ProfileImage = styled(Image)`
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
`;

const MyAccountCircleIcon = styled(AccountCircleIcon)`
  &:hover {
    cursor: pointer;
  }
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
  &:hover {
    cursor: pointer;
  }
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
